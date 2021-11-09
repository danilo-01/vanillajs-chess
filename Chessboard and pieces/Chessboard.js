class ChessBoard {
    constructor(){
        this.array = this.generateBoard();
        // TODO add point counter
    }
    generateBoard(){
        const chessArray = []
        
        // Create empty board
        for(let i = 0; i < 8; i++){
            const arrRow = [];
            for(let j = 0; j < 8; j++){
                arrRow.push(true);
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

    // Move piece at x and y of array
    mvoe(selectedX, selectedY, targetX, targetY){
        const selectedPiece = this.array[selectedY][selectedX];

        // Check if there was a selected piece
        if(selectedPiece === true) return;

        // If there was a piece check what spaces it can move to
        const availableSpaces = selectedPiece.availableSpaces(this.array);

        // Check if the target space matches any available spaces
        for(let space of availableSpaces){
            console.log(space[0]);
            if(targetY == space[0] && targetX == space[1]){
                selectedPiece.move(this.array, targetX, targetY);
                break;
            }
        }

        return;
        
    }
}

const x = new ChessBoard();
console.log(x.array);
x.mvoe(0,1,0,2)
x.mvoe(1,1,1,3)
