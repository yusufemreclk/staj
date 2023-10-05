// HTML'den gerekli elementleri seçiyoruz.
const inputs = document.querySelector(".word"),
  hintTag = document.querySelector(".hint span"),
  guessLeft = document.querySelector(".guess span"),
  mistakes = document.querySelector(".wrong span"),
  resetBtn = document.querySelector(".reset"),
  hintBtn = document.querySelector(".showhint"),
  hintElement = document.querySelector(".hint"),
  typeInput = document.querySelector(".type-input");

// Oyun değişkenlerini başlatıyoruz.
let word,
  incorrectLetters = [],
  correctLetters = [],
  maxGuesses;

// Yeni bir oyun başlatmak için kullanılacak fonksiyon
function startNewGame() {
  alert("Yeni Oyun Başladı! Yeni Bir Kelime Tahmin Edin :)");
  // İpucu elementini gizliyoruz.
  hintElement.style.display = "none";
  hintElement.style.opacity = "0";

  // Veritabanından rastgele bir kelime seçiyoruz ve oyunu hazırlıyoruz.
  const ranWord = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranWord.word;
  // Kelime karakter sayısı 5 veya daha fazlaysa, maksimum tahmin hakkını 8 yaparız, aksi halde 6 yaparız.
  maxGuesses = word.length >= 5 ? 8 : 6;
  incorrectLetters = [];
  correctLetters = [];
  hintTag.innerText = ranWord.hint;
  guessLeft.innerText = maxGuesses;
  mistakes.innerText = incorrectLetters;

  // Her harf için bir input oluşturuyoruz.
  inputs.innerHTML = "";
  for (let i = 0; i < word.length; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.disabled = true;
    inputs.appendChild(input);
  }
}

// Kullanıcı girişini işleyip oyun istatistiklerini güncelleyen fonksiyon
function handleInput(e) {
  // Geçersiz karakterler ve zaten tahmin edilmiş harfleri dikkate almıyoruz.
  const key = e.target.value.toLowerCase();
  if (
    key.match(/^[a-z]+$/i) &&
    !incorrectLetters.includes(`${key}`) &&
    !correctLetters.includes(`${key}`)
  ) {
    // Harfin kelimenin içinde olup olmadığını kontrol ediyoruz.
    if (word.includes(key)) {
      // Doğru tahmini güncelliyoruz.
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          inputs.querySelectorAll("input")[i].value += key;
        }
      }
      correctLetters += key;
    } else {
      // Yanlış tahmini güncelliyoruz.
      maxGuesses--;
      incorrectLetters.push(`${key}`);
      mistakes.innerText = incorrectLetters;
    }
  }

  // Kalan tahmin sayısını güncelliyoruz ve oyunun kazanma/kaybetme koşullarını kontrol ediyoruz.
  guessLeft.innerText = maxGuesses;
  if (correctLetters.length === word.length) {
    alert(`Tebrikler! Kelimeyi Buldunuz: ${word.toUpperCase()}`);
    startNewGame();
  } else if (maxGuesses < 1) {
    alert("Oyun Bitti! Kalmayan Tahmin Hakkınız Kaldı!");
    for (let i = 0; i < word.length; i++) {
      // Inputlara doğru harfleri yazıyoruz.
      inputs.querySelectorAll("input")[i].value = word[i];
    }
  }

  // Giriş alanını temizliyoruz.
  typeInput.value = "";
}

// İpucu elementini gösteren fonksiyon
function showHintElement() {
  hintElement.style.display = "block";
  hintElement.style.opacity = "1";
}

// Olay dinleyicilerini ayarlıyoruz.
resetBtn.addEventListener("click", startNewGame);
hintBtn.addEventListener("click", showHintElement);
typeInput.addEventListener("input", handleInput);
inputs.addEventListener("click", () => typeInput.focus());
document.addEventListener("keydown", () => typeInput.focus());

// Yeni bir oyun başlatıyoruz.
startNewGame();
