import { Timeline } from "antd";
import Button from "antd/lib/button";
import React, { useRef } from "react";

const Home = () => {
  const learnMoreSectionRef = useRef<HTMLDivElement | null>(null);

  const learMoreSectionText = [
    {
      title: "Upload files",
      text: "Upload the files you wish to share between devices or with someone else",
    },
    {
      title: "Share the link",
      text: "After a successful upload of files you will get a link that you can share",
    },
    {
      title: "Download Files",
      text: "Navigate to the link using a browser where you wish to recieve the files and download the files",
    },
  ];

  const learnMoreSectionCard = (step: number, title: string, text: string) => (
    <div
      key={`learn-more-section-step-${step}`}
      className="flex  my-2 bg-gray-50 p-8 shadow-sm w-11/12 md:w-3/4 xl:w-1/2"
    >
      <span className="md:text-6xl text-4xl">{`${step}`}</span>
      <div className="ml-16">
        <div className=" font-bold md:text-2xl text-lg">{title}</div>
        <div>{text}</div>
      </div>
    </div>
  );

  const callAttention = () => {
    learnMoreSectionRef.current?.style.setProperty("background", "#FDFF47");
    setTimeout(() => {
      learnMoreSectionRef.current?.style.removeProperty("background");
    }, 200);
  };

  return (
    <div>
      <div className=" flex flex-col items-center mt-32">
        <div className="font-black lg:text-5xl md:text-4xl sm:text-3xl text-2xl">
          Disptach.io
        </div>
        <div className="font-mono text-center">
          Share files as easily as sharing a link
        </div>
        <div className="flex flex-col items-center mt-4 sm:flex-row sm:items-end sm:space-x-4 space-y-2">
          <Button
            className=""
            type="primary"
            onClick={() => (window.location.pathname = "/upload")}
          >
            Share Files
          </Button>
          <Button
            className=""
            onClick={() => {
              learnMoreSectionRef.current &&
                learnMoreSectionRef.current!.scrollIntoView({
                  behavior: "smooth",
                });
              callAttention();
            }}
          >
            Learn More
          </Button>
        </div>
      </div>

      <div
        className="flex flex-col items-center w-full mt-64"
        ref={learnMoreSectionRef}
      >
        <div className="font-bold text-2xl mb-20">How it works?</div>
        {learMoreSectionText.map(({ title, text }, i) =>
          learnMoreSectionCard(i + 1, title, text)
        )}
      </div>
    </div>
  );
};

export default Home;
