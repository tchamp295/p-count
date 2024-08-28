import { DataTableDemo } from "@/components/customui/ips/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react"; // Import the Plus icon from Lucide
import Link from "next/link";

const Sfps= () => {
  return (
    <div className="">
      <div className="flex justify-end mb-4">
        <Link href={"/admin/ips-management/sfps/create"}>
        <Button className="bg-purple-400 flex items-center">
          <Plus className="mr-2 h-4 w-4" /> 
          Create New
        </Button>
        </Link>
      </div>
      <DataTableDemo />
    </div>
  );
};

export default Sfps;
