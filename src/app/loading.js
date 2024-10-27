"use client";

import { GridLoader } from "react-spinners";

const loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <GridLoader color="#2d3cde" />
    </div>
  );
};

export default loading;
