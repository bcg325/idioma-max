"use client";
import { useCallback } from "react";

const speech_voices: SpeechSynthesisVoice[] = speechSynthesis.getVoices();

const useTTS = () => {
  const playSound = useCallback((term: string, lang: string) => {
    console.log(lang);
    const msg = new SpeechSynthesisUtterance(term);
    if (lang === "EN") {
      msg.voice = speech_voices[4];
    } else if (lang === "ES") {
      msg.voice = speech_voices[7];
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
