"use client";

import { useState } from "react";

interface Pago {
  id: number;
  id_pago: string;
  nombre: string;
  curso: string;
  importe: number;
  moneda: string;
  estado: string;
  fecha: string;
}
function formatCurrency(
  value: number,
  currency: string
) {
  return new Intl.NumberFormat(
    "es-CO",
    {
      style: "currency",
      currency,
    }
  ).format(value);
}
export default function PagosTable({
  pagos,
}: {
  pagos: Pago[];
}) {
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("todos");

  const pagosFiltrados = pagos.filter((pago) => {
  const coincideBusqueda =
    pago.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase()) ||
    pago.curso
      .toLowerCase()
      .includes(busqueda.toLowerCase()) ||
    pago.id_pago
      .toLowerCase()
      .includes(busqueda.toLowerCase());

  const coincideEstado =
    estado === "todos"
      ? true
      : pago.estado === estado;

  return coincideBusqueda && coincideEstado;
});

const totalCompleted = pagosFiltrados.filter(
  (pago) => pago.estado === "completed"
).length;

const totalRefunded = pagosFiltrados.filter(
  (pago) => pago.estado === "refunded"
).length;

  return (
    <div>
      <h2>Pagos</h2>

      <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "20px",
  }}
>
  <input
    type="text"
    placeholder="Buscar por cliente, curso o ID..."
    value={busqueda}
    onChange={(e) =>
      setBusqueda(e.target.value)
    }
    style={{
      padding: "10px",
      width: "300px",
      border: "1px solid #ccc",
      borderRadius: "8px",
    }}
  />

  {busqueda && (
    <button
      onClick={() => setBusqueda("")}
      style={{
        padding: "10px 14px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      ✖
    </button>
  )}
</div>

      <select
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <option value="todos">Todos los estados</option>
        <option value="completed">Completados</option>
        <option value="refunded">Reembolsados</option>
      </select>

      <div
  style={{
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    fontWeight: "bold",
  }}
>
  <span>
    🟢 Completed: {totalCompleted}
  </span>

  <span>
    🔴 Refunded: {totalRefunded}
  </span>

  <span>
    📋 Mostrando: {pagosFiltrados.length}
  </span>
</div>
      <h2>Pagos</h2>

<table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  }}
>
  <thead
  style={{
    backgroundColor: "#1f2937",
    color: "white",
  }}
>
    <tr>
      <th style={{ padding: "12px" }}>
  ID Pago
</th>
      <th style={{ padding: "12px" }}>
  Cliente
</th>
      <th style={{ padding: "12px" }}>
  Curso
</th>
      <th style={{ padding: "12px" }}>
  Importe
</th>
      <th style={{ padding: "12px" }}>
  Moneda
</th>
      <th style={{ padding: "12px" }}>
  Estado
</th>
      <th style={{ padding: "12px" }}>
  Fecha
</th>
    </tr>
  </thead>

  <tbody>
    {pagosFiltrados.map((pago) => (
      <tr
  key={pago.id}
  style={{
    borderBottom: "1px solid #ddd",
  }}
>
        <td style={{ padding: "12px" }}>{pago.id_pago}</td>
        <td style={{ padding: "12px" }}>{pago.nombre}</td>
        <td style={{ padding: "12px" }}>{pago.curso}</td>
        <td style={{ padding: "12px" }}>
          {formatCurrency(
            Number(pago.importe),
            pago.moneda
          )}
        </td>
        <td style={{ padding: "12px" }}>{pago.moneda}</td>
        <td style={{ padding: "12px" }}>
  <span
    style={{
      padding: "6px 10px",
      borderRadius: "20px",
      backgroundColor:
        pago.estado === "completed"
          ? "#16a34a"
          : "#dc2626",
      color: "white",
      fontSize: "14px",
      fontWeight: "bold",
    }}
  >
    {pago.estado}
  </span>
</td>
        <td style={{ padding: "12px" }}>
          {new Date(
            pago.fecha
          ).toLocaleDateString()}
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}