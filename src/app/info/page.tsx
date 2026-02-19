import React from "react";
import Navbar from "../components/Navbar";
import Content from "../components/Content";

const Page = () => {
  return (
    <div className="w-full">
      <div className="page-container">
        <Navbar />
        <Content />
      </div>
    </div>
  );
};

export default Page;
