const chessBoard = document.querySelector(".board");
let selectedDivs = [];


const chessBoardArray = new ChessBoard();
console.log(chessBoardArray.array);


function renderBoard(chessBoard){
    for(let i = 0; i < chessBoardArray.array.length; i++){
        const boardRow = document.createElement("div");
        boardRow.classList.add("board-row")
    
        for(let j = 0; j < chessBoardArray.array[i].length; j++){
            // Create board space div
            const boardSpace = document.createElement("div");
            boardSpace.classList.add("board-space");
    
            // Determine wether the space is black or white
            i % 2 == 0 ?
            j % 2 == 0 ? boardSpace.classList.add("black") : boardSpace.classList.add("white") : 
            j % 2 == 0 ? boardSpace.classList.add("white") : boardSpace.classList.add("black")
    
            // Id the space
            boardSpace.id = `${i}-${j}`;
            boardSpace.innerText = `${chessBoardArray.array[i][j].type ? chessBoardArray.array[i][j].type : ""}`;
            boardRow.appendChild(boardSpace);
        }
        chessBoard.appendChild(boardRow);
    }
}

renderBoard(chessBoard);

chessBoard.addEventListener("click", (evt) => {
    
    console.log(evt.target);
    // id is ordered with y and then x
    // Use the spaces id ex. "3-4" to get the location of the selected piece or space
    const selected = evt.target.id.split("-");

    // Returns an array of possible places to put a piece
    const availableSpaces = chessBoardArray.select(selected[1], selected[0]);

    for(let div of selectedDivs){
        div.classList.remove("selected");
    }

    selectedDivs = []

    for(let space of availableSpaces){
        const div = document.getElementById(`${space[0]}-${space[1]}`);
        div.classList.add("selected");
        selectedDivs.push(div);
    }

    console.log(selectedDivs);
})