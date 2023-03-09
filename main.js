//------------------------------------------declaro variables--------------------
let playerRed = "R";
let playerYellow = "Y";
let currentPlayer = playerRed;
let gameOver = false;
let board;
let rows = 6;
let columns = 7;


window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
//--------------------------------------------------------------- JS
            row.push(' ');
//------------------------------------------------------------ HTML: <div id="9-9" class="ficha"></div>
            let ficha = document.createElement("div");
            ficha.id = r.toString() + "-" + c.toString();
            ficha.classList.add("ficha");
            ficha.addEventListener('click', setPiece);
            document.getElementById("board").append(ficha);
        }
//-----------------------------------------------------------se lo agrega al tablero
        board.push(row);
    }
}

//---------------------------------------------------------FUNCIONES----------------------------------

function setPiece(){
    if(gameOver){
        return;
    }

    let coords = this.id.split('-'); //'0-0' -> ['0','0']
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    board[r][c] = currentPlayer;
    let ficha = this;

    if(currentPlayer == playerRed){
        ficha.classList.add('ficha-roja');
        currentPlayer = playerYellow;
    }
    else{
        ficha.classList.add('ficha-amarilla');
        currentPlayer = playerRed;
       
    }

}