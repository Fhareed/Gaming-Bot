const axios = require('axios');

const BASE_URL = "https://koodipahkina.monad.fi/api";
const API_TOKEN = "5ec6493d-7053-4d4f-9cd9-231e9087b3a3"; 
const HEADERS = {
  "Authorization": `Bearer ${API_TOKEN}`,
  "Content-Type": "application/json"
};

async function apiRequest(url, method = "GET", data = null) {
  try {
    const config = {
      method: method,
      url: `${BASE_URL}${url}`,
      headers: HEADERS,
      data: data,
    };
    console.log("Request Config:", config); // Log request for debugging
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`HTTP Error (${error.response.status}): ${error.response.data}`);
      if (error.response.status === 429) {
        console.log("Rate limit exceeded. Retrying after 5 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return apiRequest(url, method, data);
      } else if (error.response.status === 403) {
        console.error("Forbidden: Check your API token or endpoint permissions.");
      } else if (error.response.status === 401) {
        console.error("Unauthorized: Check your API token.");
      } else if (error.response.status === 404) {
        console.error("Not Found: Check your game ID or endpoint URL.");
      } else {
        console.error("Unhandled HTTP error.");
      }
    } else {
      console.error("Error:", error.message);
    }
    return null;
  }
}

async function createGameInstance() {
  const response = await apiRequest("/game", "POST");
  if (response) {
    console.log(`Game created! ID: ${response.gameId}`);
    return { gameId: response.gameId, status: response.status };
  } else {
    console.error("Failed to create a game.");
    return null;
  }
}

async function performAction(gameId, takeCard) {
  const payload = { takeCard: takeCard };
  const response = await apiRequest(`/game/${gameId}/action`, "POST", payload);
  if (response) {
    console.log(`Action performed. New game state:`, response.status);
    return response.status;
  } else {
    console.error(`Failed to perform action for game ID ${gameId}.`);
    return null;
  }
}

module.exports = { createGameInstance, performAction };