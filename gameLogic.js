// Decide whether to take the card or bet
function decideAction(gameState, botName) {
  const currentCard = gameState.card;
  const coinsOnTable = gameState.money;

  // Dynamically find the bot state
  const botState = gameState.players.find(player => player.name === botName);

  if (!botState) {
    console.error("Bot state not found! Check the bot name.");
    return false; // Safe fallback to avoid crashing
  }

  const botCoins = botState.money;
  const botCards = botState.cards;

  // Decision logic
  if (botCoins === 0) return true; // No coins, must take
  if (canExtendSet(botCards, currentCard)) return true; // Extend existing set
  if (currentCard <= 10 && coinsOnTable >= 2) return true; // Low card with good coins
  return false; // Default: bet
  }
  
  // Check if the card can extend a set
  function canExtendSet(sets, card) {
    return sets.some(set => set[set.length - 1] + 1 === card);
  }
  
  module.exports = { decideAction, canExtendSet };