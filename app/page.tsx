import { supabase } from "@/lib/supabase";
import EstadoChart from "@/components/EstadoChart";
import PagosTable from "@/components/PagosTable";
import KPIs from "@/components/KPIs";
import CursosChart from "@/components/CursosChart";

export default async function Home() {
  const { data: pagos, error } = await supabase
    .from("pagos")
    .select("*")
    .order("fecha", { ascending: false });

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  const pagosCompletados =
    pagos?.filter((p) => p.estado === "completed") || [];

  const pagosReembolsados =
    pagos?.filter((p) => p.estado === "refunded") || [];
  
  const tasasCambio = {
  COP: 1,
  USD: 4000,
  EUR: 4500,
};

  const ingresosTotales =
  pagosCompletados.reduce(
    (sum, pago) => {
      const tasa =
        tasasCambio[
          pago.moneda as keyof typeof tasasCambio
        ] || 1;

      return (
        sum +
        Number(pago.importe) * tasa
      );
    },
    0
  );

  const numeroPagos = pagosCompletados.length;

  const numeroReembolsos =
    pagosReembolsados.length;

  const ticketMedio =
    numeroPagos > 0
      ? ingresosTotales / numeroPagos
      : 0;

const ingresosPorCurso = Object.values(
  pagosCompletados.reduce(
    (acc, pago) => {
      const curso = pago.curso;

      if (!acc[curso]) {
        acc[curso] = {
          curso,
          ingresos: 0,
        };
      }

      const tasa =
        tasasCambio[
          pago.moneda as keyof typeof tasasCambio
        ] || 1;

      acc[curso].ingresos +=
        Number(pago.importe) * tasa;

      return acc;
    },
    {} as Record<
      string,
      {
        curso: string;
        ingresos: number;
      }
    >
  )
) as {
  curso: string;
  ingresos: number;
}[];

return (
    <main style={{ padding: "20px" }}>
      <h1>Dashboard FormaPro</h1>

      <KPIs
  ingresosTotalesCOP={ingresosTotales}
  ticketMedioCOP={ticketMedio}
  numeroPagos={numeroPagos}
  numeroReembolsos={numeroReembolsos}
/>
      <div
  style={{
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "30px",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
  }}
>
  <h2>Gráfico de Estados</h2>

  <EstadoChart
    completed={numeroPagos}
    refunded={numeroReembolsos}
  />
</div>

<div
  style={{
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "30px",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  }}
>
  <h2>Ingresos por Curso</h2>

  <CursosChart
    data={ingresosPorCurso}
  />
</div>

      <PagosTable pagos={pagos || []} />
    </main>
  );
}