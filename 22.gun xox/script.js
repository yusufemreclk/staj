// Oyun tahtasındaki tüm hücreleri seçer.
const cells = document.querySelectorAll(".cell");

// Oyun durumu mesajını göstermek için 
const message = document.getElementById("message");

// Şu anki oyuncu
let currentPlayer = "X";

// Oyun tahtasını temsil eden dizi ve başlangıçta boşluklarla doldurulur.
let gameBoard = ["", "", "", "", "", "", "", "", ""];

// Oyunun bitip bitmediğini belirlemek için değişken oluşturulur.
let gameIsOver = false;

// Kazanma durumlarını kontrol eden fonksiyon;
function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    // Mevcut kazanma durumunun hücre indislerini ayrıştırır.
    const [a, b, c] = pattern;
    // Eğer aynı oyuncunun işareti üç hücrede aynıysa, oyunu kazanan oyuncu belirler
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      gameIsOver = true;
      message.textContent = `${currentPlayer} KAZANDI`;

      // Kazanan hücreleri renklendirir
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");
      return;
    }
  }

  // Eğer oyun tahtası doluysa ve kazanan yoksa oyun berabere biter.
  if (!gameBoard.includes("")) {
    gameIsOver = true;
    message.textContent = "OYUN BERABERE!";
  }
}

// Oyuncunun hamle yapmasını sağlayan fonksiyon.
function makeMove(cellIndex) {
  // Eğer hücre boşsa ve oyun bitmemişse hamle yapılır.
  if (!gameBoard[cellIndex] && !gameIsOver) {
    // Hücreye mevcut oyuncunun işareti eklenir.
    gameBoard[cellIndex] = currentPlayer;
    cells[cellIndex].textContent = currentPlayer;
    cells[cellIndex].classList.add(currentPlayer);

    // Kazanma durumunu kontrol ettik.
    checkWin();

    // Oyuncu değiştirilir (X -> O, O -> X)
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// Oyunu yeniden başlatan fonksiyon.
function restartGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameIsOver = false;
  message.textContent = "";

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("win", "X", "O");
  });
}
