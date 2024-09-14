import IpDataTable from "@/components/customui/ips/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react"; // Import the Plus icon from Lucide
import Link from "next/link";

const Regions = () => {
  return (
    <div className="flex-1">
      <div className="flex justify-end mb-4">
      
      </div>
      <IpDataTable />
    </div>
  );
};

export default Regions;
