import React, { useState, useEffect } from "react";
import module1Data from "../data/modules/module1.json";

import StoryCard from "../components/learning/StoryCard";
import QuizCard from "../components/learning/QuizCard";
import ProgressBar from "../components/common/ProgressBar";
import FinalChallengePlaceholder from "../components/games/FinalChallengePlaceholder";

const ModulePage = () => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [currentPhase, setCurrentPhase] = useState("story");
  const [totalPoints, setTotalPoints] = useState(0);
  const [mistakeLog, setMistakeLog] = useState([]);

  const moduleData = module1Data;
  const currentScreen = moduleData.screens[currentScreenIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreenIndex, currentPhase]);

  const handleStoryComplete = () => {
    if (
      currentScreen.quiz_questions &&
      currentScreen.quiz_questions.length > 0
    ) {
      setCurrentPhase("quiz");
    } else {
      handleScreenCompletion();
    }
  };

  const handleQuizComplete = () => {
    handleScreenCompletion();
  };

  const handleScreenCompletion = () => {
    setTotalPoints(
      (prev) =>
        prev + (currentScreen.reward?.screen_completion_points || 0)
    );

    if (currentScreenIndex < moduleData.screens.length - 1) {
      setCurrentScreenIndex((prev) => prev + 1);
      setCurrentPhase("story");
    } else {
      setCurrentPhase("final_challenge");
    }
  };

  const handleAnswerLogged = (answerData) => {
    if (!answerData.isCorrect) {
      setMistakeLog((prev) => [...prev, answerData]);
    }
  };

  const handleFinalChallengeComplete = () => {
    alert(
      `Module Complete!\n\nTotal Points: ${
        totalPoints + moduleData.module_rewards.completion_points
      }\nBadge Earned: ${moduleData.module_rewards.completion_badge}`
    );
  };

  return (
    <div className="module-page">
      <ProgressBar
        current={
          currentPhase === "final_challenge"
            ? moduleData.total_screens
            : currentScreenIndex
        }
        total={moduleData.total_screens}
      />

      {currentPhase !== "final_challenge" && (
        <div className="module-header">
          <h1>{moduleData.module_title}</h1>
          <h2>{currentScreen.title}</h2>
          <p>{currentScreen.objective}</p>
        </div>
      )}

      {currentPhase === "story" && (
        <StoryCard
          screenData={currentScreen}
          onComplete={handleStoryComplete}
        />
      )}

      {currentPhase === "quiz" && (
        <QuizCard
          screenData={currentScreen}
          onComplete={handleQuizComplete}
          onAnswerLogged={handleAnswerLogged}
        />
      )}

      {currentPhase === "final_challenge" && (
        <FinalChallengePlaceholder
          challengeData={moduleData.final_challenge}
          totalPoints={totalPoints}
          mistakeLog={mistakeLog}
          completionBadge={moduleData.module_rewards.completion_badge}
          completionPoints={moduleData.module_rewards.completion_points}
          onComplete={handleFinalChallengeComplete}
        />
      )}
    </div>
  );
};

export default ModulePage;