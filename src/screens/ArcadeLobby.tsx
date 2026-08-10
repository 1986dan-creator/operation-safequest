type Rank = {
  name: string;
  icon: string;
  minXp: number;
};

type Achievement = {
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
};

type ArcadeLobbyProps = {
  playerName: string;
  selectedAvatar: string;
  currentRank: Rank;
  nextRank?: Rank;
  ranks: Rank[];
  xp: number;
  coins: number;
  xpProgress: number;
totalMissions: number;
quizBestScore: number;
achievements: Achievement[];
  scamHunterUnlocked: boolean;
  passwordProtectorUnlocked: boolean;
  heroMissionUnlocked: boolean;
  onEditProfile: () => void;
  onOpenShop: () => void;
  onReset: () => void;
  onStartQuiz: () => void;
  onStartScamHunter: () => void;
  onStartPasswordProtector: () => void;
  onStartHeroMission: () => void;
};

export function ArcadeLobby({
  playerName,
  selectedAvatar,
  currentRank,
  nextRank,
  ranks,
  xp,
  coins,
  xpProgress,
totalMissions,
quizBestScore,
achievements,
  scamHunterUnlocked,
  passwordProtectorUnlocked,
  heroMissionUnlocked,
  onEditProfile,
  onOpenShop,
  onReset,
  onStartQuiz,
  onStartScamHunter,
  onStartPasswordProtector,
  onStartHeroMission,
}: ArcadeLobbyProps) {
  return (
    <main className="arcade-lobby">
      <section className="lobby-header">
        <div className="player-profile">
          <div className="player-avatar">{selectedAvatar}</div>

          <div>
            <p className="welcome-text">WELCOME BACK,</p>
            <h1>{playerName || "SafeQuest Player"}</h1>

            <p className="rank-text">
              {currentRank.icon} {currentRank.name}
            </p>

            <button className="edit-profile-button" onClick={onEditProfile}>
              ✏️ EDIT PROFILE
            </button>
          </div>
        </div>

        <div className="currency-panel">
          <p>⚡ {xp} XP</p>
          <p>🪙 {coins} Coins</p>
        </div>
      </section>

      <section className="player-stats-panel">
        <p>🎮 Missions completed: {totalMissions}</p>

        <button className="shop-button" onClick={onOpenShop}>
          🛍️ AVATAR SHOP
        </button>

        <button className="reset-button" onClick={onReset}>
          ↻ RESET PROGRESS
        </button>
      </section>

      <section className="xp-panel">
        <div className="xp-labels">
          <span>
            {nextRank ? `${currentRank.name.toUpperCase()} PROGRESS` : "MAX RANK"}
          </span>

          <span>
            {nextRank ? `${xp} / ${nextRank.minXp} XP` : `${xp} XP`}
          </span>
        </div>

        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${xpProgress}%` }} />
        </div>

        <p className="xp-message">
          {nextRank
            ? `${nextRank.minXp - xp} XP until ${nextRank.name}!`
            : "You reached the highest SafeQuest rank!"}
        </p>

        <div className="rank-ladder">
          {ranks.map((rank) => (
            <div
              key={rank.name}
              className={
                xp >= rank.minXp ? "rank-step rank-earned" : "rank-step"
              }
            >
              <span>{rank.icon}</span>
              <small>{rank.name}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="achievements-section">
        <p className="section-label">ACHIEVEMENTS</p>
        <h2>Your progress</h2>

        <div className="achievement-grid">
          {achievements.map((achievement) => (
            <div
              key={achievement.title}
              className={
                achievement.unlocked
                  ? "achievement-card achievement-unlocked"
                  : "achievement-card achievement-locked"
              }
            >
              <span className="achievement-icon">{achievement.icon}</span>

              <div>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                <span className="achievement-status">
                  {achievement.unlocked ? "UNLOCKED" : "LOCKED"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="games-section">
        <p className="section-label">ARCADE GAMES</p>
        <h2>Choose your next mission</h2>

        <div className="game-grid">
          <button className="game-card game-card-unlocked" onClick={onStartQuiz}>
            <span className="game-icon">⚡</span>
            <p className="game-status">UNLOCKED</p>
            <h3>Quiz Rush</h3>
            <p>Test your online-safety knowledge against the clock.</p>
            <p>🏅 Best score: {quizBestScore} XP</p>
            <span className="play-button">▶ PLAY</span>
          </button>

          {scamHunterUnlocked ? (
            <button
              className="game-card game-card-unlocked"
              onClick={onStartScamHunter}
            >
              <span className="game-icon">🕵️</span>
              <p className="game-status">UNLOCKED</p>
              <h3>Scam Hunter</h3>
              <p>Spot suspicious messages and protect your information.</p>
              <span className="play-button">▶ PLAY</span>
            </button>
          ) : (
            <button className="game-card game-card-locked" disabled>
              <span className="game-icon">🕵️</span>
              <p className="game-status">LOCKED</p>
              <h3>Scam Hunter</h3>
              <p>Reach Cadet rank to unlock this mission.</p>
              <span className="locked-button">🔒 LOCKED</span>
            </button>
          )}

          {passwordProtectorUnlocked ? (
            <button
              className="game-card game-card-unlocked"
              onClick={onStartPasswordProtector}
            >
              <span className="game-icon">🔐</span>
              <p className="game-status">UNLOCKED</p>
              <h3>Password Protector</h3>
              <p>Learn how to spot passwords that keep accounts safe.</p>
              <span className="play-button">▶ PLAY</span>
            </button>
          ) : (
            <button className="game-card game-card-locked" disabled>
              <span className="game-icon">🔐</span>
              <p className="game-status">LOCKED</p>
              <h3>Password Protector</h3>
              <p>Reach Guardian rank to unlock this mission.</p>
              <span className="locked-button">🔒 LOCKED</span>
            </button>
          )}

          {heroMissionUnlocked ? (
            <button
              className="game-card game-card-unlocked"
              onClick={onStartHeroMission}
            >
              <span className="game-icon">🏆</span>
              <p className="game-status">UNLOCKED</p>
              <h3>Digital Defender</h3>
              <p>Make smart choices in real-world online-safety situations.</p>
              <span className="play-button">▶ PLAY</span>
            </button>
          ) : (
            <button className="game-card game-card-locked" disabled>
              <span className="game-icon">🏆</span>
              <p className="game-status">LOCKED</p>
              <h3>Digital Defender</h3>
              <p>Reach SafeQuest Hero rank to unlock this final mission.</p>
              <span className="locked-button">🔒 LOCKED</span>
            </button>
          )}
        </div>
      </section>
    </main>
  );
}