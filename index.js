const chessBoardDiv = document.querySelector(".board");
const chessBoard = new ChessBoard(chessBoardDiv);


// shows what spaces are available on visual board
function showAvailableSpaces(selected, boardArray){
    const availableSpaces = boardArray.selectedSpaces(selected.x, selected.y);
    

}

chessBoardDiv.addEventListener("click", (evt) => {
    // id is ordered with y and then x
    // Use the spaces id ex. "3-4" to get the location of the selected piece or space
    const coordinates = evt.target.id.split("-");

    let {selected, spaces} = chessBoard.select(coordinates[1], coordinates[0]);
    console.log(chessBoard);
    // Check to move pieces
    chessBoard.move();
    

    // if a piece was previously selected
    // if(selected == selectedPiece){

    // // Remove selected class on previous divs
    //     for(let div of selectedDivs){
    //         div.classList.remove("selected");
    //     }

    // // Remove all selected divs
    //     selectedDivs = []
    
    //     selectedPiece = undefined;
    // }else{
    //     selected = ChessBoard.select(coordinates[1], coordinates[0]);

    // // Remove selected class on previous divs
    //     for(let div of selectedDivs){
    //         div.classList.remove("selected");
    //     }

    // // Remove all selected divs
    //     selectedDivs = []

    // // Returns an array of possible places to put a piece
    //     const availableSpaces = ChessBoard.selectedSpaces(selected.x, selected.y);

    //     console.log(availableSpaces);
    //     console.log(coordinates)
    //     // if(selectedPiece){
    //     //     for(let space of availableSpaces){
    //     //         if()
    //     //     }
    //     // }
    // // Remember available spaces to move
    //     for(let space of availableSpaces){
    //         const div = document.getElementById(`${space[0]}-${space[1]}`);
    //         div.classList.add("selected");
    //         selectedDivs.push(div);
    //     }

    // // Remember last selected piece
    //     if(selected) selectedPiece = selected;
    // }
})