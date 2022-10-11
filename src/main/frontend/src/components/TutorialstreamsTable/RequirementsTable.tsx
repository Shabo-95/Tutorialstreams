import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { CustomDropdownMenu } from "../BasicComponents/CustomDropdownMenu";
import { getAllBausteine } from "../../api/bausteine";
import { Tutorialstream } from "../../interfaces/Tutorialstream";
import { Requirement } from "../../interfaces/Requirement";
import { Baustein } from "../../interfaces/Baustein";
import { ClassTutorialstream } from "../../classes/ClassTutorialstream";
import { ClassRequirement } from "../../classes/ClassRequirement";
import "./RequirementsTable.css";

interface SelectedBaustein {
    name: string;
}
interface DropdownLabel {
    label: string;
}

export const RequirementsTable = ({
    props,
    passTutorialstreamToParent,
}: any) => {
    let emptyTutorialstream: Tutorialstream = new ClassTutorialstream();
    let emptyRequirement: Requirement = new ClassRequirement();

    const [tutorialstream, setTutorialstream] =
        useState<Tutorialstream>(emptyTutorialstream);
    const [requirement, setRequirement] =
        useState<Requirement>(emptyRequirement);
    const [requirements, setRequirements] = useState<Requirement[]>([]);
    const [bausteine, setBausteine] = useState<Baustein[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState(false);
    const [tutorialstreamDialog, setTutorialstreamDialog] = useState(false);
    const [deleteRequirementDialog, setDeleteRequirementDialog] =
        useState(false);

    const [selectedBaustein, setSelectedBaustein] =
        useState<string>("Baustein");
    const [selectedDropdownLabel, setSelectedDropdownLabel] =
        useState<DropdownLabel>({ label: "Level" });
    const DropdownLabels = [
        { label: "Beginner" },
        { label: "Intermediate" },
        { label: "Expert" },
    ];

    /* Load All Bausteine */
    useEffect(() => {
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
        setTutorialstream(props);
        setRequirements(props.requirements);
    }, []);

    const passValueToParent = (value: SelectedBaustein) => {
        setSelectedBaustein(value?.name);
    };

    const saveRequirement = () => {
        setSubmitted(true);
        if (
            selectedBaustein !== "Baustein" &&
            selectedBaustein !== undefined &&
            selectedDropdownLabel.label !== "Level"
        ) {
            console.log("selectedBaustein", selectedBaustein !== undefined);
            // Update an Existing Requirement
            if (requirement.requirementId) {
                let _tutorialstream = { ...tutorialstream };
                let _requirements = [...requirements];
                let _requirement = { ...requirement };

                const index = findIndexById(requirement.requirementId);
                // Update Requirement baustein & level with the selected ones
                _requirement.baustein = selectedBaustein;
                _requirement.level = selectedDropdownLabel.label;
                // Update an Existing Requirement With a New One by giving the Index
                _requirements[index] = _requirement;
                setRequirements(_requirements);
                // Replace The Old Requirements with the new Requirement in Tutorialstream Array
                _tutorialstream.requirements = _requirements;
                passTutorialstreamToParent(_tutorialstream);
            } else {
                // Create New Requirement
                console.log("Create New Requirement");
                const newRequirement: Requirement = {
                    requirementId: createId(),
                    baustein: selectedBaustein,
                    level: selectedDropdownLabel.label,
                    position: -1,
                };
                tutorialstream.requirements.push(newRequirement);
                passTutorialstreamToParent(tutorialstream);
            }
            setSubmitted(false);
            setTutorialstreamDialog(false);
            setSelectedBaustein("Baustein");
            setSelectedDropdownLabel({ label: "Level" });
        }
    };

    const removeRequirement = async () => {
        let _requirements = requirements.filter(
            (val) => val.requirementId !== requirement.requirementId
        );
        tutorialstream.requirements = _requirements;
        // Delete Requirement
        setRequirements(_requirements);
        passTutorialstreamToParent(tutorialstream);
        setDeleteRequirementDialog(false);
    };

    const editRequirement = (requirement: Requirement) => {
        setSelectedBaustein(requirement.baustein);
        setSelectedDropdownLabel({ label: requirement.level });
        setRequirement(requirement);
        setTutorialstreamDialog(true);
    };

    const confirmDeleteRequirement = (requirement: Requirement) => {
        setRequirement(requirement);
        setDeleteRequirementDialog(true);
    };

    const openNew = () => {
        setRequirement(emptyRequirement);
        setSubmitted(false);
        setTutorialstreamDialog(true);
        setSelectedBaustein("Baustein");
        setSelectedDropdownLabel({ label: "Level" });
    };

    const hideDialog = () => {
        setRequirement(emptyRequirement);
        setSubmitted(false);
        setTutorialstreamDialog(false);
    };

    const hideDeleteRequirementDialog = () => {
        setDeleteRequirementDialog(false);
    };

    const createId = () => {
        let id = "";
        let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 12; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < requirements.length; i++) {
            if (requirements[i].requirementId === id) {
                index = i;
                break;
            }
        }

        return index;
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
                onClick={saveRequirement}
            />
        </React.Fragment>
    );

    const deleteRequirementDialogFooter = (
        <React.Fragment>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideDeleteRequirementDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={removeRequirement}
            />
        </React.Fragment>
    );

    const actionBodyTemplate = (rowData: any) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mr-2"
                    onClick={() => {
                        editRequirement(rowData);
                    }}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-warning"
                    onClick={() => confirmDeleteRequirement(rowData)}
                />
            </React.Fragment>
        );
    };

    return (
        <>
            <DataTable
                header="Benötigte Bausteine:"
                value={props.requirements}
                responsiveLayout="scroll"
            >
                <Column
                    field="baustein"
                    header="Baustein"
                    style={{ minWidth: "10rem", fontWeight: "bold" }}
                ></Column>
                <Column
                    field="level"
                    header="Level"
                    style={{ minWidth: "10rem", fontWeight: "bold" }}
                ></Column>
                <Column
                    body={actionBodyTemplate}
                    exportable={false}
                    style={{ minWidth: "8rem" }}
                ></Column>
            </DataTable>
            <div className="p-3">
                <Button
                    icon="pi pi-plus"
                    className="p-button-rounded p-button-success"
                    onClick={openNew}
                />
            </div>

            {/* Dialog For Creating new Bausteine & Levels */}
            <Dialog
                visible={tutorialstreamDialog}
                style={{ width: "450px" }}
                header="Tutorialstream Details"
                modal
                className="p-fluid"
                footer={tutorialstreamDialogFooter}
                onHide={hideDialog}
            >
                <div className="flex flex-wrap align-items-center justify-content-around">
                    {isLoading ? (
                        <CustomDropdownMenu
                            loadedItems={bausteine}
                            passValueToParent={passValueToParent}
                            classes="w-11rem font-bold"
                            placeholderText={selectedBaustein}
                        />
                    ) : (
                        <ProgressSpinner />
                    )}
                    <Dropdown
                        className="w-11rem font-bold"
                        value={selectedDropdownLabel}
                        options={DropdownLabels}
                        onChange={(e) => setSelectedDropdownLabel(e.value)}
                        placeholder={selectedDropdownLabel.label}
                    />
                    {submitted &&
                        (selectedBaustein === "Baustein" ||
                            selectedBaustein === undefined) && (
                            <small className="mt-3 p-error">
                                Die Eingabe von Baustein ist erforderlich.
                            </small>
                        )}
                    {submitted && selectedDropdownLabel.label === "Level" && (
                        <small className="mt-1 p-error">
                            Die Eingabe von Level ist erforderlich.
                        </small>
                    )}
                </div>
            </Dialog>
            <Dialog
                visible={deleteRequirementDialog}
                style={{ width: "450px" }}
                header="Confirm"
                modal
                footer={deleteRequirementDialogFooter}
                onHide={hideDeleteRequirementDialog}
            >
                <div className="confirmation-content">
                    <i
                        className="pi pi-exclamation-triangle mr-3"
                        style={{ fontSize: "2rem" }}
                    />
                    {requirement && (
                        <span>
                            Sind Sie sicher, dass Sie
                            <b>
                                {" Baustein: " +
                                    requirement.baustein +
                                    " & " +
                                    "Level: " +
                                    requirement.level}
                            </b>
                            löschen möchten?
                        </span>
                    )}
                </div>
            </Dialog>
        </>
    );
};
