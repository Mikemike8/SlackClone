import { Button } from "@/components/ui/button";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Info, Search } from "lucide-react";

const Toolbar = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspace({ id: workspaceId });

  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 px-3 text-white relative">
      {/* Left side (optional logo area) */}
      <div className="flex items-center gap-2"></div>

      {/* Center - Search Bar */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-[642px] px-3">
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent/25 w-full justify-start h-7 px-2"
        >
          <Search className="size-4 text-white mr-2" />
          <span className="text-sm text-white/80">
            Search {data?.name}
          </span>
        </Button>
      </div>

      {/* Right side - Info button */}
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="transparent" size="iconSm">
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};

export default Toolbar;
