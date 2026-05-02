
import React from "react";
import "./FinalChallengePlaceholder.css";

const FinalChallengePlaceholder = ({
  challengeData,
  totalPoints,
  mistakeLog,
  completionBadge,
  completionPoints,
  onComplete
}) => {
  const totalMistakes = mistakeLog.length;

  const weakConcepts = [
    ...new Set(
      mistakeLog
        .map((mistake) => mistake.mistakeTracking?.concept_tag)
        .filter(Boolean)
    )
  ];

  return (
    <div className="final-challenge-screen">
      <div className="final-challenge-card">

        <h1>{challengeData.title}</h1>

        <p className="challenge-description">
          {challengeData.description}
        </p>

        <div className="challenge-status">
          <h3>Module Summary</h3>

          <p>
            <strong>Total Points Earned:</strong>{" "}
            {totalPoints + completionPoints}
          </p>

          <p>
            <strong>Completion Badge:</strong> {completionBadge}
          </p>

          <p>
            <strong>Total Mistakes Logged:</strong> {totalMistakes}
          </p>
        </div>

        <div className="weak-concepts-section">
          <h3>Concepts to Review:</h3>

          {weakConcepts.length > 0 ? (
            <ul>
              {weakConcepts.map((concept, index) => (
                <li key={index}>{concept.replace(/_/g, " ")}</li>
              ))}
            </ul>
          ) : (
            <p>Excellent work! No major weak concepts detected.</p>
          )}
        </div>

        <div className="future-game-placeholder">
          <h3>Final Challenge Coming Soon</h3>
          <p>
            A full interactive module-end game will be integrated here in future
            versions.
          </p>
        </div>

        <button className="complete-module-btn" onClick={onComplete}>
          Complete Module
        </button>

      </div>
    </div>
  );
};

export default FinalChallengePlaceholder;

