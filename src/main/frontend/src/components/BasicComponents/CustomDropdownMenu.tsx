import React, { FC, useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Tutorialstream } from "../../interfaces/Tutorialstream";
import { Baustein } from "../../interfaces/Baustein";

interface CustomDropdownMenuProps {
    loadedItems: Tutorialstream[] | Baustein[];
    passValueToParent: any;
    classes?: string;
    placeholderText: string;
}

export const CustomDropdownMenu: FC<CustomDropdownMenuProps> = ({
    loadedItems,
    passValueToParent,
    classes,
    placeholderText,
}) => {
    const [selectedItem, setSelectedItem] = useState<
        Tutorialstream | Baustein
    >();
    const [items, setItems] = useState<Tutorialstream[] | Baustein[]>([]);

    useEffect(() => {
        setItems(loadedItems);
    }, []);

    const onValueChange = (e: { value: Tutorialstream | Baustein }) => {
        setSelectedItem(e.value);
        passValueToParent(e.value);
    };

    const selectedItemTemplate = (option: any, props: any) => {
        if (option) {
            return <div>{option.name}</div>;
        }
        return <span>{props.placeholder}</span>;
    };

    const ItemOptionTemplate = (option: any) => {
        return <div>{option.name}</div>;
    };

    return (
        <Dropdown
            className={classes}
            value={selectedItem}
            options={items}
            onChange={onValueChange}
            optionLabel="name"
            filter
            showClear
            filterBy="name"
            placeholder={placeholderText}
            valueTemplate={selectedItemTemplate}
            itemTemplate={ItemOptionTemplate}
        />
    );
};
