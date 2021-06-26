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

  const learnMoreSectionCard = (step: number, title: string, text: string) => {
    const isEvenStep = step % 2 === 0;
    return (
      <div
        key={`learn-more-section-step-${step}`}
        className={`${
          isEvenStep && "flex-row-reverse"
        } flex  my-2 bg-gray-50 p-8 shadow-sm`}
      >
        <span className="md:text-6xl text-4xl">{`${step}`}</span>
        <div className={isEvenStep ? "mr-16" : "ml-16"}>
          <div className=" font-bold md:text-2xl text-lg">{title}</div>
          <div>{text}</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className=" flex flex-col items-center mt-32">
        <div className="font-black text-5xl">Disptach.io</div>
        <div className="font-mono">Share files as easily as sharing a link</div>
        <div className="mt-4">
          <Button
            className=""
            type="primary"
            onClick={() => (window.location.pathname = "/upload")}
          >
            Share Files
          </Button>
          <Button
            className="ml-4"
            onClick={() => {
              learnMoreSectionRef.current &&
                learnMoreSectionRef.current!.scrollIntoView({
                  behavior: "smooth",
                });
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
        <Timeline mode="alternate">
          {learMoreSectionText.map((element, index) => (
            <Timeline.Item>
              {learnMoreSectionCard(index + 1, element.title, element.text)}
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </div>
  );
};

export default Home;
