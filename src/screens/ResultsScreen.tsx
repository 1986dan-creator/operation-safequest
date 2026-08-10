type ResultsScreenProps = {
  completedMission: string;
  rewardXp: number;
rewardCoins: number;
correctAnswers?: number;
totalQuestions?: number;
showNewBestMessage: boolean;
onPlayAgain: () => void;
onReturnToLobby: () => void;
};

export function ResultsScreen({
  completedMission,
  rewardXp,
rewardCoins,
correctAnswers,
totalQuestions,
showNewBestMessage,
onPlayAgain,
onReturnToLobby,
}: ResultsScreenProps) {
  return (
    <main className="results-screen">
      <section className="results-card">
        <p className="section-label">MISSION COMPLETE</p>
        <span className="results-icon">🏆</span>

        <h1>{completedMission}</h1>
        <p>You completed the mission and protected your digital world.</p>

{showNewBestMessage && (
  <p className="new-best-message">
    🌟 NEW BEST QUIZ RUSH SCORE!
  </p>
)}

{correctAnswers !== undefined && totalQuestions !== undefined && (
  <p className="quiz-summary">
    🎯 You got {correctAnswers} out of {totalQuestions} correct.
  </p>
)}

        <div className="reward-list">
          <div className="reward-item">
            <span>⚡</span>
            <strong>+{rewardXp} XP</strong>
          </div>

          <div className="reward-item">
            <span>🪙</span>
            <strong>+{rewardCoins} Coins</strong>
          </div>
        </div>

<button className="next-button" onClick={onPlayAgain}>
  ↻ PLAY AGAIN
</button>

<button className="next-button" onClick={onReturnToLobby}>
  RETURN TO ARCADE ▶
</button>
      </section>
    </main>
  );
}