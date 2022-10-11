import React, { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MenuBar } from "./components/Menubar/MenuBar";
import { CustomCard } from "./components/BasicComponents/CustomCard";
import { Home } from "./components/Home/Home";
import { Error } from "./components/Error/Error";
import { BausteineTable } from "./components/BausteineTable/BausteineTable";
import { TutorialstreamsTable } from "./components/TutorialstreamsTable/TutorialstreamsTable";
import { Tutorialstream } from "./components/Tutorialstream/Tutorialstream";
import { Tutorials } from "./components/Tutorials/Tutorials";
import { TutorialsTable } from "./components/TutorialsTable/TutorialsTable";

export const App: FC = () => {
    return (
        <BrowserRouter>
            <MenuBar />
            <CustomCard>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                        path="/bausteineTable"
                        element={<BausteineTable />}
                    ></Route>
                    <Route
                        path="/tutorialstreamsTable"
                        element={<TutorialstreamsTable />}
                    ></Route>
                    <Route
                        path="/tutorialsTable"
                        element={<TutorialsTable />}
                    ></Route>
                    <Route
                        path="/tutorial"
                        element={<Tutorialstream />}
                    ></Route>
                    <Route path="/tutorials" element={<Tutorials />}></Route>

                    <Route path="*" element={<Error />}></Route>
                </Routes>
            </CustomCard>
        </BrowserRouter>
    );
};
