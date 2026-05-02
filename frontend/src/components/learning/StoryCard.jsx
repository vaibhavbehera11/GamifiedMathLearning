import React, { useState } from "react";
import "./StoryCard.css";

const StoryCard = ({ screenData, onComplete }) => {
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);

  const storySegments = screenData.story_segments || [];
  const currentSegment = storySegments[currentSegmentIndex];

  if (!currentSegment) {
    return (
      <div className="story-card-complete">
        <button className="story-next-btn" onClick={onComplete}>
          Start Quiz
        </button>
      </div>
    );
  }

  const handleNext = () => {
    if (currentSegmentIndex < storySegments.length - 1) {
      setCurrentSegmentIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div
      className="story-card"
      style={{
        background: "#dbeafe"
      }}
    >
      <div className="story-overlay">

        <div className="story-visual-section">
          <div className="placeholder-visual">
            {currentSegment.visual_state || "Story Visual"}
          </div>
        </div>

        <div className="story-dialogue-section">

          <div className="placeholder-portrait">
            {currentSegment.speaker}
          </div>

          <div className="dialogue-box">
            <h3 className="speaker-name">{currentSegment.speaker}</h3>
            <p className="dialogue-text">{currentSegment.text}</p>

            <button className="story-next-btn" onClick={handleNext}>
              {currentSegmentIndex < storySegments.length - 1
                ? "Next"
                : "Continue to Quiz"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StoryCard;