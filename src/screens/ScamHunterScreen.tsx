type ScamMessage = {
  sender: string;
  message: string;
  isScam: boolean;
  explanation: string;
};

type ScamHunterScreenProps = {
  message: ScamMessage;
  messageNumber: number;
  totalMessages: number;
  score: number;
  selectedChoice: boolean | null;
  hasAnswered: boolean;
  onChooseAnswer: (playerSaysScam: boolean) => void;
  onNext: () => void;
};

export function ScamHunterScreen({
  message,
  messageNumber,
  totalMessages,
  score,
  selectedChoice,
  hasAnswered,
  onChooseAnswer,
  onNext,
}: ScamHunterScreenProps) {
  const answerIsCorrect = selectedChoice === message.isScam;

  return (
    <main className="scam-screen">
      <section className="scam-card">
        <p className="section-label">
          SCAM HUNTER · MESSAGE {messageNumber} OF {totalMessages}
        </p>

        <h1>🕵️ Scam Hunter</h1>
        <p className="quiz-score">Current score: {score} XP</p>

        <div className="message-box">
          <p className="message-sender">From: {message.sender}</p>
          <p>{message.message}</p>
        </div>

        <h2>Is this message safe or a scam?</h2>

        <div className="scam-choice-list">
          <button
            className="scam-choice safe-choice"
            onClick={() => onChooseAnswer(false)}
            disabled={hasAnswered}
          >
            ✅ SAFE
          </button>

          <button
            className="scam-choice scam-choice-button"
            onClick={() => onChooseAnswer(true)}
            disabled={hasAnswered}
          >
            🚨 SCAM
          </button>
        </div>

        {hasAnswered && (
          <>
            <p className={answerIsCorrect ? "result correct" : "result wrong"}>
              {answerIsCorrect
                ? "Correct! You earned 75 XP."
                : "Not quite. Learn the warning signs below."}
            </p>

            <p className="scam-explanation">{message.explanation}</p>

            <button className="next-button" onClick={onNext}>
              {messageNumber === totalMessages
                ? "FINISH MISSION"
                : "NEXT MESSAGE ▶"}
            </button>
          </>
        )}
      </section>
    </main>
  );
}