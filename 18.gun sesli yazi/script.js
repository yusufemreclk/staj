const textarea = document.querySelector("textarea");
const voiceList = document.querySelector("select");
const speechBtn = document.querySelector("button");

let synth = speechSynthesis; // Tarayıcı tarafından sağlanan SpeechSynthesis API
let isSpeaking = true; // Konuşma durumunu takip eden değişken

voices();

function voices() {
  //  ses seçeneklerini alıp, açılır listeye ekleyen fonksiyon

  for (let voice of synth.getVoices()) {
    let selected = voice.name === "Google US English" ? "selected" : ""; // Başlangıçta İngilizce seçili olsun
    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  }
}

//  sesleri tekrar listeler.
synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
  // Metni  konuşan fonksiyon
  let utterance = new SpeechSynthesisUtterance(text);

  for (let voice of synth.getVoices()) {
    if (voice.name === voiceList.value) {
      utterance.voice = voice; //  listeleden  ses ile okur.
    }
  }

  utterance.addEventListener("end", () => {
    isSpeaking = false;
    document.querySelector(".placeholder").style.display = "none";
  });

  synth.speak(utterance);
  isSpeaking = true;
}

speechBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (textarea.value !== "") {
    if (!synth.speaking) {
      textToSpeech(textarea.value);
      document.querySelector(".placeholder").style.display = "block";
    }
  }
});
