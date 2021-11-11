class Pawn {
    constructor(x, y, color, direction,) {
        this.color = color;
        this.type = "PAWN";
        this.moved = 0;
        this.x = x;
        this.y = y;
        this.div;
        this.direction = color == "BLACK" ? "DOWN" : "UP";
        this.modifiers = this.direction == "UP" ? [[-1, -1], [1, -1], [0, -1], [0, -2]] : [[-1, 1], [1, 1], [0, 1], [0, 2]]
        const img = document.createElement("img");
        img.src = color == "BLACK" ? "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png" : "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png";
        this.img = img;
    }

    // Returns an array of available spaces for this piece [[1,2], [2,3]]
    availableSpaces(boardArray) {

        // TODO Make this more dynamic
        const spaces = [];
        let newX;
        let newY;
        const oppositeColor = this.color == "BLACK" ? "WHITE" : "BLACK";

        const direction = this.direction == "UP" ? -1 : 1 ;

        // Check 1 up
        newY = this.y + direction

        if(boardArray[newY] && boardArray[newY][this.x].type == "EMPTYSPACE") spaces.push([newY, this.x]);

        // Check 2 up
        if(this.moved == 0 && spaces.length == 1){
            newY = this.y + direction + direction;

            if(boardArray[newY] && boardArray[newY][this.x].type == "EMPTYSPACE") spaces.push([newY, this.x]);
        }

        // Check 1 left 1 up
        newX = this.x -1;
        newY = this.y + direction;
        if(boardArray[newY] && boardArray[newY][newX] && boardArray[newY][newX].color == oppositeColor) spaces.push([newY, newX]);

        // Check 1 right 1 up
        newX = this.x + 1;
        newY = this.y + direction;
        if(boardArray[newY] && boardArray[newY][newX] && boardArray[newY][newX].color == oppositeColor) spaces.push([newY, newX]);


        return spaces;
    }

    movePiece(){
        if(this.moved == 0){
            this.modifiers.pop();
        }
        this.moved++;
        return true;
    }

}

class Rook {
    constructor(x, y, color) {
        this.color = color;
        this.type = "ROOK";
        this.moved = 0;
        this.x = x;
        this.y = y;
        this.modifiers = [[0,1], [-0,-1], [-1,0], [1,-0]];

        const img = document.createElement("img");
        img.src = color == "BLACK" ? "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png" : "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png";
        this.img = img;
    }

    // Returns an array of available spaces for this piece [[1,2], [2,3]]
    availableSpaces(boardArray) {
        return checkModifiers(this.x, this.y, this.color, boardArray, this.modifiers, true);
    }
}

class Knight {
    constructor(x, y, color) {
        this.color = color;
        this.type = "KNIGHT";
        this.moved = 0;
        this.x = x;
        this.y = y;
        this.modifiers = [[1, -2], [-1, -2], [1, 2], [-1, 2], [2, 1], [2, -1], [-2, -1], [-2, 1]]

        const img = document.createElement("img");
        img.src = color == "BLACK" ? "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png" : "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png";
        this.img = img;
    }

    // Returns an array of available spaces for this piece [[1,2], [2,3]]
    availableSpaces(boardArray) {
        return checkModifiers(this.x, this.y, this.color, boardArray, this.modifiers, false);
    }
}

class Bishop {
    constructor(x, y, color) {
        this.color = color;
        this.type = "BISHOP";
        this.moved = 0;
        this.x = x;
        this.y = y;
        this.modifiers = [[1,1], [-1,-1], [-1,1], [1,-1]];

        const img = document.createElement("img");
        img.src = color == "BLACK" ? "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png" : "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png";
        this.img = img;
    }

    // Returns an array of available spaces for this piece [[1,2], [2,3]]
    availableSpaces(boardArray) {
        return checkModifiers(this.x, this.y, this.color, boardArray, this.modifiers, true);
    }
}

class King {
    constructor(x, y, color) {
        this.color = color;
        this.type = "KING";
        this.moved = 0;
        this.x = x;
        this.y = y;
        this.modifiers = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

        const img = document.createElement("img");
        img.src = color == "BLACK" ? "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png" : "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png";
        this.img = img;
    }

    // Returns an array of available spaces for this piece [[1,2], [2,3]]
    availableSpaces(boardArray) {
        return checkModifiers(this.x, this.y, this.color, boardArray, this.modifiers, false);
    }
}

class Queen {
    constructor(x, y, color) {
        this.color = color;
        this.type = "QUEEN";
        this.moved = 0;
        this.x = x;
        this.y = y;
        this.modifiers = [[1,1], [-1,-1], [-1,1], [1,-1], [0,1], [-0,-1], [-1,0], [1,-0]]

        const img = document.createElement("img");
        img.src = color == "BLACK" ? "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png" : "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png";
        this.img = img;
    }

    // Returns an array of available spaces for this piece [[1,2], [2,3]]
    availableSpaces(boardArray) {
        return checkModifiers(this.x, this.y, this.color, boardArray, this.modifiers, true);
    }
}

// Modifiers is an object with "multiple" and "single" keys that wach have an array of arrays in x y order
function checkModifiers(x, y, color, boardArray, modifiers, looped=false, doBreak=false){
    // x and y are the position of the peice's space that were refering to 
    const spaces = [];
    // Check spaces up right

    //Loop for single iterations
    if(!looped){
        for(let modifier of modifiers){
        
            // target x and y to be checked
            let tarX = x + modifier[0];
            let tarY = y + modifier[1];
            
            
            if(!boardArray[tarY] || !boardArray[tarY][tarX]) continue;
            if(boardArray[tarY][tarX].type == "EMPTYSPACE" || boardArray[tarY][tarX].color != color){
                spaces.push([tarY, tarX]);
            }else{
                if(doBreak) break;
            }
    
        }
    }else if(looped){
        for(let modifier of modifiers){
        
            // target x and y to be checked
            let tarX = x + modifier[0];
            let tarY = y + modifier[1];
    
            // Loop until there isnt a valid space
            while(boardArray[tarY] && boardArray[tarY][tarX]){
    
                if(boardArray[tarY][tarX].type == "EMPTYSPACE"){
                    spaces.push([tarY, tarX]);
                }else if(boardArray[tarY][tarX].color != color){
                    spaces.push([tarY, tarX]);
                    break;
                }else{
                    break;
                }
    
                // Update target space using the modifiers
                tarX = tarX + modifier[0];
                tarY = tarY + modifier[1];
            }
        }
    }


    return spaces;
}