import React, { useEffect, useState } from 'react';
// Si no tienes lucide-react, usa texto simple o instálalo: npm i lucide-react
import { RefreshCw, ArrowUpRight, ArrowDownRight, Globe, Coins } from 'lucide-react';

interface MarketItem {
  symbol: string;
  price: number;
  currency: string;
  type: string;
  source_adapter: string;
  updated_at: string;
  is_stale: boolean;
}

const MarketData: React.FC = () => {
  const [data, setData] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Llamamos a NUESTRO Node.js (BFF), no directo a Laravel
      const response = await fetch('http://localhost:3000/api/market');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error loading market data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      {/* Título de la Sección */}
      <h2 className="text-3xl font-bold text-center text-zinc-100 mb-12">
        Integración de Sistemas en Tiempo Real
      </h2>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Encabezado del Panel */}
        <div className="p-6 border-b border-zinc-800 bg-zinc-900/80 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Motor de Monitoreo de Mercado
              {/* Indicador de estado opcional */}
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </h3>
            <p className="text-zinc-400 text-sm mt-1">
              Agregación en tiempo real vía Microservicios
            </p>
          </div>
          
          {/* Botón de recarga (opcional si lo tenías) */}
          <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Tabla de Datos */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-zinc-950/50 text-xs uppercase font-medium text-zinc-500">
              <tr>
                <th className="px-6 py-4">Activo</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4">Estrategia</th>
                <th className="px-6 py-4 text-right">Última Sinc.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {/* Estado de Carga / Sin Datos */}
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center">
                  <p className="text-zinc-500 mb-4">
                    Sin datos disponibles.
                  </p>
                  <button 
                    // onClick={handleSync} -> Aquí conectaremos tu función
                    className="text-emerald-400 hover:text-emerald-300 text-sm font-medium hover:underline transition-all"
                  >
                    Ejecutar Sincronización
                  </button>
                </td>
              </tr>
              
              {/* Aquí irían las filas (rows) cuando tengamos datos */}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MarketData;