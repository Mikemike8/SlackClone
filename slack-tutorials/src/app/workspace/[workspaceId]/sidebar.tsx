import { BellIcon, Home, MessagesSquareIcon, MoreHorizontal } from "lucide-react";

import { UserButton } from "@/features/auth/components/user-button";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { SidebarButton } from "./sidebar-button";
import { usePathname } from "next/navigation";


export const Sidebar = () => {
    const pathname = usePathname();
    return(
        <aside className="w-[70px] h-full bg-[#481349] flex flex-col items-center gap-y-4 pt-[9px] pb-4">
        
            <WorkspaceSwitcher />
            <SidebarButton icon={Home} label="Home" isactive= {pathname.includes("/workspace")} />
            <SidebarButton icon={MessagesSquareIcon} label="Dms" isactive= {pathname.includes("/dms")} />
            <SidebarButton icon={BellIcon} label="Activity" isactive= {pathname.includes("/activity")} />
            <SidebarButton icon={MoreHorizontal} label="More" isactive= {pathname.includes("/more")} />

            <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
                <UserButton />
            </div>
        </aside>

    )


};
