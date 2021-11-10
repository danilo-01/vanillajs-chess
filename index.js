const chessBoardDiv = document.querySelector(".board");
const chessBoard = new ChessBoard(chessBoardDiv);


chessBoardDiv.addEventListener("click", (evt) => {
    // id is ordered with y and then x
    // Use the spaces id ex. "3-4" to get the location of the selected piece or space
    const coordinates = evt.target.id ? evt.target.id.split("-") : evt.target.parentNode.id.split("-");

    chessBoard.select(coordinates[1], coordinates[0]);

    // TODO separate concerns

    

})