class Pawn {
    constructor(x, y, color, direction,) {
        this.color = color;
        this.type = "PAWN";
        this.moved = 0;
        this.x = x;
        this.y = y;
        this.div;
        this.direction = color == "BLACK" ? "DOWN" : "UP";

        const img = document.createElement("img");
        img.src = color == "BLACK" ? "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png" : "https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png";
        this.img = img;
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
                if(this.direction == "UP"){
                    if(!boardArray[y - 1][this.x] || boardArray[y - 1][this.x].color != this.color){
                        spaces.push([y - 1, this.x]);
                    }
                }else{
                    if(!boardArray[y + 1][this.x] || boardArray[y + 1][this.x].color != this.color){
                        spaces.push([y + 1, this.x]);
                    }
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

}

class Rook {
    constructor(x, y, color) {
        this.color = color;
        this.type = "ROOK";
        this.moved = 0;
        this.x = x;
        this.y = y;

        const img = document.createElement("img");
        img.src = color == "BLACK" ? "https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png" : "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png";
        this.img = img;
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

        const img = document.createElement("img");
        img.src = color == "BLACK" ? "https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png" : "https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png";
        this.img = img;
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

        const img = document.createElement("img");
        img.src = color == "BLACK" ? "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png" : "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png";
        this.img = img;
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

        const img = document.createElement("img");
        img.src = color == "BLACK" ? "https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png" : "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png";
        this.img = img;
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

        const img = document.createElement("img");
        img.src = color == "BLACK" ? "https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png" : "https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png";
        this.img = img;
    }

    // Returns an array of available spaces for this piece [[1,2], [2,3]]
    availableSpaces(boardArray) {
        const spaces = [];

        return spaces;
    }
}