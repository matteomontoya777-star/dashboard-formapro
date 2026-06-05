"use client";

import { useState } from "react";

interface Props {
  ingresosTotalesCOP: number;
  ticketMedioCOP: number;
  numeroPagos: number;
  numeroReembolsos: number;
}

export default function KPIs({
  ingresosTotalesCOP,
  ticketMedioCOP,
  numeroPagos,
  numeroReembolsos,
}: Props) {
  const [moneda, setMoneda] =
    useState("COP");

  const tasasCambio = {
    COP: 1,
    USD: 4000,
    EUR: 4500,
  };

  const ingresos =
    ingresosTotalesCOP /
    tasasCambio[
      moneda as keyof typeof tasasCambio
    ];

  const ticket =
    ticketMedioCOP /
    tasasCambio[
      moneda as keyof typeof tasasCambio
    ];

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

  return (
    <div>
      <h2>KPIs</h2>

      <select
        value={moneda}
        onChange={(e) =>
          setMoneda(e.target.value)
        }
        style={{
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        <option value="COP">
          COP
        </option>

        <option value="USD">
          USD
        </option>

        <option value="EUR">
          EUR
        </option>
      </select>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Ingresos Totales</h3>

          <p>
            {formatCurrency(
              ingresos,
              moneda
            )}
          </p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Nº Pagos</h3>
          <p>{numeroPagos}</p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Nº Reembolsos</h3>
          <p>{numeroReembolsos}</p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Ticket Medio</h3>

          <p>
            {formatCurrency(
              ticket,
              moneda
            )}
          </p>
        </div>
      </div>
    </div>
  );
}