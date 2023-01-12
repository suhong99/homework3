import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "./Layout";
import Write from "../pages/Write";
import RecommendList from "../pages/RecommendList";
import Detail from "../pages/Detail";
// import Work from "../pages/Work";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* <Route path="works" element={<Works />} />
          <Route path="works/:id" element={<Work />} /> */}
          <Route path="/" element={<Home />} />\
          <Route path="/Write" element={<Write />} />
          <Route path="/RecommendList" element={<RecommendList />} />
          <Route path="/RecommendList/:id" element={<Detail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
