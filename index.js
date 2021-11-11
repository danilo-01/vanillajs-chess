const chessBoardDiv = document.querySelector(".board");
const chessBoardTurn = document.querySelector(".board-info-turn");

// Initialize chessboard
const chessBoard = new ChessBoard(chessBoardDiv);

// Display starting turn
chessBoardTurn.textContent = `${chessBoard.turn}'s turn.`;

chessBoardDiv.addEventListener("click", (evt) => {
    // id is ordered with y and then x
    // Use the spaces id ex. "3-4" to get the location of the selected piece or space
    const coordinates = evt.target.id ? evt.target.id.split("-") : evt.target.parentNode.id.split("-");

    // Get selected piece on the array and its available spaces to move
    chessBoard.select(coordinates[1], coordinates[0]);

    // Check if the previous selection is allowed to make a move
    if(chessBoard.previousSelection && chessBoard.previousSelection.color == chessBoard.turn){

        // Get available spaces for the previously selected spaces
        const prevAvailableSpaces =  chessBoard.previousSelection.availableSpaces(chessBoard.array);

        // Loops over the available spaces to check if there is a match with the current selected space
        for(let space of prevAvailableSpaces){

            // If the x and y coordinates of the previous selected space matches the current selected space
            if(space[0] == chessBoard.currentSelection.y && space[1] == chessBoard.currentSelection.x){

                // If the previous pieces color is not this.turns color then dont do anything
                if(chessBoard.previousSelection.color != chessBoard.turn) return;

                // Update the turn to be the opposite of whatever it currently is
                chessBoard.turn = chessBoard.turn == "WHITE" ? "BLACK" : "WHITE";

                // Update visual boards turn
                chessBoardTurn.textContent = `${chessBoard.turn}'s turn.`;

                // Move piece
                chessBoard.move();

                return;
            }
        }
    }

    // If the current selected piece is not allowed to move 
    if(chessBoard.currentSelection.color != chessBoard.turn){

        // Clear all divs with a "selected" class
        chessBoard.updateVisualSpaces([]);

        return;
    }

    // Check if the current selection allowed to make a selection
    if(chessBoard.currentSelection.color == chessBoard.turn ) {

        // Possible spaces to move
        const availableSpaces = chessBoard.currentSelection.availableSpaces(chessBoard.array);

        // Update the visual chess board
        chessBoard.updateVisualSpaces(availableSpaces);
        return;
    }
    // TODO separate concerns

    

})