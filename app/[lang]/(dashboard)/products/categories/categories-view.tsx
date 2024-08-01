"use client";

import {Card, CardContent} from "@/components/ui/card";

import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import CategoriesNewEdit from "@/app/[lang]/(dashboard)/products/categories/categories-new-edit";

const CategoriesView = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<any | null>(null);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);


    const addItemModal = () => {
        setSelectedItem(null);
        setSelectedItemId(null);
        setIsOpen(true);
        // wait().then(() => (document.body.style.pointerEvents = "auto"));
    };

    const closeModal = () => {
        setIsOpen(false);
        // setSelectedProject(null);
        // setSelectedProjectId(null);

        // wait().then(() => (document.body.style.pointerEvents = "auto"));
    };

    return (
        <div className="space-y-5">
            <Card>
                <CardContent className="pt-6">
                    <div className="flex lg:flex-row flex-col flex-wrap gap-6">
                        <div className="flex-1 flex gap-3">
                            <Button onClick={addItemModal} className="whitespace-nowrap">
                                <Plus className="w-4 h-4  ltr:mr-2 rtl:ml-2 "/>
                                Agregar categoría
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <CategoriesNewEdit item="" open={isOpen} onClose={closeModal} selectedId="1"/>
        </div>
    )
}

export default CategoriesView;
