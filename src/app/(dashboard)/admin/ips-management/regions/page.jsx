import { DataTableDemo } from "@/components/customui/ips/data-table";
import RegionsDataTable from "@/components/customui/regions/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react"; // Import the Plus icon from Lucide
import Link from "next/link";

const Regions = () => {
  return (
    <div className="">
      <div className="flex justify-end mb-4">
        <Link href={"/admin/ips-management/regions/create"}>
        <Button className="bg-purple-400 hover:bg-purple-600 text-sm flex items-center">
          <Plus className="mr-2  h-4 w-4" /> 
          Create New
        </Button>
        </Link>
      </div>
     <RegionsDataTable/>
    </div>
  );
};

export default Regions;
