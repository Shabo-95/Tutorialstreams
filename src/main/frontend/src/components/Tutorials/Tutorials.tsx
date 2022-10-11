import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DataView } from "primereact/dataview";
import { CustomHeadline } from "../BasicComponents/CustomHeadline";
import { Tutorial } from "../../interfaces/Tutorial";
import { getTutorialByBausteinAndLevel } from "../../api/tutorials";
import "./Tutorials.css";
import { Tag } from "primereact/tag";

export const Tutorials = () => {
    const location = useLocation();

    const baustein: string = location.state.baustein;
    const level: string = location.state.level;

    const [tutorials, setTutorials] = useState<Tutorial[]>([]);

    useEffect(() => {
        /* Get Tutorials By Baustein And Level */
        const fetchTutorialsByBausteinAndName = async () => {
            await getTutorialByBausteinAndLevel(baustein, level)
                .then((data) => {
                    console.log("data", data);
                    setTutorials(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchTutorialsByBausteinAndName();
    }, []);

    const itemTemplate = (data: any) => {
        return (
            <div className="col-12 md:col-4 mb-6">
                <a href={data.url} target="_blank">
                    <div className="tutorial-grid-item card border-round-3xl">
                        <img
                            src={`images/tutorial/${data.image}`}
                            onError={(e) =>
                                // @ts-ignore
                                (e.target.src =
                                    "https://freesvg.org/img/Button---Tutorial.png")
                            }
                            alt={data.baustein}
                        />
                        <div className="tutorial-name">{data.name}</div>
                        <div className="pt-4">
                            <Tag
                                className="mr-3"
                                severity="info"
                                value={data.baustein}
                                rounded
                            ></Tag>
                            <Tag
                                severity={
                                    data.level === "Beginner"
                                        ? "success"
                                        : data.level === "Intermediate"
                                        ? "warning"
                                        : "danger"
                                }
                                value={data.level}
                                rounded
                            ></Tag>
                        </div>
                    </div>
                </a>
            </div>
        );
    };

    return (
        <>
            <CustomHeadline>Tutorials</CustomHeadline>
            <DataView
                value={tutorials}
                layout="grid"
                itemTemplate={itemTemplate}
                paginator
                rows={9}
            ></DataView>
        </>
    );
};
