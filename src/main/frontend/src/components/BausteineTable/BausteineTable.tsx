import React, { FC, useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Baustein } from "../../interfaces/Baustein";
import { ClassBaustein } from "../../classes/ClassBaustein";
import {
  createBaustein,
  deleteBaustein,
  getAllBausteine,
  getBausteinByName,
  updateBaustein,
} from "../../api/bausteine";
import "./BausteineTable.css";

export const BausteineTable = () => {
  let emptyBaustein: Baustein = new ClassBaustein();

  const [baustein, setBaustein] = useState<Baustein>(emptyBaustein);
  const [bausteine, setBausteine] = useState<Baustein[]>([]);
  const [bausteinDialog, setBausteinDialog] = useState(false);
  const [deleteBausteinDialog, setDeleteBausteinDialog] = useState(false);
  const [deleteBausteineDialog, setDeleteBausteineDialog] = useState(false);
  const [selectedBausteine, setSelectedBausteine] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef<any>(null);
  const dt = useRef<any>(null);

  useEffect(() => {
    /* Get all Bausteine */
    const fetchAllBausteine = async () => {
      await getAllBausteine()
        .then((data) => {
          setBausteine(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchAllBausteine();
  }, []);

  const openNew = () => {
    // setBaustein(emptyBaustein);
    setSubmitted(false);
    setBausteinDialog(true);
  };

  const hideDialog = () => {
    setBaustein(emptyBaustein);
    setSubmitted(false);
    setBausteinDialog(false);
  };

  const hideDeleteBausteinDialog = () => {
    setDeleteBausteinDialog(false);
  };

  const hideDeleteBausteineDialog = () => {
    setDeleteBausteineDialog(false);
  };

  const saveBaustein = async () => {
    setSubmitted(true);
    if (baustein.name.trim()) {
      let _bausteine = [...bausteine];
      let _baustein = { ...baustein };
      /* If the baustein has an ID that means we want to update a baustein when not then we want to create one */
      if (baustein.bausteinId) {
        const index = findIndexById(baustein.bausteinId);

        // Update Baustein
        _bausteine[index] = _baustein;
        await updateBaustein(_baustein);

        toast?.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Baustein Updated",
          life: 3000,
        });
      } else {
        // Create Baustein
        await createBaustein(_baustein);
        await getBausteinByName(_baustein.name)
          .then((data) => {
            _bausteine.push(...data);
            console.log("data", data);
          })
          .catch((err) => {
            console.log(err);
          });

        toast?.current?.show({
          severity: "success",
          summary: "Successful",
          detail: "Baustein Created",
          life: 3000,
        });
      }

      setBausteine(_bausteine);
      setBausteinDialog(false);
      setBaustein(emptyBaustein);
    }
  };

  const editBaustein = (baustein: Baustein) => {
    setBaustein({ ...baustein });
    setBausteinDialog(true);
  };

  const confirmDeleteBaustein = (baustein: Baustein) => {
    setBaustein(baustein);
    setDeleteBausteinDialog(true);
  };

  const removeBaustein = async () => {
    let _bausteine = bausteine.filter(
      (val) => val.bausteinId !== baustein.bausteinId
    );
    // Delete Baustein
    setBausteine(_bausteine);
    await deleteBaustein(baustein.bausteinId).then((res) => {
      res
        ? toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Baustein Deleted",
            life: 3000,
          })
        : toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Error From The Serverside",
            life: 3000,
          });
    });

    setDeleteBausteinDialog(false);
    setBaustein(emptyBaustein);
  };

  const findIndexById = (id: string) => {
    let index = -1;
    for (let i = 0; i < bausteine.length; i++) {
      if (bausteine[i].bausteinId === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const confirmDeleteSelected = () => {
    setDeleteBausteineDialog(true);
  };

  const deleteSelectedBausteine = () => {
    // Delete Selected Bausteine
    let _bausteine = bausteine.filter(
      // @ts-ignore
      (val) => !selectedBausteine.includes(val)
    );

    // @ts-ignore
    selectedBausteine.map((baustein: Baustein) =>
      deleteBaustein(baustein.bausteinId)
    );

    setBausteine(_bausteine);
    setDeleteBausteineDialog(false);
    setSelectedBausteine(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Bausteine Deleted",
      life: 3000,
    });
  };

  const onInputChange = (e: any, name: string) => {
    const val = (e.target && e.target.value) || "";
    let _baustein = { ...baustein };
    // @ts-ignore
    _baustein[`${name}`] = val;

    setBaustein(_baustein);
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
          disabled={!selectedBausteine || !selectedBausteine.length}
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
          onClick={() => editBaustein(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteBaustein(rowData)}
        />
      </React.Fragment>
    );
  };

  const bausteinDialogFooter = (
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
        onClick={saveBaustein}
      />
    </React.Fragment>
  );
  const deleteBausteinDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteBausteinDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={removeBaustein}
      />
    </React.Fragment>
  );
  const deleteBausteineDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteBausteineDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedBausteine}
      />
    </React.Fragment>
  );

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <h1 className="m-0 pb-5 text-center">Alle Bausteine</h1>

      <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={bausteine}
          selectionMode="checkbox"
          selection={selectedBausteine}
          onSelectionChange={(e) => setSelectedBausteine(e.value)}
          dataKey="bausteinId"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Zeigt {first} bis {last} von {totalRecords} Bausteine"
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
            style={{ minWidth: "16rem", fontWeight: "bold" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>

      {/* Dialog For Creating or Updating a Baustein */}
      <Dialog
        visible={bausteinDialog}
        style={{ width: "450px" }}
        header="Baustein Details"
        modal
        className="p-fluid"
        footer={bausteinDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            value={baustein.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !baustein.name })}
          />
          {submitted && !baustein.name && (
            <small className="p-error">Name ist erforderlich.</small>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteBausteinDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteBausteinDialogFooter}
        onHide={hideDeleteBausteinDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {baustein && (
            <span>
              Sind Sie sicher, dass Sie <b>{baustein.name}</b> löschen möchten?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteBausteineDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteBausteineDialogFooter}
        onHide={hideDeleteBausteineDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {baustein && (
            <span>
              Möchten Sie die ausgewählten Bausteine wirklich löschen?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};
