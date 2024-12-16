const { createGameInstance, performAction } = require('./api');
const { decideAction } = require('./gameLogic');

// Main game loop
async function playGame() {
  // Step 1: Create a new game
  const game = await createGameInstance();
  if (!game) return; // Exit if game creation fails

  let gameId = game.gameId;
  let gameState = game.status;

  // Step 2: Play until the game ends
  while (!gameState.finished) {
    // Step 3: Decide action based on game state
    const botName = gameState.players[0].name; // Assuming your bot is the first player
    const takeCard = decideAction(gameState, botName);

    // Step 4: Perform the action
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