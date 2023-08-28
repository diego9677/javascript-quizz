import { Button } from "@mui/material";
import { useQuestionStore } from "./store/question";

export const Start = () => {
  const getData = useQuestionStore(state => state.fetchQuestions);

  const handleClick = () => {
    getData(10);
  };

  return (
    <Button type="button" variant="contained" onClick={handleClick}>
      ¡empezar!
    </Button>
  );
};
