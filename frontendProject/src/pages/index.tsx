import React from "react";
import HomeComponent from "@/components/Home";
import NavbarComponent from "@/components/Navbar";

// Functional component that renders the Home page
function Home() {
  return (
    <>
      <NavbarComponent></NavbarComponent>
      <HomeComponent></HomeComponent>
    </>
  );
}

export default Home;
