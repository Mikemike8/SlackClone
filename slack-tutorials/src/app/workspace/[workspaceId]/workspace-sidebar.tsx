import { AlertTriangle, Loader } from "lucide-react";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { WorkspaceHeader } from "./workspace-header";


export const WorkspaceSidebar = () => {
    const workspaceId = useWorkspaceId();
    const {data:member, isLoading: memberLoading}  = useCurrentMember({workspaceId});
    const {data:workspace, isLoading: workspaceLoading} = useGetWorkspace({id:workspaceId});
 if(memberLoading || workspaceLoading){
    return(
        <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
           <Loader className="animate-spin size-5 text-white" />
        </div>

    ) 
 }

  if(!workspace || !member){
    return(
        <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
           <AlertTriangle className=" size-5 text-white" />
              <p className="text-sm text-white">Workspace Failed</p>    
        </div>

    ) 
 }
 
    return (
   <div className="flex flex-col  bg-[#5E2C5F] h-full">
    <WorkspaceHeader workspace={workspace} isAdmin={member?.role === "admin"} />

   </div>
         )
};
