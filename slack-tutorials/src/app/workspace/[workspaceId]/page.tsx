
"use client";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { use } from "react";




const WorkspaceIdPage = () =>{

    const workspaceId = useWorkspaceId();
    const {data } =useGetWorkspace({id: workspaceId});
    return (
        <div>
            Workspace {data?.name}
   
        </div>
    )
}


export default WorkspaceIdPage;