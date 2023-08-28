import { Card, Typography } from "@mui/material";
import { useQuestionStore } from "./store/question";
import type { Question as QuestionType } from "./types";
import SyntaxHighLigther from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";


const Question = ({ info }: { info: QuestionType; }) => {
  return (
    <Card variant="outlined" sx={{ bgcolor: "#222", p: 2 }}>
      <Typography variant="h5">{info.question}</Typography>
      <SyntaxHighLigther
        language="javascript"
        style={gradientDark}
      >
        {info.code}
      </SyntaxHighLigther>
    </Card>
  );
};

export const Game = () => {
  const questions = useQuestionStore(state => state.questions);
  const currentQuestion = useQuestionStore(state => state.currentQuestion);

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Question info={questionInfo} />
    </>
  );
};
