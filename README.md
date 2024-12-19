# Gaming-Bot
Gaming bot using Monad API
	Game Initialization: Creates a new game instance using the API.
	Game Logic: Implements decision-making to either take the card or bet based on game state.
	Scoring: Calculates the bot’s final score at the end of the game.
	Error Handling: Handles API calls and retries effectively.
 For each turn, decide between placing a coin or picking up the card using the logic detailed in the strategy section.
	Decision-Making Logic:
	•	When to Bet:
	•	If you have coins and the card on the table has a high point value.
	•	If betting increases the coin pool on a card that is undesirable to opponents.
	•	When to Take the Card:
	•	If you are out of coins (mandatory).
	•	If the card matches your hand and its point balance won’t increase your score.
	•	If the coin pool outweighs the card’s penalty points.
