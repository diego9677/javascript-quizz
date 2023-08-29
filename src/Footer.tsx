import { Button } from "@mui/material";
import { useQuestionStore } from "./store/question";

const useQuestionsData = () => {
  const questions = useQuestionStore(state => state.questions);

  let correct = 0;
  let incorrect = 0;
  let unanswer = 0;

  questions.forEach(q => {
    const { userSelectedAnswer, correctAnswer } = q;
    if (userSelectedAnswer === undefined) unanswer++;
    if (userSelectedAnswer === correctAnswer) correct++;
    if (userSelectedAnswer !== correctAnswer) incorrect++;
  });

  return { correct, incorrect, unanswer };
};

export const Footer = () => {
  const { correct, incorrect, unanswer } = useQuestionsData();
  const reset = useQuestionStore(state => state.reset);

  return (
    <footer style={{ marginTop: "16px" }}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswer} sin responder`}</strong>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>
          Resetear juego
        </Button>
      </div>
    </footer>
  );
};
