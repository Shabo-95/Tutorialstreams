import React, { FC, useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tutorialstream } from "../../interfaces/Tutorialstream";
import { ClassTutorialstream } from "../../classes/ClassTutorialstream";
import {
    createTutorialstream,
    deleteTutorialstream,
    getAllTutorialstreams,
    getTutorialstreamByName,
    updateTutorialstream,
} from "../../api/tutorialstreams";
import { RequirementsTable } from "./RequirementsTable";
import "./TutorialstreamsTable.css";
import { Requirement } from "../../interfaces/Requirement";

export const TutorialstreamsTable = () => {
    let emptyTutorialstream: Tutorialstream = new ClassTutorialstream();

    const [tutorialstream, setTutorialstream] =
        useState<Tutorialstream>(emptyTutorialstream);
    const [passedTutorialstream, setPassedTutorialstream] =
        useState<Tutorialstream>(emptyTutorialstream);
    const [tutorialstreams, setTutorialstreams] = useState<Tutorialstream[]>(
        []
    );
    const [requirements, setRequirements] = useState<Requirement[]>([]);
    const [tutorialstreamDialog, setTutorialstreamDialog] = useState(false);
    const [deleteTutorialstreamDialog, setDeleteTutorialstreamDialog] =
        useState(false);
    const [deleteTutorialstreamsDialog, setDeleteTutorialstreamsDialog] =
        useState(false);
    const [selectedTutorialstreams, setSelectedTutorialstreams] =
        useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);

    useEffect(() => {
        /* Get all Tutorialstreams */
        const fetchAllTutorialstreams = async () => {
            await getAllTutorialstreams()
                .then((data) => {
                    setTutorialstreams(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchAllTutorialstreams();
    }, []);

    useEffect(() => {
        // Update Tutorialstream Requirements when the Value from "tutorialstream" change
        saveTutorialstream(passedTutorialstream);
    }, [requirements]);

    // Passing The new Requirements in a Tutorialstream to the Parent (TutorialstreamsTable)
    const passTutorialstreamToParent = (
        passedTutorialstreamVal: Tutorialstream
    ) => {
        setPassedTutorialstream(passedTutorialstreamVal);
        let _requirements = [...passedTutorialstreamVal.requirements];
        setRequirements(_requirements);
    };

    const openNew = () => {
        setTutorialstream(emptyTutorialstream);
        setSubmitted(false);
        setTutorialstreamDialog(true);
    };

    const hideDialog = () => {
        setTutorialstream(emptyTutorialstream);
        setSubmitted(false);
        setTutorialstreamDialog(false);
    };

    const hideDeleteTutorialstreamDialog = () => {
        setDeleteTutorialstreamDialog(false);
    };

    const hideDeleteTutorialstreamsDialog = () => {
        setDeleteTutorialstreamsDialog(false);
    };

    const callSaveTutorialstream = () => {
        saveTutorialstream(tutorialstream);
    };

    const saveTutorialstream = async (tutorialstream: Tutorialstream) => {
        setSubmitted(true);
        if (tutorialstream.name.trim()) {
            let _tutorialstreams = [...tutorialstreams];
            let _tutorialstream = { ...tutorialstream };
            /* If the tutorialstream has an ID that means we want to update a tutorialstream when not then we want to create one */
            if (tutorialstream.frameworkId) {
                const index = findIndexById(tutorialstream.frameworkId);

                // Update Tutorialstream
                _tutorialstreams[index] = _tutorialstream;
                await updateTutorialstream(_tutorialstream);

                toast?.current?.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Tutorialstream Updated",
                    life: 3000,
                });
            } else {
                // Create Tutorialstream
                await createTutorialstream(_tutorialstream);
                await getTutorialstreamByName(_tutorialstream.name)
                    .then((data) => {
                        _tutorialstreams.push(...data);
                        console.log("data", data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                toast?.current?.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Tutorialstream Created",
                    life: 3000,
                });
            }

            setTutorialstreams(_tutorialstreams);
            setTutorialstreamDialog(false);
            setTutorialstream(emptyTutorialstream);
        }
    };

    const editTutorialstream = (tutorialstream: Tutorialstream) => {
        setTutorialstream({ ...tutorialstream });
        setTutorialstreamDialog(true);
    };

    const confirmDeleteTutorialstream = (tutorialstream: Tutorialstream) => {
        setTutorialstream(tutorialstream);
        setDeleteTutorialstreamDialog(true);
    };

    const removeTutorialstream = async () => {
        let _tutorialstreams = tutorialstreams.filter(
            (val) => val.frameworkId !== tutorialstream.frameworkId
        );
        // Delete Tutorialstream
        setTutorialstreams(_tutorialstreams);
        await deleteTutorialstream(tutorialstream.frameworkId)
            .then((res) => {
                res
                    ? toast.current.show({
                          severity: "success",
                          summary: "Successful",
                          detail: "Tutorialstream Deleted",
                          life: 3000,
                      })
                    : toast.current.show({
                          severity: "error",
                          summary: "Error",
                          detail: "Error From The Serverside",
                          life: 3000,
                      });
            })
            .catch((err) => console.log(err));

        setDeleteTutorialstreamDialog(false);
        setTutorialstream(emptyTutorialstream);
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < tutorialstreams.length; i++) {
            if (tutorialstreams[i].frameworkId === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const confirmDeleteSelected = () => {
        setDeleteTutorialstreamsDialog(true);
    };

    const deleteSelectedTutorialstreams = () => {
        // Delete Selected Tutorialstreams
        let _tutorialstreams = tutorialstreams.filter(
            // @ts-ignore
            (val) => !selectedTutorialstreams.includes(val)
        );

        // @ts-ignore
        selectedTutorialstreams.map((tutorialstream: Tutorialstream) =>
            deleteTutorialstream(tutorialstream.frameworkId)
        );

        setTutorialstreams(_tutorialstreams);
        setDeleteTutorialstreamsDialog(false);
        setSelectedTutorialstreams(null);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Tutorialstreams Deleted",
            life: 3000,
        });
    };

    const onInputChange = (e: any, name: string) => {
        const val = (e.target && e.target.value) || "";
        let _tutorialstream = { ...tutorialstream };
        // @ts-ignore
        _tutorialstream[`${name}`] = val;

        setTutorialstream(_tutorialstream);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Neu"
                    icon="pi pi-plus"
                    className="p-button-success mr-2"
                    onClick={openNew}
                />
                <Button
                    label="Löschen"
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={confirmDeleteSelected}
                    disabled={
                        !selectedTutorialstreams ||
                        // @ts-ignore
                        !selectedTutorialstreams.length
                    }
                />
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={(e) => {
                        // @ts-ignore
                        setGlobalFilter(e.target.value);
                        dt.current.reset();
                    }}
                    placeholder="Suche..."
                />
            </span>
        );
    };

    const actionBodyTemplate = (rowData: any) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() => editTutorialstream(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-warning"
                    onClick={() => confirmDeleteTutorialstream(rowData)}
                />
            </React.Fragment>
        );
    };

    const tutorialstreamDialogFooter = (
        <React.Fragment>
            <Button
                label="Abbrechen"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialog}
            />
            <Button
                label="Speichern"
                icon="pi pi-check"
                className="p-button-text"
                onClick={callSaveTutorialstream}
            />
        </React.Fragment>
    );
    const deleteTutorialstreamDialogFooter = (
        <React.Fragment>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteTutorialstreamDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={removeTutorialstream}
            />
        </React.Fragment>
    );
    const deleteTutorialstreamsDialogFooter = (
        <React.Fragment>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteTutorialstreamsDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={deleteSelectedTutorialstreams}
            />
        </React.Fragment>
    );

    const requirementsTable = (passData: any) => {
        return (
            <RequirementsTable
                props={passData}
                passTutorialstreamToParent={passTutorialstreamToParent}
            />
        );
    };

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <h1 className="m-0 pb-5 text-center">Alle Tutorialstreams</h1>

            <div className="card">
                <Toolbar
                    className="mb-4"
                    left={leftToolbarTemplate}
                    right={rightToolbarTemplate}
                ></Toolbar>

                <DataTable
                    ref={dt}
                    value={tutorialstreams}
                    selectionMode="checkbox"
                    selection={selectedTutorialstreams}
                    onSelectionChange={(e) =>
                        setSelectedTutorialstreams(e.value)
                    }
                    dataKey="frameworkId"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Zeigt {first} bis {last} von {totalRecords} Tutorialstreams"
                    globalFilter={globalFilter}
                    // @ts-ignore
                    expandedRows={expandedRows}
                    // @ts-ignore
                    onRowToggle={(e) => setExpandedRows(e.data)}
                    rowExpansionTemplate={requirementsTable}
                    responsiveLayout="scroll"
                >
                    <Column
                        selectionMode="multiple"
                        headerStyle={{ width: "3rem" }}
                        exportable={false}
                    ></Column>
                    <Column expander style={{ width: "3em" }} />
                    <Column
                        field="name"
                        header="Name"
                        sortable
                        style={{ minWidth: "16rem", fontWeight: "bold" }}
                    ></Column>
                    <Column
                        body={actionBodyTemplate}
                        exportable={false}
                        style={{ minWidth: "8rem" }}
                    ></Column>
                </DataTable>
            </div>

            {/* Dialog For Creating or Updating a Tutorialstream */}
            <Dialog
                visible={tutorialstreamDialog}
                style={{ width: "450px" }}
                header="Tutorialstream Details"
                modal
                className="p-fluid"
                footer={tutorialstreamDialogFooter}
                onHide={hideDialog}
            >
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <InputText
                        id="name"
                        value={tutorialstream.name}
                        onChange={(e) => onInputChange(e, "name")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted && !tutorialstream.name,
                        })}
                    />
                    {submitted && !tutorialstream.name && (
                        <small className="p-error">
                            Name ist erforderlich.
                        </small>
                    )}
                </div>
            </Dialog>

            <Dialog
                visible={deleteTutorialstreamDialog}
                style={{ width: "450px" }}
                header="Confirm"
                modal
                footer={deleteTutorialstreamDialogFooter}
                onHide={hideDeleteTutorialstreamDialog}
            >
                <div className="confirmation-content">
                    <i
                        className="pi pi-exclamation-triangle mr-3"
                        style={{ fontSize: "2rem" }}
                    />
                    {tutorialstream && (
                        <span>
                            Sind Sie sicher, dass Sie{" "}
                            <b>{tutorialstream.name}</b> löschen möchten?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog
                visible={deleteTutorialstreamsDialog}
                style={{ width: "450px" }}
                header="Confirm"
                modal
                footer={deleteTutorialstreamsDialogFooter}
                onHide={hideDeleteTutorialstreamsDialog}
            >
                <div className="confirmation-content">
                    <i
                        className="pi pi-exclamation-triangle mr-3"
                        style={{ fontSize: "2rem" }}
                    />
                    {tutorialstream && (
                        <span>
                            Möchten Sie die ausgewählten Tutorialstreams
                            wirklich löschen?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
};
