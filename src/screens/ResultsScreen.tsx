type ResultsScreenProps = {
  completedMission: string;
  rewardXp: number;
rewardCoins: number;
showNewBestMessage: boolean;
onReturnToLobby: () => void;
};

export function ResultsScreen({
  completedMission,
  rewardXp,
rewardCoins,
showNewBestMessage,
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

        <button className="next-button" onClick={onReturnToLobby}>
          RETURN TO ARCADE ▶
        </button>
      </section>
    </main>
  );
}