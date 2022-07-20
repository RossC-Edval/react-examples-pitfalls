import { useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import { StyledColumnDiv } from "./StyledElements";

export function UseMemoExampleBad(): JSX.Element {
  const [inputText, setInputText] = useState<string>("");
  const [num, setNum] = useState<number>(0);
  /**
   * Notice that each time this component renders, we need to re-calculate the next five numbers from the
   * complex function below. Remember that the component will rerender whenever any dispatch action from useState
   * is called, so GenerateNextFiveNumbersComplex gets called even when we're only updating the value in the
   * name field, resulting in unnecessary computation when we know the result will be the same.
   */
  const nextNums = GenerateNextFiveNumbersComplex(num);

  return (
    <StyledColumnDiv>
      <h4>Enter your name:</h4>
      <Form.Control value={inputText} onChange={(e) => setInputText(e.target.value)} />

      <h4>Enter a number:</h4>
      <Form.Control type="number" value={num} onChange={(e) => setNum(Number(e.target.value))} />

      <h4>The next 5 numbers are:</h4>
      {nextNums.map((num, index) => {
        return <p key={index}>{num}</p>;
      })}
    </StyledColumnDiv>
  );
}

export function UseMemoExampleGood(): JSX.Element {
  const [inputText, setInputText] = useState("");
  const [num, setNum] = useState<number>(0);
  /**
   * useMemo takes a function which returns a value, and a dependency array. It'll call the function once when
   * the component first renders and returns the result, then it will only re-calculate a new value from the provided
   * function when one or more values in the dependency array change. In this case it will generate the next five numbers
   * once, and will only re-calculate them when 'num' in the dependency array changes. This is useful for when you might
   * have a complicated value you want to calculate once and retain through multiple renders.
   */
  const nextNums = useMemo(() => GenerateNextFiveNumbersComplex(num), [num]);

  return (
    <StyledColumnDiv>
      <h4>Enter your name:</h4>
      <Form.Control value={inputText} onChange={(e) => setInputText(e.target.value)} />

      <h4>Enter a number:</h4>
      <Form.Control type="number" value={num} onChange={(e) => setNum(Number(e.target.value))} />

      <h4>The next 5 numbers are:</h4>
      {nextNums.map((num, index) => {
        return <p key={index}>{num}</p>;
      })}
    </StyledColumnDiv>
  );
}

//Pretend this is a complicated function that takes a while to process the result.
//A result which you might not need to adjust very often, maybe only on user interaction.
function GenerateNextFiveNumbersComplex(num: number): number[] {
  console.log("Running the complicated data generation, this might take a second or two");
  for (let i = 0; i < 10000000; i++) {
    //assign a random array
    const a: number[] = [1, 2, 3];
    a[1] = 5;
  }

  return [num + 1, num + 2, num + 3, num + 4, num + 5];
}
