// HTML Elemetlerini seçtik
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

// Oyunun bitip bitmediğini belirleyen değişken
let gameOver = false;

// Yem konumunu 
let foodX, foodY;

// Yılan başlangıç konumu
let snakeX = 5,
  snakeY = 5;

// Yılanın hızı
let velocityX = 0,
  velocityY = 0;

// Yılanın vücudunu 
let snakeBody = [];

// Oyun döngüsünü kontrol edecek değişken
let setIntervalId;

// Oyuncu skorunu tutacak değişken
let score = 0;

// En yüksek skoru 
let highScore = localStorage.getItem("high-score") || 0;

// En yüksek skoru ekrana yaz
highScoreElement.innerText = `Max. Skor: ${highScore}`;

// Yem konumunu rastgele belirleyen fonksiyon
const updateFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

// Oyunun sona erdiğini işleyen fonksiyon
const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("Oyun Bitti! Tekrar oynamak için TAMAM'a basın...");
  location.reload();
};

// Tuşa basıldığınzda yılanın yönünü değiştiren fonksiyon
const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

// Oyunu başlatan fonksiyon.
const initGame = () => {
  // Eğer oyun sona ermişse, oyunu başlatmadan çık
  if (gameOver) return handleGameOver();

  // Yılanın ve yemin konumunu HTML içeriği olarak oluşturacağız
  let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  // Yılan yemi yemişse
  if (snakeX === foodX && snakeY === foodY) {
    // Yeni yem konumu belirle
    updateFoodPosition();

    // Yemi yılan vücuduna ekle
    snakeBody.push([foodY, foodX]);

    // Skoru arttır.
    score++;

    // Eğer yeni skor en yüksek skoru geçerse, en yüksek skoru güncelle.
    highScore = score >= highScore ? score : highScore;

    // En yüksek skoru localstorage'a kaydet
    localStorage.setItem("high-score", highScore);

    // Skor ve en yüksek skoru ekranda göster
    scoreElement.innerText = `Skor: ${score}`;
    highScoreElement.innerText = `Max. Skor: ${highScore}`;
  }

  // Yılanın başını güncelle
  snakeX += velocityX;
  snakeY += velocityY;

  // Yılanın vücudunu kaydırarak haraket ettir
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  // Yılanın tahta dışına çıkıp çıkmadığını kontrol et.
  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    return (gameOver = true);
  }
  // Yılanın her bir parçasını temsil eden div'leri HTML içeriğine ekle
  for (let i = 0; i < snakeBody.length; i++) {
    html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

    // Yılanın başının vücuduyla çarpışıp çarpışmadığını kontrol et
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }

  // Oyun tahtasını güncelle
  playBoard.innerHTML = html;
};

// Oyunu başlatmadan önce yem konumu belirle
updateFoodPosition();

// Oyun döngüsünü başlat
setIntervalId = setInterval(initGame, 100);

// Klavye tuşlarına basıldığında yılanın yönünü değiştir
document.addEventListener("keyup", changeDirection);
