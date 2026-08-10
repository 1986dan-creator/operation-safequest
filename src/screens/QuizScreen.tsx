type QuizQuestion = {
  question: string;
  answers: string[];
  correctAnswer: number;
};

type QuizScreenProps = {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  score: number;
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
              {answerIsCorrect
                ? "Correct! You earned 50 XP."
                : "Not quite—remember this for next time."}
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