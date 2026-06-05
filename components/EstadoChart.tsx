"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface Props {
  completed: number;
  refunded: number;
}

export default function EstadoChart({
  completed,
  refunded,
}: Props) {
  const data = [
    {
      estado: "Completed",
      cantidad: completed,
    },
    {
      estado: "Refunded",
      cantidad: refunded,
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "220px",
      }}
    >
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="estado" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cantidad" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}