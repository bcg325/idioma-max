"use client";
import { useCallback, useMemo } from "react";

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
    if (lang === "EN") {
      msg.voice = speechVoices[4];
    } else if (lang === "ES") {
      msg.voice = speechVoices[7];
    }

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    msg.rate = 1.01;
    speechSynthesis.speak(msg);
  }, []);

  return playSound;
};
export default useTTS;
