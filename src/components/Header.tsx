import { useState } from "react";
import BookIcon from "@mui/icons-material/Book";
import Moon from "@mui/icons-material/DarkMode";
import { Switch } from "@headlessui/react";

const Header = () => {
	const [enabled, setEnabled] = useState(false);

	return (
		<div className="flex justify-between items-center mb-5">
			<BookIcon fontSize="large" />

			<div className="flex justify-center items-center gap-4">
				<Switch
					checked={enabled}
					onChange={setEnabled}
					className={`${
						enabled ? "bg-blue-600" : "bg-gray-500"
					} relative inline-flex h-6 w-11 items-center rounded-full`}
				>
					<span className="sr-only">Enable notifications</span>
					<span
						className={`${
							enabled ? "translate-x-6" : "translate-x-1"
						} inline-block h-4 w-4 transform rounded-full bg-white transition`}
					/>
				</Switch>
				<Moon sx={{ color: "black", border: "black" }} />
			</div>
		</div>
	);
};

export default Header;
