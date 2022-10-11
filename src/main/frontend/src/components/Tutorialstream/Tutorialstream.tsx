import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OrganizationChart } from "primereact/organizationchart";
import { Tag } from "primereact/tag";
import { CustomHeadline } from "../BasicComponents/CustomHeadline";
import { getTutorialstreamById } from "../../api/tutorialstreams";
import { ClassTutorialstream } from "../../classes/ClassTutorialstream";
import "./Tutorialstream.css";

interface Childeren {
    label: string;
    data: { level: string };
}

export const Tutorialstream = () => {
    const location = useLocation();
    const tutorialId: string = location.state.tutorialId;

    const [tutorialstream, setTutorialstream] = useState<ClassTutorialstream>(
        new ClassTutorialstream()
    );
    const [children, setChildren] = useState<Childeren[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllFrameworks = async (tutorialId: string) => {
            await getTutorialstreamById(tutorialId)
                .then((data: ClassTutorialstream) => {
                    setTutorialstream(data);
                    const _children: Childeren[] = [];
                    data.requirements.map((data) => {
                        _children.push({
                            label: data.baustein,
                            data: { level: data.level },
                        });
                    });
                    setChildren(_children);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchAllFrameworks(tutorialId);
    }, []);

    const data = [
        {
            tutorialstream: tutorialstream.name,
            expanded: true,
            children: children,
        },
    ];

    console.log("children", children);

    const nodeTemplate = (node: any) => {
        return (
            <>
                {node.tutorialstream && (
                    <div className="p-3 pb-4 node-header font-bold border-round-3xl">
                        {node.tutorialstream}
                    </div>
                )}
                <div
                    className="node-hover"
                    onClick={() => {
                        console.log(
                            node.label && node.label,
                            node.data && node.data.level
                        );
                        if (node.label && node.data)
                            navigate("/tutorials", {
                                state: {
                                    baustein: node.label,
                                    level: node.data.level,
                                },
                            });
                    }}
                >
                    {node.label && (
                        <div className="p-3 node-header font-bold border-round-top-3xl">
                            {node.label}
                        </div>
                    )}
                    {node.data && (
                        <div className="p-3 node-content font-bold border-round-bottom-3xl">
                            <Tag
                                severity={
                                    node.data.level === "Beginner"
                                        ? "success"
                                        : node.data.level === "Intermediate"
                                        ? "warning"
                                        : "danger"
                                }
                                value={node.data.level}
                                rounded
                            ></Tag>
                        </div>
                    )}
                </div>
            </>
        );
    };

    return (
        <>
            <CustomHeadline>Tutorial Stream</CustomHeadline>
            <OrganizationChart
                value={data}
                nodeTemplate={nodeTemplate}
            ></OrganizationChart>
        </>
    );
};
