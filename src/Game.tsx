import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { useQuestionStore } from "./store/question";
import type { Question as QuestionType } from "./types";
import SyntaxHighLigther from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer";

const getBgColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;
  if (userSelectedAnswer === undefined) return "transparent";
  if (index !== correctAnswer && index !== userSelectedAnswer) return "transparent";
  if (index === correctAnswer) return "green";
  if (index === userSelectedAnswer) return "red";

  return "transparent";
};

const Question = ({ info }: { info: QuestionType; }) => {
  const selectAnswer = useQuestionStore(state => state.selectAnswer);

  const handleClick = (answerIndex: number) => {
    selectAnswer(info.id, answerIndex);
  };

  return (
    <Card variant="outlined" sx={{ bgcolor: "#222", p: 2, textAlign: "left", marginTop: 4 }}>
      <Typography variant="h5">{info.question}</Typography>
      <SyntaxHighLigther
        language="javascript"
        style={gradientDark}
      >
        {info.code}
      </SyntaxHighLigther>

      <List sx={{ bgcolor: "#333" }} disablePadding>
        {info.answers.map((a, i) => (
          <ListItem key={i} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer !== undefined}
              onClick={() => handleClick(i)}
              sx={{ bgcolor: getBgColor(info, i) }}
            >
              <ListItemText primary={a} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export const Game = () => {
  const { currentQuestion, questions, goNextQuestion, goPreviousQuestion } = useQuestionStore(state => state);

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Stack direction={"row"} gap={2} alignItems={"center"} justifyContent={"center"}>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>

        {currentQuestion + 1} / {questions.length}

        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
};
