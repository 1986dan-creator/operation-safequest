type QuizQuestion = {
  question: string;
  answers: string[];
 correctAnswer: number;
explanation: string;
};

type QuizScreenProps = {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
score: number;
timeLeft: number;
timeUp: boolean;
selectedAnswer: number | null;
  hasAnswered: boolean;
  onChooseAnswer: (answerIndex: number) => void;
  onNext: () => void;
};

export function QuizScreen({
  question,
  questionNumber,
  totalQuestions,
score,
timeLeft,
timeUp,
selectedAnswer,
  hasAnswered,
  onChooseAnswer,
  onNext,
}: QuizScreenProps) {
  const answerIsCorrect = selectedAnswer === question.correctAnswer;

  return (
    <main className="quiz-screen">
      <section className="quiz-card">
        <p className="section-label">
          QUIZ RUSH · QUESTION {questionNumber} OF {totalQuestions}
        </p>

        <h1>⚡ Quiz Rush</h1>
        <p className="quiz-score">Current score: {score} XP</p>
<p
  className={
    timeLeft <= 5
      ? "quiz-timer quiz-timer-warning"
      : "quiz-timer"
  }
>
  ⏱️ {timeLeft} seconds left
</p>
        <h2>{question.question}</h2>

        <div className="answer-list">
          {question.answers.map((answer, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;

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
{timeUp
  ? "Time's up! Remember the answer for next time."
  : answerIsCorrect
    ? "Correct! You earned 50 XP."
    : "Not quite—remember this for next time."}
            </p>

<p className="quiz-explanation">
  💡 {question.explanation}
</p>

            <button className="next-button" onClick={onNext}>
              {questionNumber === totalQuestions
                ? "FINISH QUIZ"
                : "NEXT QUESTION ▶"}
            </button>
          </>
        )}
      </section>
    </main>
  );
}