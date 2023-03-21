//------------------------------------------declaro variables--------------------
let playerRed = "R";
let playerYellow = "Y";
let currentPlayer = playerRed;
let gameOver = false;
let board;
let rows = 6;
let columns = 7;
let columnaActual;


window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    columnaActual = [5, 5, 5, 5, 5, 5, 5];  //p/hacer el efecto que las fichas caen y no quedan flotando.
    

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

    r = columnaActual[c];
    if (r < 0){
        return;
    }

    board[r][c] = currentPlayer;
    let ficha = document.getElementById(r.toString() + '-' + c.toString());

    if(currentPlayer == playerRed){
        ficha.classList.add('ficha-roja');
        currentPlayer = playerYellow;
    }
    else{
        ficha.classList.add('ficha-amarilla');
        currentPlayer = playerRed;
       
    }

    //para actualizar la altura de la ficha en la columna
    r -= 1;
    columnaActual[c] = r; //para actualizar el array

    //ver si hay ganador: 4 en línea
    checkWinner();

}

//--------------------------------------función para ver si hay un ganador----------------------------------------
function checkWinner() {
    //---------------------------------- horizontal:
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++){
           if (board[r][c] != ' ') {
               if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                   setWinner(r, c);
                   return;
               }
           }
        }
   }
    //----------------------------------- vertical:
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    //--------------------------------- anti diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    //------------------------------------ diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
}

//-----------------------
function setWinner(r, c) {
    let winner = document.getElementById('winner');
    if (board[r][c] == playerRed) {
        winner.innerText = '¡El rojo es el ganador!';             
    } else {
        winner.innerText = '¡El amarillo gana!';
    }
    gameOver = true;
 }
}