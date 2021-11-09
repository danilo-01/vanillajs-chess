class ChessBoard {
    constructor(div){
        this.div = div;
        this.array = this.generateBoard();
        this.previousSelection = undefined;
        this.currentSelection = undefined;

        this.renderBoard(this.div);
        // TODO add point counter
    }

    // Generates chess board array
    generateBoard(){
        const chessArray = []
        
        // Create empty board
        for(let i = 0; i < 8; i++){
            const arrRow = [];
            for(let j = 0; j < 8; j++){
                arrRow.push(0);
            }
            chessArray.push(arrRow);
        }

        // Load piece ids
        for(let key of Object.keys(tableData)){
            chessArray[+key] = tableData[key];
        }

        // Change piece ids to piece class
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                if(idToClass[chessArray[i][j]]){
                    chessArray[i][j] = idToClass[chessArray[i][j]](j, i, i > 4 ? "WHITE" : "BLACK");
                }
            }
            
        }
    
        return chessArray;
    }

    // Generate visual chessboard based off of the chess board's array
    renderBoard(chessBoardDiv){
        for(let i = 0; i < this.array.length; i++){
            const boardRow = document.createElement("div");
            boardRow.classList.add("board-row")
        
            for(let j = 0; j < this.array[i].length; j++){
                // Create board space div
                const boardSpace = document.createElement("div");
                boardSpace.classList.add("board-space");
        
                // Determine wether the space is black or white
                i % 2 == 0 ?
                j % 2 == 0 ? boardSpace.classList.add("black") : boardSpace.classList.add("white") : 
                j % 2 == 0 ? boardSpace.classList.add("white") : boardSpace.classList.add("black")
        
                // Id the space
                boardSpace.id = `${i}-${j}`;
                boardSpace.innerText = `${this.array[i][j].type ? this.array[i][j].type : ""}`;
                boardRow.appendChild(boardSpace);
            }
            chessBoardDiv.appendChild(boardRow);
        }
    }

    // Move piece at x and y of array
    // move(){

    //     // Check if there was a selected piece
    //     if(this.currentSelection.type == "EMPTYSPACE") return;

    //     // If there was a piece check what spaces it can move to
    //     const availableSpaces = selectedPiece.availableSpaces(this.array);

    //     // Check if the target space matches any available spaces
    //     for(let space of availableSpaces){
    //         if(targetSpace.y == space[0] && targetSpace.x == space[1]){
    //             selectedPiece.move(this.array, targetSpace.x, targetSpace.y);
    //             return true;
    //         }
    //     }

    //     return false;
        
    // }

    // Select a piece and updated the previous selection adn visual chessboard
    select(selectedX, selectedY){
        const selected = this.array[selectedY][selectedX] != true ? this.array[selectedY][selectedX] : undefined;

        // Update previous selection
        this.previousSelection = this.currentSelection;

        // Remember current selection
        this.currentSelection = selected;

        // Possible spaces to move
        const spaces = selected.type != "EMPTYSPACE" ? selected.availableSpaces(this.array) : [];

        // Update the visual chess board
        this.updateDivChoices(spaces);

        return {selected, spaces,}
    }

    updateDivChoices(choices){
        if(this.previousSelection){
        // Previous spaces
            const previousChoices = this.previousSelection.type != "EMPTYSPACE" ? this.previousSelection.availableSpaces(this.array) : [];

            for(let choice of previousChoices){
                const div = document.getElementById(`${choice[0]}-${choice[1]}`);
                div.classList.remove("selected");
            }
        }
        for(let choice of choices){
            const div = document.getElementById(`${choice[0]}-${choice[1]}`);
            div.classList.add("selected");
        }
    }

    // Move piece if the current selected piece is in the previous selected pieces available spaces
    move(){
        // Possible spaces to move
        const choices = this.previousSelection && this.previousSelection.type != "EMPTYSPACE" ? this.previousSelection.availableSpaces(this.array) : [];

        for(let choice of choices){
            if(choice[0] == this.currentSelection.y && choice[1] == this.currentSelection.x){
                console.log("working");
            }
        }

        this.updatePiece();
    }

    updatePiece(){
        // Move previous selection to current selection on array and replace previous selection with and EmptySpace class
        const [oldX, oldY] = [this.previousSelection.x, this.previousSelection.y]

        console.log(oldX, oldY);

        // this.array[this.currentSelection.y][this.currentSelection.x] = this.previousSelection;
        // this.array[this.previousSelection.y][this.previousSelection.x] = new EmptySpace(this.previousSelection.y, this.previousSelection.x);


    }

}

class EmptySpace {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.type = "EMPTYSPACE"
    }
}


