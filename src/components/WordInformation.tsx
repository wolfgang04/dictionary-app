import React, { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "axios";
import Definitions from "./meanings/Definitions";

interface definitions {
  antonyms: string[];
  synonyms: string[];
  example: string;
  definition: string;
}

interface Phonetics {
  audio: string;
  text: string;
}

interface Word {
  phonetics: Phonetics[];
  phonetic: string;
  sourceUrl: string[];
  word: string;
  meanings: {
    partOfSpeech: string;
    definitions: definitions[];
  }[];
}

const WordInformation = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedWord, setSearchedWord] = useState("");
  const [word, setWord] = useState<Word[]>([]);

  const fetchWord = async () => {
    setWord([]);
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${
          searchRef.current!.value
        }`
      );
      setWord(res.data);
      setIsLoading(false);
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setWord([]);
        setIsLoading(false);
      } else {
        console.error(err);
      }
    }
  };

  const handlePlayAudio = (audioUrl: Phonetics[]): void => {
    audioUrl.some((url) => {
      if (url.audio !== "") {
        const playAudio = new Audio(url.audio);
        playAudio.play();
        return true;
      }
    });
  };

  return (
    <div>
      {/* SEARCH BAR */}
      <div className="relative text-gray-600 focus-within:text-gray-400">
        <input
          type="text"
          className="py-2 text-sm text-black bg-gray-100 rounded-xl p-5 focus:outline-none w-[100%] h-[48px]"
          placeholder="Search..."
          autoComplete="off"
          ref={searchRef}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Enter") {
              setSearchedWord(searchRef.current!.value);
              fetchWord();
            }
          }}
        />

        <span className="absolute inset-y-0 right-5 flex items-center pl-2">
          <SearchIcon style={{ color: "#AF69EF" }} />
        </span>
      </div>

      <div className="flex justify-center items-center">
        {isLoading && <p>Loading...</p>}
        {word.length === 0 && !isLoading && searchedWord !== "" && (
          <p>No results found for {searchedWord}</p>
        )}
      </div>

      {word?.map((wordInfo, idx) => {
        return (
          <Definitions
            playAudio={handlePlayAudio}
            word={wordInfo}
            isLoading={isLoading}
            searchedWord={searchedWord}
            key={`${wordInfo.word} - ${idx}`}
          />
        );
      })}
    </div>
  );
};

export default WordInformation;
