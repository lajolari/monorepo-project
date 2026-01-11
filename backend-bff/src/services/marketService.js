const axios = require('axios');

// "market-engine" es el nombre del servicio en Docker (DNS interno)
const MARKET_ENGINE_URL = process.env.MARKET_ENGINE_URL || 'http://market-engine:8000';

const getMarketData = async () => {
    try {
        console.log(`Connecting to Market Engine at: ${MARKET_ENGINE_URL}...`);
        const response = await axios.get(`${MARKET_ENGINE_URL}/api/market-data`);
        return response.data;
    } catch (error) {
        console.error("Error fetching from Market Engine:", error.message);
        // Retornamos array vacío para no romper el front
        return [];
    }
};

module.exports = { getMarketData };