type HomeScreenProps = {
  hasPlayer: boolean;
  onStart: () => void;
};

export function HomeScreen({
  hasPlayer,
  onStart,
}: HomeScreenProps) {
  return (
    <main className="home-screen">
      <p className="section-label">WELCOME TO</p>
      <h1>🛡️ SafeQuest</h1>
      <p>Learn how to stay smart, safe, and confident online.</p>

      <button className="next-button" onClick={onStart}>
        {hasPlayer ? "ENTER ARCADE ▶" : "PRESS START ▶"}
      </button>
    </main>
  );
}