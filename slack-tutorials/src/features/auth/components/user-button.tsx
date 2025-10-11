"use client";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
}    from "@/components/ui/dropdown-menu";
import { Loader, LogOut } from "lucide-react";
import { useCurrentUser } from "../api/use-current-user";
import { useAuthActions } from "@convex-dev/auth/react";


export  const UserButton = () => {
    const { signOut } = useAuthActions();
    const { data, isLoading } = useCurrentUser();
    if (isLoading) {
        return <Loader className="size-4 animate-spin text-muted-foreground" />;
    }
    if (!data) {
        return null;
    }

    const { name,image} = data;

    const avatarFallback = name!.charAt(0).toUpperCase();

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="size-10 hover:opacity-70 transition">
                    <AvatarImage src={image} alt={name} />
                    <AvatarFallback className="bg-muted-foreground">{avatarFallback}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right" className="w-60">
                <DropdownMenuItem  onClick={() => signOut()} className="h-10">
                    <LogOut className="mr-2 size-4" />
                    Sign Out
                    
                </DropdownMenuItem>
    
            </DropdownMenuContent>
        </DropdownMenu>
    );
};