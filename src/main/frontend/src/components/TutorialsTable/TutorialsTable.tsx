import React, { FC, useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tutorial } from "../../interfaces/Tutorial";
import { ClassTutorial } from "../../classes/ClassTutorial";
import {
    createTutorial,
    deleteTutorial,
    getAllTutorials,
    getTutorialByBaustein,
    getTutorialByName,
    updateTutorial,
} from "../../api/tutorials";
import "./TutorialsTable.css";
import { CustomDropdownMenu } from "../BasicComponents/CustomDropdownMenu";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dropdown } from "primereact/dropdown";
import { Baustein } from "../../interfaces/Baustein";
import { getAllBausteine } from "../../api/bausteine";

export const TutorialsTable = () => {
    let emptyTutorial: Tutorial = new ClassTutorial();

    const [tutorial, setTutorial] = useState<Tutorial>(emptyTutorial);
    const [tutorials, setTutorials] = useState<Tutorial[]>([]);
    const [tutorialDialog, setTutorialDialog] = useState(false);
    const [deleteTutorialDialog, setDeleteTutorialDialog] = useState(false);
    const [deleteTutorialsDialog, setDeleteTutorialsDialog] = useState(false);
    const [selectedTutorials, setSelectedTutorials] = useState(null);
    const [selectedBaustein, setSelectedBaustein] =
        useState<string>("Baustein");
    const [selectedDropdownLabel, setSelectedDropdownLabel] = useState<{
        label: string;
    }>({ label: "Level" });
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [bausteine, setBausteine] = useState<Baustein[]>([]);
    const DropdownLabels = [
        { label: "Beginner" },
        { label: "Intermediate" },
        { label: "Expert" },
    ];
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);

    useEffect(() => {
        /* Get all Tutorials */
        const fetchAllTutorials = async () => {
            await getAllTutorials()
                .then((data) => {
                    setTutorials(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchAllTutorials();

        /* Get all Bausteine */
        const fetchAllBausteine = async () => {
            await getAllBausteine()
                .then((data) => {
                    setBausteine(data);
                    setIsLoading(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchAllBausteine();
    }, []);

    const openNew = () => {
        // setTutorial(emptyTutorial);
        setSubmitted(false);
        setTutorialDialog(true);
        setSelectedBaustein("Baustein");
        setSelectedDropdownLabel({ label: "Level" });
    };

    const hideDialog = () => {
        setTutorial(emptyTutorial);
        setSubmitted(false);
        setTutorialDialog(false);
    };

    const hideDeleteTutorialDialog = () => {
        setDeleteTutorialDialog(false);
    };

    const hideDeleteTutorialsDialog = () => {
        setDeleteTutorialsDialog(false);
    };

    const passValueToParent = (value: { name: string }) => {
        setSelectedBaustein(value?.name);
    };

    const saveTutorial = async () => {
        setSubmitted(true);
        if (
            tutorial.name.trim() !== "" &&
            selectedBaustein !== "Baustein" &&
            selectedBaustein !== undefined &&
            selectedDropdownLabel.label !== "Level" &&
            tutorial.url.trim() !== ""
        ) {
            let _tutorials = [...tutorials];
            /* Add Baustein & Level Values*/
            tutorial.baustein = selectedBaustein;
            tutorial.level = selectedDropdownLabel.label;

            let _tutorial = { ...tutorial };
            /* If the tutorial has an ID that means we want to update a tutorial when not then we want to create one */
            if (tutorial.tutorialId) {
                const index = findIndexById(tutorial.tutorialId);

                // Update Tutorial
                _tutorials[index] = _tutorial;
                await updateTutorial(_tutorial);

                toast?.current?.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Tutorial Updated",
                    life: 3000,
                });
            } else {
                // Create Tutorial
                await createTutorial(_tutorial);
                await getTutorialByName(_tutorial.name)
                    .then((data) => {
                        console.log("data", data);
                        _tutorials.push(...data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                toast?.current?.show({
                    severity: "success",
                    summary: "Successful",
                    detail: "Tutorial Created",
                    life: 3000,
                });
            }
            console.log("_tutorials", _tutorials);
            setTutorials(_tutorials);
            setTutorialDialog(false);
            setTutorial(emptyTutorial);
            setSelectedBaustein("Baustein");
            setSelectedDropdownLabel({ label: "Level" });
        }
    };

    const editTutorial = (tutorial: Tutorial) => {
        setSelectedBaustein(tutorial.baustein);
        setSelectedDropdownLabel({ label: tutorial.level });
        setTutorial({ ...tutorial });
        setTutorialDialog(true);
    };

    const confirmDeleteTutorial = (tutorial: Tutorial) => {
        setTutorial(tutorial);
        setDeleteTutorialDialog(true);
    };

    const removeTutorial = async () => {
        let _tutorials = tutorials.filter(
            (val) => val.tutorialId !== tutorial.tutorialId
        );
        // Delete Tutorial
        setTutorials(_tutorials);
        await deleteTutorial(tutorial.tutorialId).then((res) => {
            res
                ? toast.current.show({
                      severity: "success",
                      summary: "Successful",
                      detail: "Tutorial Deleted",
                      life: 3000,
                  })
                : toast.current.show({
                      severity: "error",
                      summary: "Error",
                      detail: "Error From The Serverside",
                      life: 3000,
                  });
        });

        setDeleteTutorialDialog(false);
        setTutorial(emptyTutorial);
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < tutorials.length; i++) {
            if (tutorials[i].tutorialId === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const confirmDeleteSelected = () => {
        setDeleteTutorialsDialog(true);
    };

    const deleteSelectedTutorials = () => {
        // Delete Selected Tutorials
        let _tutorials = tutorials.filter(
            // @ts-ignore
            (val) => !selectedTutorials.includes(val)
        );

        // @ts-ignore
        selectedTutorials.map((tutorial: Tutorial) =>
            deleteTutorial(tutorial.tutorialId)
        );

        setTutorials(_tutorials);
        setDeleteTutorialsDialog(false);
        setSelectedTutorials(null);
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Tutorials Deleted",
            life: 3000,
        });
    };

    const onInputChange = (e: any, name: string) => {
        const val = (e.target && e.target.value) || "";
        let _tutorial = { ...tutorial };
        // @ts-ignore
        _tutorial[`${name}`] = val;

        setTutorial(_tutorial);
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
                    // @ts-ignore
                    disabled={!selectedTutorials || !selectedTutorials.length}
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
                    onClick={() => editTutorial(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-warning"
                    onClick={() => confirmDeleteTutorial(rowData)}
                />
            </React.Fragment>
        );
    };

    const tutorialDialogFooter = (
        <React.Fragment>
            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDialog}
            />
            <Button
                label="Save"
                icon="pi pi-check"
                className="p-button-text"
                onClick={saveTutorial}
            />
        </React.Fragment>
    );
    const deleteTutorialDialogFooter = (
        <React.Fragment>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteTutorialDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={removeTutorial}
            />
        </React.Fragment>
    );
    const deleteTutorialsDialogFooter = (
        <React.Fragment>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteTutorialsDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={deleteSelectedTutorials}
            />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <h1 className="m-0 pb-5 text-center">Alle Tutorials</h1>

            <div className="card">
                <Toolbar
                    className="mb-4"
                    left={leftToolbarTemplate}
                    right={rightToolbarTemplate}
                ></Toolbar>

                <DataTable
                    ref={dt}
                    value={tutorials}
                    selectionMode="checkbox"
                    selection={selectedTutorials}
                    onSelectionChange={(e) => setSelectedTutorials(e.value)}
                    dataKey="tutorialId"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Zeigt {first} bis {last} von {totalRecords} Tutorials"
                    globalFilter={globalFilter}
                    responsiveLayout="scroll"
                >
                    <Column
                        selectionMode="multiple"
                        headerStyle={{ width: "3rem" }}
                        exportable={false}
                    ></Column>
                    <Column
                        field="name"
                        header="Name"
                        sortable
                        style={{ fontWeight: "bold" }}
                    ></Column>
                    <Column
                        field="baustein"
                        header="Baustein"
                        sortable
                        style={{ fontWeight: "bold" }}
                    ></Column>
                    <Column
                        field="level"
                        header="Level"
                        sortable
                        style={{ fontWeight: "bold" }}
                    ></Column>
                    <Column
                        field="url"
                        header="Url"
                        sortable
                        style={{ fontWeight: "bold" }}
                    ></Column>
                    <Column
                        body={actionBodyTemplate}
                        exportable={false}
                        style={{ minWidth: "8rem" }}
                    ></Column>
                </DataTable>
            </div>

            {/* Dialog For Creating or Updating a Tutorial */}
            <Dialog
                visible={tutorialDialog}
                style={{ width: "450px" }}
                header="Tutorial Details"
                modal
                className="p-fluid"
                footer={tutorialDialogFooter}
                onHide={hideDialog}
            >
                <div className="field mb-5">
                    <label htmlFor="name">Name</label>
                    <InputText
                        id="name"
                        value={tutorial.name}
                        onChange={(e) => onInputChange(e, "name")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted && !tutorial.name,
                        })}
                    />
                    {submitted && !tutorial.name && (
                        <small className="p-error">
                            Name ist erforderlich.
                        </small>
                    )}
                </div>
                <div className="flex flex-wrap align-items-center justify-content-around">
                    {isLoading ? (
                        <CustomDropdownMenu
                            loadedItems={bausteine}
                            passValueToParent={passValueToParent}
                            classes="w-11rem mb-4"
                            placeholderText={selectedBaustein}
                        />
                    ) : (
                        <ProgressSpinner />
                    )}
                    <Dropdown
                        className="w-11rem mb-4"
                        value={selectedDropdownLabel}
                        options={DropdownLabels}
                        onChange={(e: any) => setSelectedDropdownLabel(e.value)}
                        placeholder={selectedDropdownLabel.label}
                    />
                    {submitted &&
                        (selectedBaustein === "Baustein" ||
                            selectedBaustein === undefined) && (
                            <small className="p-error">
                                Die Eingabe von Baustein ist erforderlich.
                            </small>
                        )}
                    {submitted && selectedDropdownLabel.label === "Level" && (
                        <small className="mt-1 p-error">
                            Die Eingabe von Level ist erforderlich.
                        </small>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="url">Url</label>
                    <InputText
                        id="url"
                        value={tutorial.url}
                        onChange={(e) => onInputChange(e, "url")}
                        required
                        autoFocus
                        className={classNames({
                            "p-invalid": submitted && !tutorial.url,
                        })}
                    />
                    {submitted && !tutorial.url && (
                        <small className="p-error">
                            Name ist erforderlich.
                        </small>
                    )}
                </div>
            </Dialog>

            <Dialog
                visible={deleteTutorialDialog}
                style={{ width: "450px" }}
                header="Confirm"
                modal
                footer={deleteTutorialDialogFooter}
                onHide={hideDeleteTutorialDialog}
            >
                <div className="confirmation-content">
                    <i
                        className="pi pi-exclamation-triangle mr-3"
                        style={{ fontSize: "2rem" }}
                    />
                    {tutorial && (
                        <span>
                            Sind Sie sicher, dass Sie <b>{tutorial.name}</b>{" "}
                            löschen möchten?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog
                visible={deleteTutorialsDialog}
                style={{ width: "450px" }}
                header="Confirm"
                modal
                footer={deleteTutorialsDialogFooter}
                onHide={hideDeleteTutorialsDialog}
            >
                <div className="confirmation-content">
                    <i
                        className="pi pi-exclamation-triangle mr-3"
                        style={{ fontSize: "2rem" }}
                    />
                    {tutorial && (
                        <span>
                            Möchten Sie die ausgewählten Tutorials wirklich
                            löschen?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    );
};
