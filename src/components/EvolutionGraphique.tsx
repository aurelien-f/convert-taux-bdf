"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DataPoint {
  date: string;
  value: number;
}

interface EvolutionGraphiqueProps {
  data: DataPoint[];
}

export default function EvolutionGraphique({ data }: EvolutionGraphiqueProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#06b6d4" />
        <XAxis dataKey="date" fontSize={12} stroke="#000000" tickLine={false} axisLine={false} tickFormatter={(value) => {
          const [year, month, day] = value.split("-");
          return `${day}-${month}-${year}`;
        }} />
        <YAxis fontSize={12} stroke="#000000" tickLine={false} axisLine={false} tickFormatter={(value) => value.toString()} />
        <Tooltip cursor={{ fill: "#06b6d4", radius: 4, stroke: "#06b6d4" }} content={({ active, payload }) => {
          if (active && payload && payload.length) {
            return (
              <div className="bg-white p-2 rounded-md border border-gray-300 shadow-md">
                <p className="font-bold">{`${payload[0].value}`}</p>
              </div>
            );
          }
          return null;
        }} />
        <Area type="monotone" dataKey="value" stroke="#06b6d4" fill="url(#colorUv)" />
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#8b5cf6" stopOpacity={0.05} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  );
}