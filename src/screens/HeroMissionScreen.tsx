type HeroChallenge = {
  scenario: string;
  answers: string[];
  correctAnswer: number;
  explanation: string;
};

type HeroMissionScreenProps = {
  challenge: HeroChallenge;
  challengeNumber: number;
  totalChallenges: number;
  score: number;
  selectedAnswer: number | null;
  hasAnswered: boolean;
  onChooseAnswer: (answerIndex: number) => void;
  onNext: () => void;
};

export function HeroMissionScreen({
  challenge,
  challengeNumber,
  totalChallenges,
  score,
  selectedAnswer,
  hasAnswered,
  onChooseAnswer,
  onNext,
}: HeroMissionScreenProps) {
  const answerIsCorrect = selectedAnswer === challenge.correctAnswer;

  return (
    <main className="hero-screen">
      <section className="hero-card">
        <p className="section-label">
          DIGITAL DEFENDER · DECISION {challengeNumber} OF {totalChallenges}
        </p>

        <h1>🏆 Digital Defender</h1>
        <p className="quiz-score">Current score: {score} XP</p>

        <div className="hero-scenario">{challenge.scenario}</div>

        <div className="answer-list">
          {challenge.answers.map((answer, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === challenge.correctAnswer;

            let answerClass = "answer-button";

            if (hasAnswered && isCorrect) {
              answerClass += " answer-correct";
            } else if (hasAnswered && isSelected) {
              answerClass += " answer-wrong";
            }

            return (
              <button
                key={answer}
                className={answerClass}
                onClick={() => onChooseAnswer(index)}
                disabled={hasAnswered}
              >
                {answer}
              </button>
            );
          })}
        </div>

        {hasAnswered && (
          <>
            <p className={answerIsCorrect ? "result correct" : "result wrong"}>
              {answerIsCorrect
                ? "Excellent decision! You earned 125 XP."
                : "Not quite. Read the safety advice below."}
            </p>

            <p className="scam-explanation">{challenge.explanation}</p>

            <button className="next-button" onClick={onNext}>
              {challengeNumber === totalChallenges
                ? "FINISH HERO MISSION"
                : "NEXT DECISION ▶"}
            </button>
          </>
        )}
      </section>
    </main>
  );
}