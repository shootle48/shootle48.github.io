import { useState } from "react";
import Navbar from "./components/Navbar";
import Band from "./assets/Vice.png";
import Typewriter from "typewriter-effect";
import Avatar from "./assets/Avatar.jpg";
import Preview from "./assets/Preview.jpg";

const about = [
  {
    title: "Name",
    label: "Thepparit Inthapapraphan",
  },
  {
    title: "Now",
    label: "Front-End learner",
  },
  {
    title: "Language",
    label: "HTML CSS Javascript PHP Python",
  },
  {
    title: "Framwork",
    label: "React",
  },
];

export default function App() {
  return (
    <div className="min-h-screen backgroud">
      <Navbar activePage="home" />

      <div className="flex flex-col justify-center md:items-center">
        {/* paragrahp */}
        <div className="p-6 md:p-10">
          <img
            className="rounded-lg w-full object-cover max-h-[300px] mb-4"
            src={Avatar}
            alt=""
          />
          <h1 className="text-fuchsia-100 text-2xl font-semibold mb-4">
            <Typewriter
              options={{
                strings: ["1316 was here!", "I'm Front-end developer"],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <p className="text-fuchsia-200/80 mt-3 leading-7 max-w-2xl">
            Welcome to my website! I'm thrilled to have you here. Allow me to
            introduce myself—I am a passionate and dedicated full-stack web
            developer ready to bring your digital dreams to life. With expertise
            in both front-end and back-end development, I have honed my skills
            to create seamless and immersive web experiences. Whether it's
            crafting beautiful and intuitive user interfaces or building robust
            and efficient server-side systems, I strive to deliver top-notch
            solutions that exceed expectations.
          </p>

          <button
            className="text-fuchsia-800 bg-white px-5 py-2 text-lg font-bold rounded-lg hover:opacity-75 transition-opacity my-5"
            type="button"
          >
            Hire Me!
          </button>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
            {about.map((item) => (
              <div key={item.title}>
                <h2 className="text-fuchsia-800 pb-3 border-b border-fuchsia-100/20">
                  {item.title}
                </h2>
                <p className="text-fuchsia-100">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h1 className="text-fuchsia-100 text-2xl pb-3">My Projects</h1>
            <div className="grid grid-cols-2 gap-6 mt-1">
              <div>
                <img src={Preview} alt="Preview" className="rounded-lg" />
                <p className="mt-3 text-fuchsia-100/90 max-w-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatem id neque debitis commodi soluta in, labore, aliquam
                  molestiae cupiditate quis eius veritatis sit enim inventore
                  nostrum eaque quia tenetur minus quas perspiciatis ea aut.
                  Error a veniam maiores non nulla aut commodi, sapiente beatae
                  consequuntur placeat. Eaque eos similique tenetur.
                </p>
                <button type="button" className="text-fuchsia-800 bg-white px-5 py-2 text-lg font-bold rounded-lg hover:opacity-75 transition-opacity my-5">
                  Visit
                </button>
              </div>
              <div>
                <img src={Preview} alt="Preview" className="rounded-lg" />
                <p className="mt-3 text-fuchsia-100/90 max-w-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatem id neque debitis commodi soluta in, labore, aliquam
                  molestiae cupiditate quis eius veritatis sit enim inventore
                  nostrum eaque quia tenetur minus quas perspiciatis ea aut.
                  Error a veniam maiores non nulla aut commodi, sapiente beatae
                  consequuntur placeat. Eaque eos similique tenetur.
                </p>
                <button type="button" className="text-fuchsia-800 bg-white px-5 py-2 text-lg font-bold rounded-lg hover:opacity-75 transition-opacity my-5">
                  Visit
                </button>
              </div>
              <div>
                <img src={Preview} alt="Preview" className="rounded-lg" />
                <p className="mt-3 text-fuchsia-100/90 max-w-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatem id neque debitis commodi soluta in, labore, aliquam
                  molestiae cupiditate quis eius veritatis sit enim inventore
                  nostrum eaque quia tenetur minus quas perspiciatis ea aut.
                  Error a veniam maiores non nulla aut commodi, sapiente beatae
                  consequuntur placeat. Eaque eos similique tenetur.
                </p>
                <button type="button" className="text-fuchsia-800 bg-white px-5 py-2 text-lg font-bold rounded-lg hover:opacity-75 transition-opacity my-5">
                  Visit
                </button>
              </div>
              <div>
                <img src={Preview} alt="Preview" className="rounded-lg" />
                <p className="mt-3 text-fuchsia-100/90 max-w-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatem id neque debitis commodi soluta in, labore, aliquam
                  molestiae cupiditate quis eius veritatis sit enim inventore
                  nostrum eaque quia tenetur minus quas perspiciatis ea aut.
                  Error a veniam maiores non nulla aut commodi, sapiente beatae
                  consequuntur placeat. Eaque eos similique tenetur.
                </p>
                <button type="button" className="text-fuchsia-800 bg-white px-5 py-2 text-lg font-bold rounded-lg hover:opacity-75 transition-opacity my-5">
                  Visit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* img */}
      </div>
    </div>
  );
}
