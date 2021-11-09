class Pawn {
    constructor(x, y, color, direction) {
        this.color = color;
        this.type = "PAWN";
        this.moved = 0;
        this.x = x;
        this.y = y;
        this.direction = color == "BLACK" ? "DOWN" : "UP";
    }

    // Returns an array of available spaces for this piece [[1,2], [2,3]]
    availableSpaces(boardArray) {
        const spaces = [];

        // y value for one space up
        const y = this.direction == "UP" ? this.y - 1 : this.y + 1;

        // check 2 spaces up
        if(!boardArray[y][this.x] || boardArray[y][this.x].color != this.color){
            if(boardArray[y][this.x]) spaces.push([y, this.x]);
            if(this.moved == 0){
                if(!boardArray[y + 1][this.x] || boardArray[y + 1][this.x].color != this.color){
                    spaces.push([y + 1, this.x]);
                }
            }
        }

        // Check diagonals
        let x = this.x + 1;
        if(!boardArray[y][x] || boardArray[y][x].color != this.color){
            if(boardArray[y][x]) spaces.push([y, x]);
        }

        x = this.x - 1;
        if(!boardArray[y][x] || boardArray[y][x].color != this.color){
            if(boardArray[y][x]) spaces.push([y, x]);
        }


        

        return spaces;
    }

    // Moves piece to a new arrea on array
    move(boardArray, newX, newY){
        const targetSpace = boardArray[newY][newX];

        // If there is a piece occupying that space remove it
        if(targetSpace !== true){
            targetSpace.remove();
        }

        boardArray[this.y][this.x] = true;
        boardArray[newY][newX] = this;
        this.x = newX;
        this.y = newY;
    }
}

class Rook {
    constructor(x, y, color) {
        this.color = color;
        this.type = "ROOK";
        this.moved = 0;
        this.x = x;
        this.y = y;
    }

    // Returns an array of available spaces for this piece [[1,2], [2,3]]
    availableSpaces(boardArray) {
        const spaces = [];

        return spaces;
    }
}

class Knight {
    constructor(x, y, color) {
        this.color = color;
        this.type = "KNIGHT";
        this.moved = 0;
        this.x = x;
        this.y = y;
    }

    // Returns an array of available spaces for this piece [[1,2], [2,3]]
    availableSpaces(boardArray) {
        const spaces = [];

        return spaces;
    }
}

class Bishop {
    constructor(x, y, color) {
        this.color = color;
        this.type = "BISHOP";
        this.moved = 0;
        this.x = x;
        this.y = y;
    }

    // Returns an array of available spaces for this piece [[1,2], [2,3]]
    availableSpaces(boardArray) {
        const spaces = [];

        return spaces;
    }
}

class King {
    constructor(x, y, color) {
        this.color = color;
        this.type = "KING";
        this.moved = 0;
        this.x = x;
        this.y = y;
    }

    // Returns an array of available spaces for this piece [[1,2], [2,3]]
    availableSpaces(boardArray) {
        const spaces = [];

        return spaces;
    }
}

class Queen {
    constructor(x, y, color) {
        this.color = color;
        this.type = "QUEEN";
        this.moved = 0;
        this.x = x;
        this.y = y;
    }

    // Returns an array of available spaces for this piece [[1,2], [2,3]]
    availableSpaces(boardArray) {
        const spaces = [];

        return spaces;
    }
}