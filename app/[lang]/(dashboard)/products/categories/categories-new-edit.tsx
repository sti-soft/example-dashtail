"use client";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {useTransition} from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const schema = z.object({
    description: z.string().min(3),
})

const CategoriesNewEdit = ({ open, item, onClose, selectedId} : {
    open: boolean;
    onClose: () => void;
    selectedId: string;
    item: string;
}) => {
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const ResetForm = async () => {
        reset();
    };

    const onSubmit = (data: any) => {
        console.log("onSubmit", data);
        onClose();
        reset();
    }

    return (
        <>
            <Sheet open={open}>
                <SheetContent
                    onClose={() => {
                        ResetForm();
                        onClose();
                    }}
                    className="px-6"
                    aria-labelledby="sheet-title"
                    aria-describedby="sheet-description"
                >
                    <SheetHeader className="px-0">
                        <SheetTitle id="sheet-title">
                            {item ? "Editar " : "Nuevo"}
                        </SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100%-40px)]">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-4  mt-6">
                                <div>
                                    <Label htmlFor="description" className="mb-1.5">
                                        Descripción
                                    </Label>
                                    <Input
                                        type="text"
                                        {...register("description")}
                                        className={cn("", {
                                            "border-destructive focus:border-destructive":
                                            errors.description,
                                        })}
                                    />
                                    {errors.description && (
                                        <p
                                            className={cn("text-xs", {
                                                "text-destructive": errors.description,
                                            })}
                                        >
                                            {errors.description.message ? String(errors.description.message) : ""}
                                        </p>
                                    )}
                                </div>
                            </div>



                            <div className="mt-12 flex gap-6">
                                <Button
                                    color="warning"
                                    variant="soft"
                                    className="flex-1"
                                    onClick={() => {
                                        onClose()
                                    }}
                                >
                                    Cancel
                                </Button>

                                <Button type="submit" disabled={isPending} className="flex-1">
                                    {/*{project ? "Update" : "  Create  "} Project*/}
                                    Crear categoría
                                </Button>
                            </div>
                        </form>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default CategoriesNewEdit;