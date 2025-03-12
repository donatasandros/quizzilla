"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const chartData = [
  {
    date: "2025-01-01",
    accuracy: 0.9,
    averageScore: 0.85,
  },
  {
    date: "2025-01-03",
    accuracy: 0.91,
    averageScore: 0.86,
  },
  {
    date: "2025-01-06",
    accuracy: 0.89,
    averageScore: 0.84,
  },
  {
    date: "2025-01-09",
    accuracy: 0.86,
    averageScore: 0.81,
  },
  {
    date: "2025-01-12",
    accuracy: 0.87,
    averageScore: 0.82,
  },
  {
    date: "2025-01-15",
    accuracy: 0.92,
    averageScore: 0.88,
  },
  {
    date: "2025-01-17",
    accuracy: 0.91,
    averageScore: 0.86,
  },
  {
    date: "2025-01-20",
    accuracy: 0.88,
    averageScore: 0.83,
  },
  {
    date: "2025-01-23",
    accuracy: 0.89,
    averageScore: 0.84,
  },
  {
    date: "2025-01-26",
    accuracy: 0.9,
    averageScore: 0.86,
  },

  {
    date: "2025-02-02",
    accuracy: 0.85,
    averageScore: 0.8,
  },
  {
    date: "2025-02-05",
    accuracy: 0.87,
    averageScore: 0.82,
  },
  {
    date: "2025-02-08",
    accuracy: 0.9,
    averageScore: 0.85,
  },
  {
    date: "2025-02-11",
    accuracy: 0.83,
    averageScore: 0.78,
  },
  {
    date: "2025-02-14",
    accuracy: 0.88,
    averageScore: 0.83,
  },
  {
    date: "2025-02-18",
    accuracy: 0.86,
    averageScore: 0.81,
  },
  {
    date: "2025-02-21",
    accuracy: 0.9,
    averageScore: 0.86,
  },
  {
    date: "2025-02-25",
    accuracy: 0.89,
    averageScore: 0.84,
  },

  {
    date: "2025-03-02",
    accuracy: 0.87,
    averageScore: 0.83,
  },
  {
    date: "2025-03-05",
    accuracy: 0.91,
    averageScore: 0.87,
  },
  {
    date: "2025-03-09",
    accuracy: 0.85,
    averageScore: 0.8,
  },
  {
    date: "2025-03-12",
    accuracy: 0.88,
    averageScore: 0.83,
  },
  {
    date: "2025-03-15",
    accuracy: 0.92,
    averageScore: 0.89,
  },
  {
    date: "2025-03-18",
    accuracy: 0.9,
    averageScore: 0.85,
  },
  {
    date: "2025-03-22",
    accuracy: 0.87,
    averageScore: 0.81,
  },
  {
    date: "2025-03-26",
    accuracy: 0.9,
    averageScore: 0.86,
  },
  {
    date: "2025-03-30",
    accuracy: 0.89,
    averageScore: 0.84,
  },
];

const chartConfig = {
  accuracy: {
    label: "Accuracy",
    color: "var(--chart-2)",
  },
  averageScore: {
    label: "Average score",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function PerformanceChart() {
  const [timeRange, setTimeRange] = React.useState("30d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date(chartData[chartData.length - 1].date);
    let daysToSubtract = 30;
    if (timeRange === "7d") {
      daysToSubtract = 7;
    } else if (timeRange === "90d") {
      daysToSubtract = 90;
    }

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return date >= startDate;
  });

  return (
    <div>
      <div className="mb-5 flex items-center gap-x-1">
        <Tabs defaultValue="30d" value={timeRange} onValueChange={setTimeRange}>
          <TabsList>
            <TabsTrigger value="90d">3 months</TabsTrigger>
            <TabsTrigger value="30d">30 days</TabsTrigger>
            <TabsTrigger value="7d">7 days</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <ChartContainer config={chartConfig} className="max-h-[240px] w-full">
        <AreaChart accessibilityLayer data={filteredData}>
          <defs>
            <linearGradient id="fillAccuracy" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-accuracy)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-accuracy)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillAverageScore" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-averageScore)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-averageScore)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  });
                }}
                formatter={(value, name, item, index) => (
                  <>
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                      style={
                        {
                          backgroundColor: item.color,
                        } as React.CSSProperties
                      }
                    />
                    {chartConfig[name as keyof typeof chartConfig]?.label ||
                      name}
                    <div className="ml-auto flex items-baseline gap-2 font-mono font-semibold text-white tabular-nums">
                      {index !== 2 && `${Number(value) * 100}%`}
                    </div>
                  </>
                )}
                indicator="dot"
              />
            }
            cursor={false}
          />
          <Area
            dataKey="accuracy"
            type="natural"
            fill="url(#fillAccuracy)"
            stroke="var(--color-accuracy)"
            stackId="a"
          />
          <Area
            dataKey="averageScore"
            type="natural"
            fill="url(#fillAverageScore)"
            stroke="var(--color-averageScore)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
