import React, { useEffect, useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { CustomDropdownMenu } from "../BasicComponents/CustomDropdownMenu";
import { CustomButton } from "../BasicComponents/CustomButton";
import { CustomHeadline } from "../BasicComponents/CustomHeadline";
import { Center } from "../BasicComponents/Center";
import { getAllTutorialstreams } from "../../api/tutorialstreams";
import { Tutorialstream } from "../../interfaces/Tutorialstream";
import { useNavigate } from "react-router-dom";

interface ChildPassedData {
    frameworkId: string;
    name: string;
}

export const Home = () => {
    const [selectedFrameworkName, setSelectedFrameworkName] =
        useState<string>("");
    const [selectedFrameworkId, setSelectedFrameworkId] = useState<string>("");
    const [frameworks, setFrameworks] = useState<Tutorialstream[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const classes: string = "w-20rem";
    const placeholderText: string = "Wählen Sie ein Thema aus";
    const navigate = useNavigate();

    /* Load All Frameworks */
    useEffect(() => {
        const fetchAllFrameworks = async () => {
            await getAllTutorialstreams()
                .then((data) => {
                    setFrameworks(data);
                    setIsLoading(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchAllFrameworks();
    }, []);

    const passValueToParent = (value: ChildPassedData) => {
        setSelectedFrameworkName(value.name);
        setSelectedFrameworkId(value.frameworkId);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (selectedFrameworkName) {
            navigate("/tutorial", {
                state: {
                    tutorialId: selectedFrameworkId,
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CustomHeadline>Willkommen bei Tutorial Streams</CustomHeadline>
            {isLoading ? (
                <Center>
                    <div className="p-5">
                        <CustomDropdownMenu
                            loadedItems={frameworks}
                            passValueToParent={passValueToParent}
                            classes={classes}
                            placeholderText={placeholderText}
                        />
                    </div>
                </Center>
            ) : (
                <Center>
                    <ProgressSpinner />
                </Center>
            )}
            <CustomButton label="Weiter" type="submit" />
        </form>
    );
};
