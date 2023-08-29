import { Container, Stack, Typography } from "@mui/material";
import { JavascriptLogo } from "./JavascriptLogo";
import { Start } from "./Start";
import { useQuestionStore } from "./store/question";
import { Game } from "./Game";
import "./App.css";

function App() {
  const questions = useQuestionStore((state) => state.questions);

  return (
    <main>
      <Container maxWidth="sm">

        <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
          <JavascriptLogo />
          <Typography variant="h2" component="h1">
            JavaScript Quizz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}

      </Container>
    </main>
  );
}

export default App;
