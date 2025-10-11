import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {

    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { Loader, Plus } from "lucide-react";


export const WorkspaceSwitcher = () => {
    const router = useRouter();
    const workspaceId =useWorkspaceId();
     const [_open, setOpen]=useCreateWorkspaceModal();
     const {data:workspaces ,isLoading:workspacesLoading} = useGetWorkspaces();
     const {data:workspace ,isLoading:workspaceLoading} =useGetWorkspace({id: workspaceId});
   

     const filteredWorkspaces = workspaces?.filter((workspace) => workspace?._id !== workspaceId);


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild  className="outline-none relative">
                <Button className="size-9 relative overflow-hidden bg-[#ABABAD] text-slate-800 hover:bg-[#ABABAD/80 ] font-semibold text-xl">
                    {workspaceLoading ? (
                        <Loader className ="size-5 animate-spin shrink-0"/>
                    ) :(
                        workspace?.name?.charAt(0).toUpperCase()
                    )}

                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="bottom" className="w-64">
                <DropdownMenuItem onClick={() => router.push(`/workspace/${workspaceId}`)} className="cursor-pointer font-semibold flex-col justify-start items-start capitalize">{workspace?.name}
                    <span className="text-xs text-muted-foreground font-normal">
                        Active Workspace
                    </span>
                </DropdownMenuItem>
                {filteredWorkspaces?.map((workspace) => (
                    <DropdownMenuItem key={workspace._id} onClick={() => router.push(`/workspace/${workspace!._id}`)} className=" overflow-hidden cursor-pointer capitalize">
                     <div className=" skrink-0 size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2 ">
                        {workspace.name.charAt(0).toUpperCase()}
                     </div>
                     <span className="truncate" >{workspace.name}</span>

                    </DropdownMenuItem>
                ))}

                <DropdownMenuItem onClick={() => setOpen(true)} className="cursor-pointer mt-2 flex items-center"   >
                        <div className=" size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2 ">
                            <Plus/>
                        </div>
                        <span >Create New Workspace</span>
            
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
