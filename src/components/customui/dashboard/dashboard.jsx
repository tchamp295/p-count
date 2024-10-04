"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Skeleton from "@mui/material/Skeleton"; // Import MUI Skeleton
import { Barchart } from "./charts/Barchart";
import { Piechart } from "./charts/Piechart";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [totalIps, setTotalIps] = useState(0);
  const [totalRegions, setTotalRegions] = useState(0);
  const [totalSfps, setTotalSfps] = useState(0); // State for total SFPs
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New IP added.",
      isRead: false,
      timestamp: "2024-08-25 10:00 AM",
    },
    {
      id: 2,
      message: "System maintenance scheduled.",
      isRead: true,
      timestamp: "2024-08-24 9:00 PM",
    },
    {
      id: 3,
      message: "New alert from Nairobi region.",
      isRead: false,
      timestamp: "2024-08-25 09:45 AM",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responses = await Promise.all([
          fetch("/api/ips?type=count"),
          fetch("/api/regions/total"),
          fetch("/api/sfps/total"),
        ]);

        const [ipsResponse, regionsResponse, sfpsResponse] = responses;

        if (!ipsResponse.ok || !regionsResponse.ok || !sfpsResponse.ok) {
          throw new Error("Error fetching data");
        }

        const [ipsData, regionsData, sfpsData] = await Promise.all([
          ipsResponse.json(),
          regionsResponse.json(),
          sfpsResponse.json(),
        ]);

        setTotalIps(ipsData.count);
        setTotalRegions(regionsData.count);
        setTotalSfps(sfpsData.count);
      } catch (error) {
        toast.error(`Failed to load data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const SkeletonCard = () => (
    <div className="bg-gradient-to-br from-gray-100 to-gray-50  p-4 rounded-sm transition-all duration-300 hover:scale-105">
      <div className="pb-1 text-center">
        <Skeleton variant="text" width="50%" height={10}  style={{ margin: "0 auto" }} />
      </div>
      <div className="text-center font-semibold">
        <Skeleton variant="rectangular" width="50%" height={40} style={{ margin: "0 auto" }} />
      </div>
    </div>
  );

  return (
    <div className="w-full p-4 font-dmSans">
     <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
  {loading ? (
    <>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </>
  ) : (
    <>
      <div className="bg-gradient-to-br from-indigo-100 to-white shadow-md p-2 rounded-lg transition-all duration-300 hover:scale-105">
        <h3 className="text-base font-semibold text-center">IPS</h3>
        <div className="text-center font-extrabold text-lg text-indigo-700">
          {totalIps}
        </div>
        <div className="text-center mt-1">
          <a href="/admin/ips" className="text-indigo-600  hover:underline text-sm font-oleo font-thin">
            View details...
          </a>
        </div>
      </div>

      <div className="bg-gradient-to-br from-teal-100 to-white shadow-md p-2 rounded-lg transition-all duration-300 hover:scale-105">
        <h3 className="text-base font-semibold text-center">Regions </h3>
        <div className="text-center font-extrabold text-lg text-teal-700">
          {totalRegions}
        </div>
        <div className="text-center mt-1">
          <a href="/admin/regions" className="text-teal-600 hover:underline text-sm font-oleo font-thin">
            View details...
          </a>
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-100 to-white shadow-md p-2 rounded-lg transition-all duration-300 hover:scale-105">
        <h3 className="text-base font-semibold text-center">Total SFP </h3>
        <div className="text-center font-extrabold text-lg text-yellow-700">
          {totalSfps}
        </div>
        <div className="text-center mt-1">
          <a href="/admin/sfps" className="text-yellow-600 hover:underline text-sm font-oleo font-thin">
            View details...
          </a>
        </div>
      </div>

      <div className="bg-gradient-to-br from-pink-100 to-white shadow-md p-2 rounded-lg transition-all duration-300 hover:scale-105">
        <h3 className="text-base font-semibold text-center">Active Alerts</h3>
        <div className="text-lg font-extrabold text-center text-pink-700">0</div>
        <div className="text-center mt-1">
          <a href="/admin/alerts/activ" className="text-pink-600 hover:underline text-sm font-oleo font-thin">
            View details...
          </a>
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-100 to-white shadow-md p-2 rounded-lg transition-all duration-300 hover:scale-105">
        <h3 className="text-base font-semibold text-center">All Alerts</h3>
        <div className="text-lg font-extrabold text-center text-red-700">0</div>
        <div className="text-center mt-1">
          <a href="/admin/total-alerts" className="text-red-600 hover:underline text-sm font-oleo font-thin">
            View details...
          </a>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-100 to-white shadow-md p-2 rounded-lg transition-all duration-300 hover:scale-105">
        <h3 className="text-base font-semibold text-center">Contacts</h3>
        <div className="text-lg font-extrabold text-center text-green-700">0</div>
        <div className="text-center mt-1">
          <a href="/admin/contacts" className="text-green-600 hover:underline text-sm font-oleo font-thin">
            View details...
          </a>
        </div>
      </div>
    </>
  )}
</div>

<Separator className="my-4" />

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <h2 className="text-base mb-2 ml-2 font-dmSans">Region Analysis</h2>
          <Barchart
            title="SFPS Acknowledgement Analysis By Region"
            subtitle="Source: P-COUNT"
          />
        </div>
        <div>
          <h2 className="text-base mb-2 ml-2 font-robotoFlex">SFP & Alert Analysis</h2>
          <Piechart
            title="Total SFPS"
            subtitle="Source: P-COUNT"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
