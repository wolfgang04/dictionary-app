import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface Definitions {
  antonyms: string[];
  synonyms: string[];
  example: string;
  definition: string;
}

interface Phonetics {
  text: string;
  audio: string;
}

interface Word {
  phonetics: Phonetics[];
  word: string;
  meanings: {
    partOfSpeech: string;
    definitions: Definitions[];
  }[];
}

interface Props {
  word: Word;
  isLoading: boolean;
  searchedWord: String;
  playAudio: (audioUrl: Phonetics[]) => void;
}

const Definitions: React.FC<Props> = (props) => {
  const word = props.word;

  return (
    <div className="mb-10">
      {word.meanings.map((meaning, idx) => (
        <div key={idx}>
          <div className="py-8 flex justify-between items-center">
            {/* WORD PRONOUNCIATION - TEXT */}
            {word && (
              <div>
                <div className="flex flex-col gap-2">
                  <p className="text-3xl font-medium">{word?.word}</p>
                  <p className="text-light-purple text-lg">
                    {word.phonetics[0].text}
                  </p>
                </div>
              </div>
            )}

            {/* WORD PRONOUNCIATION - AUDIO */}

            <button
              className="h-14 w-14 rounded-full bg-[#e9d5ff] flex items-center justify-center"
              onClick={() => props.playAudio(word.phonetics)}
            >
              <PlayArrowIcon sx={{ color: "#a855f7" }} />
            </button>
          </div>

          <span>
            <p className="absolute -translate-y-1/2 bg-white w-[55px] text-lg font-medium">
              {meaning.partOfSpeech}
            </p>
            <hr className="mb-10" />
          </span>

          <div>
            <p className="text-gray-400">Meaning</p>

            <ul className="list-outside list-disc p-5">
              {meaning.definitions.map((definition) => (
                <li key={definition.definition} className="mb-2">
                  {definition.definition}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Definitions;
