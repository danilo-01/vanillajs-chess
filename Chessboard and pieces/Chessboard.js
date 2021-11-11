class ChessBoard {
    constructor(div){
        this.div = div;
        this.array = this.generateBoard();
        this.previousSelection = undefined;
        this.currentSelection = undefined;
        this.turn = "WHITE";

        this.renderBoard(this.div);
        // TODO add checkmate feature
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
                
                const img = document.createElement("img");
                if(this.array[i][j].type != "EMPTYSPACE"){
                    boardSpace.appendChild(this.array[i][j].img ? this.array[i][j].img : img);
                }

                boardRow.appendChild(boardSpace);
                
                this.array[i][j].div = boardSpace;
            }
            chessBoardDiv.appendChild(boardRow);
        }
    }

    // Select a piece and updat the previous selection and visual chessboard
    select(selectedX, selectedY){
        // Update previous selection
        this.previousSelection = this.currentSelection;

        // Remember current selection
        this.currentSelection = this.array[selectedY][selectedX];

        // Check if the previous selection is allowed to make a move
        if(this.previousSelection && this.previousSelection.color == this.turn){

            // Get available spaces for the previously selected spaces
            const availableSpaces =  this.previousSelection.availableSpaces(this.array);

            // Loops over the available spaces to check if there is a match with the current selected space
            for(let space of availableSpaces){

                // If the x and y coordinates of the previous selected space matches the current selected space
                if(space[0] == this.currentSelection.y && space[1] == this.currentSelection.x){

                    // If the previous pieces color is not this.turns color then dont do anything
                    if(this.previousSelection.color != this.turn) return;

                    // Update the turn to be the opposite of whatever it currently is
                    this.turn = this.turn == "WHITE" ? "BLACK" : "WHITE";

                    // Update visual boards turn
                    chessBoardTurn.textContent = `${this.turn}'s turn.`;

                    // Move piece
                    this.move();

                    return;
                }
            }
        }

        // If the current selected piece is not allowed to move 
        if(this.currentSelection.color != this.turn){

            // Clear all divs with a "selected" class
            this.updateVisualSpaces([]);

            return;
        }

        // Check if the current selection allowed to make a selection
        if(this.currentSelection.color == this.turn ) {

            // Possible spaces to move
            const availableSpaces = this.currentSelection.type != "EMPTYSPACE" ? this.currentSelection.availableSpaces(this.array) : [];

            // Update the visual chess board
            this.updateVisualSpaces(availableSpaces);
            return;
        }
    }

    // Updates the divs have/not have a "selected" class 
    updateVisualSpaces (currentChoices){
        // If there was a previously selected piece
        if(this.previousSelection && this.previousSelection.type != "EMPTYSPACE"){

            // Gets an array of all previous choices
            const previousChoices =  this.previousSelection.availableSpaces(this.array);
            
            for(let choice of previousChoices){
                // Get the div that has an id of the x y coordinates and remove the selected class
                const div = document.getElementById(`${choice[0]}-${choice[1]}`);
                div.classList.remove("selected");
            }
        }
        // Get the div associated with each current choice and add a "selected" class to it
        for(let choice of currentChoices){
            const div = document.getElementById(`${choice[0]}-${choice[1]}`);
            div.classList.add("selected");
        }
    }

    // Move piece if the current selected piece is in the previous selected pieces available spaces
    move(){
        // Clean up visual board choices
        // Previous spaces
        if(!this.previousSelection || this.previousSelection.type == "EMPTYSPACE") return;
        const previousChoices = this.previousSelection.type != "EMPTYSPACE" ? this.previousSelection.availableSpaces(this.array) : [];

        for(let choice of previousChoices){
            const div = document.getElementById(`${choice[0]}-${choice[1]}`);
            div.classList.remove("selected");
        }
        // Remember old x and y position
        const [oldX, oldY, oldDiv] = [this.previousSelection.x, this.previousSelection.y, this.previousSelection.div];


        const defeatedPieceImage = document.getElementById(`${this.currentSelection.y}-${this.currentSelection.x}`);
        if(defeatedPieceImage) {
            for(let child of defeatedPieceImage.children){
                child.remove();
            }
        }

        // Swap piece/space at current selected with piece/space of previously selected
        this.array[this.currentSelection.y][this.currentSelection.x] = this.previousSelection;
        this.previousSelection.x = this.currentSelection.x;
        this.previousSelection.y = this.currentSelection.y;
        const pieceImage = document.getElementById(`${oldY}-${oldX}`).children[0];
        
        
        this.previousSelection.div = this.currentSelection.div;
        this.previousSelection.div.appendChild(pieceImage);
        // Fill empty space with a new empty space class
        const replacementSpace = new EmptySpace(oldX, oldY)
        this.array[oldY][oldX] = replacementSpace;
        this.array[oldY][oldX].div = oldDiv;
        
        

        // Increment times moved and if its a pawn make sure to mark that its been moved
        this.previousSelection.type == "PAWN" && this.previousSelection.moved == 0 ? this.previousSelection.modifiers.pop() : undefined;
        this.previousSelection.moved++;
    }
}

class EmptySpace {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.type = "EMPTYSPACE"
        this.div = document.getElementById(`${this.y}-${this.x}`);
        this.src = "";
    }
}


