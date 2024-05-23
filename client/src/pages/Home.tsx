import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      <main className="flex-grow">{/* <Hero /> */}</main>

      {/* <Footer /> */}
    </div>
  );
}

export default Home;
