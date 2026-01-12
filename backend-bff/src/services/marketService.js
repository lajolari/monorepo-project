const axios = require('axios');

// Url base
const MARKET_ENGINE_URL = process.env.MARKET_ENGINE_URL || 'http://market-engine:8000';

async function getMarketData() {
  try {
    const response = await axios.get(`${MARKET_ENGINE_URL}/api/market-data`);
    return response.data;
  } catch (error) {
    // MEJORA AQUÍ: Logueamos el detalle real del error
    if (error.response) {
      console.error("🔥 Error desde Laravel (Status):", error.response.status);
      console.error("🔥 Error desde Laravel (Body):", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Error de conexión:", error.message);
    }
    return []; 
  }
}

module.exports = { getMarketData };