import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-16 h-16 border-4 border-t-4 border-t-mainColor border-gray-200 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;
