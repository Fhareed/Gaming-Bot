const { createGameInstance, performAction } = require('./api');
const { decideAction } = require('./gameLogic');

// Main game loop
async function playGame() {
  // Create a new game
  const game = await createGameInstance();
  if (!game) return; // Exit if game creation fails

  let gameId = game.gameId;
  let gameState = game.status;

  // Play until the game ends
  while (!gameState.finished) {
    // Decide action based on game state
    const botName = gameState.players[0].name; // Assuming your bot is the first player
    const takeCard = decideAction(gameState, botName);

    //Perform the action
    gameState = await performAction(gameId, takeCard);
    if (!gameState) break; // Exit if an action fails
  }
  console.log("Players List:", gameState.players);
  console.log("Game Over! Final State:", gameState);
}

// Run the bot
(async () => {
  await playGame();
})();