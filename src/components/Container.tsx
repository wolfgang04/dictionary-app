import React from "react";
import WordInformation from "./WordInformation";
import BookIcon from "@mui/icons-material/Book";

const Container = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-5">
        <BookIcon fontSize="large" />
      </div>
      <WordInformation />
    </div>
  );
};

export default Container;
