import React from "react";
import { createContext, useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { StyledAdditionalDiv, StyledColumnDiv } from "./StyledElements";

export function UseContextExampleBad(): JSX.Element {
  const [num, setNum] = useState(0);

  console.log("Logging parent component");
  return (
    <StyledColumnDiv>
      <b>Number value: {num}</b>
      <Layer1 num={num} setNum={setNum} />
    </StyledColumnDiv>
  );
}

type LayerProps = { num: number; setNum: React.Dispatch<React.SetStateAction<number>> };

const Layer1 = React.memo((props: LayerProps): JSX.Element => {
  console.log("Logging layer 1")
  return (
    <StyledAdditionalDiv>
      <Layer2 num={props.num} setNum={props.setNum} />
    </StyledAdditionalDiv>
  );
});

const Layer2 = React.memo((props: LayerProps): JSX.Element => {
  console.log("Logging layer 2")
  return (
    <StyledAdditionalDiv>
      <Layer3 num={props.num} setNum={props.setNum} />
    </StyledAdditionalDiv>
  );
});

const Layer3 = React.memo((props: LayerProps): JSX.Element => {
  console.log("Logging layer 4")
  return (
    <StyledAdditionalDiv>
      <Layer4 num={props.num} setNum={props.setNum} />
    </StyledAdditionalDiv>
  );
});

const Layer4 = React.memo((props: LayerProps): JSX.Element => {
  console.log("Logging layer 4")
  return (
    <div>
      <h3>Your number is:</h3>
      <p>{props.num}</p>
      <Button onClick={() => props.setNum((oldVal) => oldVal + 1)}>Increment</Button>
    </div>
  );
});


type ExampleContextType = {
  num: number;
  setNum: React.Dispatch<React.SetStateAction<number>>;
} | null;
const ExampleContext = createContext<ExampleContextType>(null);

export function UseContextExampleGood(): JSX.Element {
  const [num, setNum] = useState(0);

  console.log("Logging parent component");
  return (
    <ExampleContext.Provider value={{num:num, setNum:setNum}}>
    <StyledColumnDiv>
      <b>Number value: {num}</b>
      <Layer1good />
    </StyledColumnDiv>
    </ExampleContext.Provider>
  );
}


const Layer1good = React.memo((): JSX.Element => {
  console.log("Logging layer 1")
  return (
    <StyledAdditionalDiv>
      <Layer2good  />
    </StyledAdditionalDiv>
  );
});

const Layer2good = React.memo((): JSX.Element => {
  console.log("Logging layer 2")
  return (
    <StyledAdditionalDiv>
      <Layer3good />
    </StyledAdditionalDiv>
  );
})

const Layer3good = React.memo((): JSX.Element => {
  console.log("Logging layer 4")
  return (
    <StyledAdditionalDiv>
      <Layer4good />
    </StyledAdditionalDiv>
  );
})

const Layer4good = React.memo((): JSX.Element => {
  console.log("Logging layer 4")

  const numContext = useContext(ExampleContext);

  return (
    <div>
      <h3>Your number is:</h3>
      <p>{numContext?.num}</p>
      <Button onClick={() => numContext?.setNum((oldVal) => oldVal + 1)}>Increment</Button>
    </div>
  );
});
