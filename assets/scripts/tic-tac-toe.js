const tttStatusEl = document.querySelector("#ttt-status");
const tttCells = Array.from(document.querySelectorAll(".ttt-cell"));
const tttResetBtn = document.querySelector("#ttt-reset");

if (tttStatusEl && tttCells.length === 9 && tttResetBtn) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let board = Array(9).fill("");
  let currentPlayer = "X";
  let gameOver = false;
  let winnerFlashTimer;

  function setStatus(text) {
    tttStatusEl.textContent = text;
  }

  function flashWinnerNotice() {
    tttStatusEl.classList.add("ttt-status-win-flash");
    window.clearTimeout(winnerFlashTimer);
    winnerFlashTimer = window.setTimeout(() => {
      tttStatusEl.classList.remove("ttt-status-win-flash");
    }, 2200);
  }

  function checkWin(player) {
    return winningLines.some((line) => line.every((index) => board[index] === player));
  }

  function checkDraw() {
    return board.every((cell) => cell !== "");
  }

  function handleCellClick(event) {
    if (gameOver) {
      return;
    }

    const button = event.currentTarget;
    const index = Number(button.dataset.cellIndex);
    if (!Number.isInteger(index) || board[index] !== "") {
      return;
    }

    board[index] = currentPlayer;
    button.textContent = currentPlayer;
    button.disabled = true;

    if (checkWin(currentPlayer)) {
      gameOver = true;
      setStatus(`Winner: ${currentPlayer}`);
      flashWinnerNotice();
      return;
    }

    if (checkDraw()) {
      gameOver = true;
      setStatus("Draw game");
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    setStatus(`Turn: ${currentPlayer}`);
  }

  function resetGame() {
    board = Array(9).fill("");
    currentPlayer = "X";
    gameOver = false;
    setStatus("Turn: X");
    tttStatusEl.classList.remove("ttt-status-win-flash");
    window.clearTimeout(winnerFlashTimer);
    tttCells.forEach((button) => {
      button.textContent = "";
      button.disabled = false;
    });
  }

  tttCells.forEach((button) => {
    button.addEventListener("click", handleCellClick);
  });

  tttResetBtn.addEventListener("click", resetGame);
}
