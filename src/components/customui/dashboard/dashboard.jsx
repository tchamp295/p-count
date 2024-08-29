"use client"
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Bell,
  CheckCircle,
  Contact,
  Globe,
  Shield,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Barchart } from "./charts/Barchart";
import { Piechart } from "./charts/Piechart";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New IP added.", isRead: false, timestamp: "2024-08-25 10:00 AM" },
    { id: 2, message: "System maintenance scheduled.", isRead: true, timestamp: "2024-08-24 9:00 PM" },
    { id: 3, message: "New alert from Nairobi region.", isRead: false, timestamp: "2024-08-25 09:45 AM" },
  ]);
  const [ipCount, setIpCount] = useState(null);
  const [sfpsCount, setSfpsCount] = useState(null);
  const [regionCount, setRegionCount] = useState(null); // Add state for region count

  useEffect(() => {
    const fetchIpCount = async () => {
      try {
        const response = await fetch("/api/ips/ip-count");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setIpCount(parseInt(data.count, 10));
      } catch (error) {
        console.error("Error fetching IP count:", error);
      }
    };

    const fetchSfpsCount = async () => {
      try {
        const response = await fetch("/api/sfps/sfp-count");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSfpsCount(parseInt(data.count, 10));
      } catch (error) {
        console.error("Error fetching SFPS count:", error);
      }
    };

    const fetchRegionCount = async () => {
      // Function to fetch the region count
      try {
        const response = await fetch("/api/regions/region-count");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRegionCount(parseInt(data.count, 10));
      } catch (error) {
        console.error("Error fetching Region count:", error);
      }
    };

    fetchIpCount();
    fetchSfpsCount();
    fetchRegionCount(); // Call the fetch function
  }, []);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total IPs</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ipCount !== null ? ipCount : <span className="text-sm">Loading...</span>}</div>
          </CardContent>
        </Card>
 {/* Region Count Card */}
 <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Regions</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{regionCount !== null ? regionCount : <span className="text-sm">Loading...</span>}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total SFPS</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sfpsCount !== null ? sfpsCount : <span className="text-sm">Loading...</span>}</div>
          </CardContent>
        </Card>
        {/* Other Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+45</div>
            <p className="text-xs text-muted-foreground">+10 since last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+120</div>
            <p className="text-xs text-muted-foreground">+20 since last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Contact className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+1,234</div>
          </CardContent>
        </Card>

       
      </div>

      {/* Alerts Section */}
      <div className="mt-8">
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
                  className={`p-2 border-b ${notification.isRead ? "bg-gray-100" : "bg-red-100"}`}
                >
                  <div className="flex justify-between items-center">
                    <span>{notification.message}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
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
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <h2 className="text-lg font-medium mb-2">Region Analysis</h2>
          <Barchart title="SFPS Acknowledgement Analysis By Region" subtitle="Source: P-COUNT" />
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2">SFP & Alert Analysis</h2>
          <Piechart title="Alert Analysis & Stats" subtitle="Source: All Departments" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
