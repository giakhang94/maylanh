import { Loading } from "@/components";
import customAxios from "@/utils/authFecth";
import { useEffect, useState } from "react";
import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Label,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  LabelList,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  data,
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
interface Props {}
interface Stats {
  [key: string]: number;
}

const StatsPie = ({ data }: any) => {
  return (
    <div className="w-full">
      <div className="w-[350px] h-[350px] relative">
        {" "}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* legend này để hiện mô tả */}
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={renderCustomizedLabel}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              <LabelList dataKey="value" position="outside" id="labelList" />
              {data &&
                data.map((entry: any, index: any) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <p className="absolute top-8 left-2/4 -translate-x-[50%]">
          Tỷ lệ dịch vụ được book
        </p>
      </div>
    </div>
  );
};

export default StatsPie;
