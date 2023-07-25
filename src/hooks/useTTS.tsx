"use client";
import { useCallback } from "react";
import { browserName } from "react-device-detect";

let speechVoices: SpeechSynthesisVoice[];
if (window) {
  speechVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    speechVoices = window.speechSynthesis.getVoices();
  };
}
const useTTS = () => {
  const playSound = useCallback((term: string, lang: string) => {
    if (speechVoices.length <= 0) return;

    const msg = new SpeechSynthesisUtterance(term);

    let langVoice = speechVoices.find((voice) =>
      voice.lang.startsWith(lang.toLowerCase())
    );

    if (browserName === "Chrome" && lang === "EN") {
      langVoice = speechVoices[4];
    }

    if (!langVoice) {
      return;
    }

    msg.voice = langVoice;
    msg.lang = langVoice.lang;

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    speechSynthesis.speak(msg);
  }, []);

  return playSound;
};
export default useTTS;
