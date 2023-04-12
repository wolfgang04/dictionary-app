import React from "react";

interface Definitions {
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
}

const Definitions: React.FC<Props> = (props) => {
	const word = props.word;

	return (
		<div className="mb-10">
			{word?.meanings && (
				<div className="relative mb-10">
					<p className="absolute -translate-y-1/2 bg-white w-[55px] text-lg font-medium">
						{word.meanings[0].partOfSpeech}
					</p>
					<hr />
				</div>
			)}

			{!props.isLoading && props.searchedWord !== "" && (
				<div>
					<p className="text-gray-400">Meaning</p>

					<ul className="list-outside list-disc p-5">
						{word?.meanings?.[0]?.definitions &&
							word.meanings[0].definitions.map((definition) => (
								<li
									key={definition.definition}
									className="mb-2"
								>
									{definition.definition}
								</li>
							))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Definitions;
