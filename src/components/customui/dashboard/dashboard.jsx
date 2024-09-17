"use client";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Bell,
  CheckCircle,
  Contact,
  Globe,
  Loader,
  Shield,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Barchart } from "./charts/Barchart";
import { Piechart } from "./charts/Piechart";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
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

  const [totalIps, setTotalIps] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalRegions, setTotalRegions] = useState(0);
  const [totalSfps, setTotalSfps] = useState(0); // State for total SFPs
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

        if (!ipsResponse.ok) {
          throw new Error(`Error fetching IPs: ${await ipsResponse.text()}`);
        }
        if (!regionsResponse.ok) {
          throw new Error(`Error fetching Regions: ${await regionsResponse.text()}`);
        }
        if (!sfpsResponse.ok) {
          throw new Error(`Error fetching SFPs: ${await sfpsResponse.text()}`);
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
        console.error("Error fetching data:", error.message);
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

  return (
    <div className="  w-full">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total IPs</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-center font-bold ${
                loading ? "text-lg text-gray-500" : "text-3xl text-gray-900"
              }`}
            >
              {loading ? (
                <Loader className="animate-spin h-6 w-6 text-gray-500" />
              ) : (
                totalIps
              )}
            </div>
          </CardContent>
        </Card>
        {/* Region Count Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Regions</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-center font-bold ${
                loading ? "text-lg text-gray-500" : "text-3xl text-gray-900"
              }`}
            >
              {loading ? (
                <Loader className="animate-spin h-6 w-6 text-gray-500" />
              ) : (
                totalRegions
              )}
            </div>{" "}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total SFPS</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-center font-bold ${
                loading ? "text-lg text-gray-500" : "text-3xl text-gray-900"
              }`}
            >
              {loading ? (
                <Loader className="animate-spin h-6 w-6 text-gray-500" />
              ) : (
                totalSfps
              )}
            </div>{" "}
          </CardContent>
        </Card>
        {/* Other Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Contacts
            </CardTitle>
            <Contact className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      {/* <div className="mt-8">
        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Notifications</CardTitle>
            <Bell className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ul>
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`p-2 border-b ${
                    notification.isRead ? "bg-gray-100" : "bg-red-100"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{notification.message}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </span>
                      {!notification.isRead && (
                        <button
                          className="text-green-600 hover:text-green-800"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div> */}

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <h2 className="text-base font-medium mb-2">Region Analysis</h2>
          <Barchart
            title="SFPS Acknowledgement Analysis By Region"
            subtitle="Source: P-COUNT"
          />
        </div>
        <div>
          <h2 className="text-base font-medium mb-2">SFP & Alert Analysis</h2>
          <Piechart
            title="Alert Analysis & Stats"
            subtitle="Source: All Departments"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
