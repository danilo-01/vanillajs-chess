const tableData = {
    "0" : [
        2,3,4,5,6,4,3,2,
    ],
    "1" : [
        1,1,1,1,1,1,1,1,
    ],
    "7" : [
        2,3,4,6,5,4,3,2,
    ],
    "6" : [
        1,1,1,1,1,1,1,1,
    ],
}

// Returns a new piece class relating to the its id
const idToClass = {
    "1" :   (x, y, color, direction) => new Pawn(x, y, color, direction),
    "2" :   (x, y, color) => new Rook(x, y, color),
    "3" :   (x, y, color) => new Knight(x, y, color),
    "4" :   (x, y, color) => new Bishop(x, y, color),
    "5" :   (x, y, color) => new King(x, y, color),
    "6" :   (x, y, color) => new Queen(x, y, color),
}

// Pawn 1
// Rook 2
// Knight 3
// Bishop 4
// King 5
// Queen 6