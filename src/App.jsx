import { useState } from "react";
import Navbar from "./components/Navbar";
import Band from "./assets/Vice.png";

export default function App() {

  return(
    <div className="min-h-screen backgroud">
        <Navbar activePage="home" />


        <div className="ml-[46rem] mt-[15rem]">
          <img src={Band} alt="Band"/>
        </div>


    </div>
  )
}