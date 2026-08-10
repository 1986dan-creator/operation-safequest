type HowToPlayScreenProps = {
  onBack: () => void;
};

export function HowToPlayScreen({ onBack }: HowToPlayScreenProps) {
  return (
    <main className="guide-screen">
      <section className="guide-card">
        <p className="section-label">SAFEQUEST GUIDE</p>
        <h1>📘 How to Play</h1>

        <div className="guide-steps">
          <div className="guide-step">
            <span>1</span>
            <div>
              <h2>Create your player</h2>
              <p>Choose a name and avatar for your SafeQuest profile.</p>
            </div>
          </div>

          <div className="guide-step">
            <span>2</span>
            <div>
              <h2>Complete safety missions</h2>
              <p>Answer questions and make smart online-safety choices.</p>
            </div>
          </div>

          <div className="guide-step">
            <span>3</span>
            <div>
              <h2>Earn XP and coins</h2>
              <p>XP unlocks new ranks and games. Coins unlock avatars.</p>
            </div>
          </div>

          <div className="guide-step">
            <span>4</span>
            <div>
              <h2>Become a Digital Defender</h2>
              <p>Reach SafeQuest Hero rank to unlock the final mission.</p>
            </div>
          </div>
        </div>

        <button className="next-button" onClick={onBack}>
          ← BACK TO HOME
        </button>
      </section>
    </main>
  );
}
