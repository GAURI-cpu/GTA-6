import React, { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const App = () => {
  gsap.registerPlugin(useGSAP);
  const [showContent, setshowContent] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".vi-mask-group", {
      rotate: 10,
      ease: "power3.easeInOut",
      transformOrigin: "50% 50%",
      duration: 2,
    });
    tl.to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setshowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(()=>{
    const main= document.querySelector(".main");
    main?.addEventListener("mousemove",function(e){
      const xMove=(e.clientX/window.innerWidth-0.5)*40;
      gsap.to(".main .text",{
        x:xMove*10,
        duration:0.5
      })
      gsap.to(".sky",{
        x:xMove
      })
      gsap.to(".bg",{
        x:xMove
      })
    })

  },[showContent])
  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-full overflow-hidden bg-black">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  fontFamily="Arial Black"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          ></image>
        </svg>
      </div>
      {showContent &&(
        <div className="main w-full">
          <div className="landingPage w-full h-screen bg-black">
            <div className="navbar w-full top-0 left-0 absolute  px-10 py-10 z-10">
              <div className="logo flex gap-3 text-2xl -mt-3 -ml-3">
                <div className="icon text-white font-extrabold">
                  <i className="ri-menu-unfold-4-line" ></i>
                </div>
                <h3 className="text-white text-1xl">Rockstar</h3>
              </div>
            </div>
            <div className=" relative imagesDiv w-full h-screen overflow-hidden">
              <img src="./sky.png" alt="sky" className=" sky scale-[1.2] w-full h-screen absolute top-0 left-0" />
              <img src="./bg.png" alt="bg" className="bg w-full h-screen absolute top-0 left-0" />
              <div className="text  flex text-white absolute flex-col top-0 left-1/2 -translate-x-1/2">
                <h1 className="text-[7rem] -ml-20">Grand</h1>
                <h1 className="text-[7rem] ml-30">Theft</h1>
                <h1 className="text-[7rem] -ml-20">auto</h1>
              </div>
              <img src="./girlbg.png" alt="girl" className=" girl -bottom-[68%] left-1/4 -translate-x-1/15 absolute scale-70" />
            </div>
            <div className=" bg-gradient-to-t from-black to-whitebottom w-full bottom-0 px-10 py-10 absolute">
              <img src="./ps5.png" alt="ps5" className="h-[45px] top-1/2 left-1/2 absolute -translate-y-1/2 -translate-x-1/2 "/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
