"use client";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import {Input} from "@/components/ui/input";
import{Button} from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";


export const CreateWorkspaceModal = () => {
    const [open, setOpen] = useCreateWorkspaceModal();
    const [name, setName] = useState("");
    const handleClose = () => {
        setOpen(false);
    }
    const { mutate ,isPending } = useCreateWorkspace();
    
   

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name}, {
        onSuccess(data) {
            console.log("Workspace created with ID:", data);
        },
        });
    };



    return (
        <Dialog open={open} onOpenChange={handleClose}> 

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Workspace</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <Input value={name}
                    onChange={(e) => setName(e.target.value)} type="text"
                    disabled={isPending}
                    required
                    autoFocus
                    minLength={3}
                    placeholder="Workspace Name e.g. 'Work','Personal', 'Home'"  />

                    <div className="flex justify-end gap-2">
                        <Button disabled={isPending}>Create Workspace</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
