let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.getElementById("voiceSelect");

// ✅ Populate voice list reliably (desktop + mobile)
function populateVoices() {
    voices = window.speechSynthesis.getVoices();
    if (!voices.length) return;

    voiceSelect.innerHTML = ""; // clear old options

    voices.forEach((voice, i) => {
        let option = new Option(`${voice.name} (${voice.lang})`, i);
        voiceSelect.add(option);
    });

    speech.voice = voices[0]; // set default voice
}

// ✅ Initial call with delay (to fix mobile loading)
setTimeout(() => {
    populateVoices();
}, 100);

// ✅ Event listener fallback
window.speechSynthesis.onvoiceschanged = populateVoices;

// ✅ Change voice when dropdown is changed
voiceSelect.addEventListener("change", () => {
    let selectedVoice = voices[voiceSelect.selectedIndex];
    if (selectedVoice) {
        speech.voice = selectedVoice;
    }
});

// ✅ Speak the typed text when button is clicked
document.querySelector("button").addEventListener("click", () => {
    const text = document.querySelector("textarea").value.trim();
    if (!text) return;

    // 🟢 Create new instance for accurate voice & settings
    const utterance = new SpeechSynthesisUtterance(text);

    // 🟢 Apply selected voice
    const selectedVoice = voices[voiceSelect.selectedIndex];
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    // 🟢 Speak
    window.speechSynthesis.speak(utterance);
});

