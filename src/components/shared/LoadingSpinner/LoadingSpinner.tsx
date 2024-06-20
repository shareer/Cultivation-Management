import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <FaSpinner className="animate-spin text-blue-500 text-4xl" />
  </div>
);

export default LoadingSpinner;
