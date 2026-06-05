"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    curso: string;
    ingresos: number;
  }[];
}

export default function CursosChart({
  data,
}: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "300px",
      }}
    >
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="curso" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="ingresos" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}