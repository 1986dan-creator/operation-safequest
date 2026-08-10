type PasswordChallenge = {
  password: string;
  isStrong: boolean;
  explanation: string;
};

type PasswordProtectorScreenProps = {
  challenge: PasswordChallenge;
  challengeNumber: number;
  totalChallenges: number;
  score: number;
  selectedChoice: boolean | null;
  hasAnswered: boolean;
  onChooseAnswer: (playerSaysStrong: boolean) => void;
  onNext: () => void;
};

export function PasswordProtectorScreen({
  challenge,
  challengeNumber,
  totalChallenges,
  score,
  selectedChoice,
  hasAnswered,
  onChooseAnswer,
  onNext,
}: PasswordProtectorScreenProps) {
  const answerIsCorrect = selectedChoice === challenge.isStrong;

  return (
    <main className="password-screen">
      <section className="password-card">
        <p className="section-label">
          PASSWORD PROTECTOR · CHALLENGE {challengeNumber} OF {totalChallenges}
        </p>

        <h1>🔐 Password Protector</h1>
        <p className="quiz-score">Current score: {score} XP</p>

        <div className="password-display">{challenge.password}</div>

        <h2>Is this password strong or weak?</h2>

        <div className="password-choice-list">
          <button
            className="password-choice weak-choice"
            onClick={() => onChooseAnswer(false)}
            disabled={hasAnswered}
          >
            ⚠️ WEAK
          </button>

          <button
            className="password-choice strong-choice"
            onClick={() => onChooseAnswer(true)}
            disabled={hasAnswered}
          >
            🛡️ STRONG
          </button>
        </div>

        {hasAnswered && (
          <>
            <p className={answerIsCorrect ? "result correct" : "result wrong"}>
              {answerIsCorrect
                ? "Correct! You earned 100 XP."
                : "Not quite. Check the password tip below."}
            </p>

            <p className="scam-explanation">{challenge.explanation}</p>

            <button className="next-button" onClick={onNext}>
              {challengeNumber === totalChallenges
                ? "FINISH MISSION"
                : "NEXT PASSWORD ▶"}
            </button>
          </>
        )}
      </section>
    </main>
  );
}