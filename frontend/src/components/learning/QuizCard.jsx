import React, { useState } from "react";
import "./QuizCard.css";

const QuizCard = ({ screenData, onComplete, onAnswerLogged }) => {
  const questions = screenData.quiz_questions || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="quiz-complete-screen">
        <div className="quiz-complete-card">
          <h2>Screen Complete!</h2>

          <p>
            You scored {score} /{" "}
            {questions.reduce((total, q) => total + (q.points || 0), 0)}
          </p>

          <div className="reward-section">
            <h3>Reward Earned:</h3>
            <p className="reward-badge">{screenData.reward.badge}</p>
            <p className="reward-points">
              +{screenData.reward.screen_completion_points} points
            </p>
          </div>

          <button className="quiz-next-btn" onClick={onComplete}>
            Continue
          </button>
        </div>
      </div>
    );
  }

  const handleOptionSelect = (option) => {
    if (showFeedback) return;

    setSelectedAnswer(option);
    setShowFeedback(true);

    const isCorrect = option === currentQuestion.correct_answer;

    if (isCorrect) {
      setScore((prev) => prev + (currentQuestion.points || 0));
    }

    if (onAnswerLogged) {
      onAnswerLogged({
        questionId: currentQuestion.question_id,
        selectedAnswer: option,
        correctAnswer: currentQuestion.correct_answer,
        isCorrect,
        mistakeTracking: currentQuestion.mistake_tracking || null
      });
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  return (
    <div
      className="quiz-card"
      style={{
        background: "#f8fafc"
      }}
    >
      <div className="quiz-overlay">
        <div className="quiz-container">

          <div className="quiz-header">
            <h2>{screenData.title} Quiz</h2>
            <p>
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>

          <div className="quiz-question-box">
            <h3>{currentQuestion.question_text}</h3>
          </div>

          <div className="quiz-options">
            {currentQuestion.options.map((option, index) => {
              let optionClass = "quiz-option";

              if (showFeedback) {
                if (option === currentQuestion.correct_answer) {
                  optionClass += " correct";
                } else if (option === selectedAnswer) {
                  optionClass += " incorrect";
                }
              }

              return (
                <button
                  key={index}
                  className={optionClass}
                  onClick={() => handleOptionSelect(option)}
                  disabled={showFeedback}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="quiz-feedback-section">
              <p className="quiz-feedback">
                {selectedAnswer === currentQuestion.correct_answer
                  ? currentQuestion.feedback_correct
                  : currentQuestion.feedback_incorrect}
              </p>

              <button
                className="quiz-next-btn"
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex < questions.length - 1
                  ? "Next Question"
                  : "Finish Screen"}
              </button>
            </div>
          )}

          <div className="quiz-score-display">
            Current Score: {score}
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuizCard;