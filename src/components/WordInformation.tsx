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
			console.log(word);
		} catch (err: any) {
			if (err.response && err.response.status === 404) {
				setWord([]);
				setIsLoading(false);
			} else {
				console.error(err);
			}
		}
	};

	const handlePlayAudio = (words: Word[]): void => {
		const url = words
			.find((word) => word.phonetics.some((audio) => audio.audio !== ""))
			?.phonetics.find((audio) => audio.audio !== "")?.audio;
		if (url) {
			const playAudio = new Audio(url);
			playAudio.play();
		}
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

			<div className="py-8 flex justify-between items-center">
				{/* WORD PRONOUNCIATION - TEXT */}
				{word && (
					<div>
						<div className="flex flex-col gap-2">
							<p className="text-3xl font-medium">
								{word?.[0]?.word}
							</p>
							<p className="text-light-purple text-lg">
								{word?.[0]?.phonetic}
							</p>
						</div>
					</div>
				)}

				{/* WORD PRONOUNCIATION - AUDIO */}

				{word.length > 0 && (
					<button
						className="h-14 w-14 rounded-full bg-[#e9d5ff] flex items-center justify-center"
						onClick={() => handlePlayAudio(word)}
					>
						<PlayArrowIcon sx={{ color: "#a855f7" }} />
					</button>
				)}
			</div>

			{word?.map((wordInfo, idx) => {
				return (
					<Definitions
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
