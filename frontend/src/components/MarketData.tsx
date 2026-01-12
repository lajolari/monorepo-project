import React, { useEffect, useState } from 'react';
import { RefreshCw, TrendingUp, DollarSign, Activity } from 'lucide-react';

// 1. Ajustamos la interface para que coincida con tu API real de Laravel
interface MarketItem {
  id: number;
  symbol: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  last_updated: string | null;
}

const MarketData: React.FC = () => {
  const [data, setData] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Recuerda: El BFF (Node) redirige esto al Laravel
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

  // Función auxiliar para formatear dinero
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-zinc-100 mb-12">
        Integración de Sistemas en Tiempo Real
      </h2>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Encabezado */}
        <div className="p-6 border-b border-zinc-800 bg-zinc-900/80 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-500" />
              Motor de Monitoreo de Mercado
            </h3>
            <p className="text-zinc-400 text-sm mt-1">
              Live Data vía Laravel Engine & Node BFF
            </p>
          </div>
          
          <button 
            onClick={fetchData}
            disabled={loading}
            className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-zinc-950/50 text-xs uppercase font-medium text-zinc-500">
              <tr>
                <th className="px-6 py-4">Activo</th>
                <th className="px-6 py-4">Precio Actual</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4 text-right">Última Actualización</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              
              {/* CASO 1: CARGANDO */}
              {loading && data.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-zinc-500 animate-pulse">
                    Conectando con microservicios...
                  </td>
                </tr>
              )}

              {/* CASO 2: SIN DATOS (Y no está cargando) */}
              {!loading && data.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <p className="text-zinc-500 mb-4">No se encontraron datos de mercado.</p>
                    <button onClick={fetchData} className="text-emerald-400 hover:underline">
                      Reintentar conexión
                    </button>
                  </td>
                </tr>
              )}

              {/* CASO 3: ¡DATOS REALES! 🎉 */}
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        item.category === 'crypto' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-blue-500/10 text-blue-400'
                      }`}>
                        {item.category === 'crypto' ? <DollarSign className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="font-medium text-zinc-200">{item.symbol}</div>
                        <div className="text-xs text-zinc-500">{item.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-zinc-200">
                    {formatMoney(item.price)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.category === 'crypto' 
                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {item.category.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-xs text-zinc-500">
                    {item.last_updated ? new Date(item.last_updated).toLocaleTimeString() : 'N/A'}
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MarketData;