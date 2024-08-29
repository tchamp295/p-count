"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, LabelList } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "Mombasa", desktop: 186, mobile: 80 },
  { month: "Western", desktop: 305, mobile: 200 },
  { month: "Eastern", desktop: 237, mobile: 120 },
  { month: "Nairobi", desktop: 73, mobile: 190 },
  { month: "Northern", desktop: 209, mobile: 130 },
  { month: "Central", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Pending",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Acknowledged",
    color: "hsl(var(--chart-2))",
  },
};

export function Barchart() {
  const [filter, setFilter] = useState("All");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    // In the future, you would implement actual filtering logic here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">
          SFPS Acknowledgement Analysis By Region
        </CardTitle>
        <div className="mt-4">
          <label htmlFor="filter" className="mr-2">
            Filter:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={handleFilterChange}
            className="border rounded p-1"
          >
            <option value="All">All</option>
            <option value="Desktop">Pending</option>
            <option value="Mobile">Acknowledged</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={600} height={300} data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis />
            <Tooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="desktop" fill="hsl(var(--chart-1))" radius={4}>
              <LabelList dataKey="desktop" position="top" />
            </Bar>
            <Bar dataKey="mobile" fill="hsl(var(--chart-2))" radius={4}>
              <LabelList dataKey="mobile" position="top" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* Key/Legend Section */}
      <div className="flex justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4" style={{ backgroundColor: chartConfig.desktop.color }}></span>
          <span className="text-sm font-medium">{chartConfig.desktop.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4" style={{ backgroundColor: chartConfig.mobile.color }}></span>
          <span className="text-sm font-medium">{chartConfig.mobile.label}</span>
        </div>
      </div>
    </Card>
  );
}
