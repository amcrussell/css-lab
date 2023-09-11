

let cells = document.querySelectorAll('.row > div');

let turn = document.querySelector('#turn');

let cell;

let cellNum = 0;

let resetting = false;

let currentTurn = "Player 1's turn";

var board = [["top left", "unclamed"], ["top middle", "unclamed"], ["top right", "unclamed"],
["middle left", "unclamed"], ["middle center", "unclamed"], ["middle right", "unclamed"],
["bottom left", "unclamed"], ["bottom middle", "unclamed"], ["bottom right", "unclamed"]
]

for (let c = 0; c < cells.length; c++) 
    cells[c].addEventListener("click", cellClicked);

function cellClicked(ev) {

    cell = ev.target.className;

    if (isAvailable(cell)) {

        if (currentTurn == "Player 2's turn") {

            ev.target.textContent = "O";

            if (winCondition()) {

                win("Player 2");

                return;

            }

            turn.textContent = "Player 1's turn";

            blackCat();

        } else {

            ev.target.textContent = "X";

            if (winCondition()) {

                win("Player 1");

                return;

            }

            turn.textContent = "Player 2's turn";

            blackCat();
        }

        currentTurn = turn.textContent;

    } else 
        alert("That spot is taken!");

}

function isAvailable(tile) {

    for (let c = 0; c < board.length; c++) {

        if (board[c][0] == tile && board[c][1] == "unclamed") {

            if (currentTurn == "Player 1's turn") 
                board[c][1] = "player 1";

            else 
                board[c][1] = "player 2";

            return true;
        }

    }

    return false;

}

function winCondition() {

    if (board[0][1] == board[1][1] && board[1][1] == board[2][1] && board[1][1] != "unclamed")
        return true;
    else if (board[0][1] == board[3][1] && board[3][1] == board[6][1] && board[3][1] != "unclamed")
        return true;
    else if (board[0][1] == board[4][1] && board[4][1] == board[8][1] && board[4][1] != "unclamed")
        return true;
    else if (board[1][1] == board[4][1] && board[4][1] == board[7][1] && board[4][1] != "unclamed")
        return true;
    else if (board[2][1] == board[4][1] && board[4][1] == board[6][1] && board[4][1] != "unclamed")
        return true;
    else if (board[2][1] == board[5][1] && board[5][1] == board[8][1] && board[5][1] != "unclamed")
        return true;
    else if (board[3][1] == board[4][1] && board[4][1] == board[5][1] && board[4][1] != "unclamed")
        return true;
    else if (board[6][1] == board[7][1] && board[7][1] == board[8][1] && board[7][1] != "unclamed")
        return true;

    return false;

}

function win(player) {

    console.log(player + " is the winner");

    turn.textContent = "Click any tile to reset";

    for (let c = 0; c < cells.length; c++) {

        cells[c].addEventListener("click", reset);

        cells[c].removeEventListener("click", cellClicked);

    }

    setTimeout(function() { alert(player + " wins!"); }, 1);

    //found this online to fix the symbol showing up after the alert
}

function reset() {

    currentTurn = "Player 1's turn";

    turn.textContent = "Player 1's turn";

    for (let c = 0; c < cells.length; c++)
        cells[c].innerHTML = "";


    for (let c = 0; c < board.length; c++)
        board[c][1] = "unclamed";

    resetting = false;

    for (let c = 0; c < cells.length; c++) {

        cells[c].addEventListener("click", cellClicked);

        cells[c].removeEventListener("click", reset);

    }

}

function blackCat() {

    for (let c = 0; c < board.length; c++) {

        if (board[c][1] == "unclamed")
            return;

    }

    win(": (  no one");
}