import { Menubar } from "primereact/menubar";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const MenuBar: FC = () => {
    const navigate = useNavigate();

    const items = [
        {
            label: "Home",
            icon: "pi pi-home",
            command: () => {
                navigate("/");
            },
        },
        {
            label: "Bausteine",
            icon: "pi pi-pencil",
            command: () => {
                navigate("/bausteineTable");
            },
        },
        {
            label: "Tutorialstreams",
            icon: "pi pi-pencil",
            command: () => {
                navigate("/tutorialstreamsTable");
            },
        },
        {
            label: "Tutorials",
            icon: "pi pi-pencil",
            command: () => {
                navigate("/tutorialstable");
            },
        },
    ];
    return <Menubar model={items} />;
};
