import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../src/style/Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.fullPage}>
        <div className="absolute text-4xl md:text-6xl lg:text-8xl text-center text-[#F7F6F2] font-bold z-10">
          <div>
            <p>where food meets</p>
            <p>friendship</p>
          </div>
          <button
            className="mt-5 text-sm md:text-l lg:text-xl text-[#002fa7] rounded-[1.5625rem] border-[3px] border-[#002fa7] bg-[#F7F6F2] px-6 py-2 "
            onClick={() => navigate("/allEvents")}
          >
            find an event near you
          </button>
        </div>
        <img
          src="./home.jpeg"
          alt="homepage header image"
          className="w-full h-auto "
        />
      </div>
      <div className="grid grid-cols-2 bg-[#F7F6F2] pt-3 ">
        <div>
          <img
            src="/sm-group.jpeg"
            alt="group image"
            // className="h-auto w-[50vh]"
          />
        </div>
        <div className="bg-[#002fa7]">
          <div className="p-10 text-lg text-[#F7F6F2]">
            <div>
              <h1>Welcome to Cookbook Club!</h1>{" "}
              <p>
                Love good food and great company? Cookbook Club is a fun, casual
                space where food lovers gather once a month to share delicious
                dishes, swap cooking tips, and celebrate all things tasty.
              </p>
              <h2> How It Works:</h2>
              <p>1. We pick a theme.</p>
              <p>
                {" "}
                It could be a seasonal favorite, a new cookbook, or a fun
                challenge (comfort food, global flavors, one-pot wonders—you
                name it!).
              </p>
              <p>
                2. You choose a dish. Find a recipe that fits the theme and whip
                it up in your kitchen.
              </p>
              <p>3. We meet, eat, and share!</p>
              <p>
                Bring your dish to our monthly meetup, enjoy a feast of flavors,
                and chat about what worked, what flopped, and what we’re making
                next.
              </p>
              <p>
                No fancy chef skills required—just a love for food and a
                willingness to try new things! Sign up for our next event and
                let’s eat, laugh, and discover new flavors together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
