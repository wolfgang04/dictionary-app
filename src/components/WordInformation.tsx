import React, { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const WordInformation = () => {
	const [word, setWord] = useState([]);
	const searchRef = useRef<HTMLInputElement>(null);

	const handleSearchWord = (e: React.KeyboardEvent) => {
		const searchedWord = searchRef.current!.value;

		if (e.key == "Enter") {
			axios
				.get(
					`https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`
				)
				.then((res) => setWord(res.data))
				.catch((err) => {
					throw new Error(err);
				});
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
					onKeyDown={handleSearchWord}
				/>

				<span className="absolute inset-y-0 right-5 flex items-center pl-2">
					<SearchIcon style={{ color: "#AF69EF" }} />
				</span>
			</div>
		</div>
	);
};

export default WordInformation;
