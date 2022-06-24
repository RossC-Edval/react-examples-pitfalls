import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

export const StyledColumnDiv = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export function UseStateExampleBad(): JSX.Element {
  let counter = 0;
  console.log(`Assigning counter initially to zero!`);

  //Notice how the console.log above does not repeat when the button is pressed.
  //This is because the component will only rerender if its props change, or if a react
  //dispatch action occurs.

  return (
    <StyledColumnDiv>
      <h2>{counter}</h2>
      <Button
        onClick={() => {
          console.log(`Counter in bad example is now ${counter}`);
          counter++;
        }}
      >
        Increment
      </Button>
    </StyledColumnDiv>
  );
}

export function UseStateExampleGood(): JSX.Element {
  //useState creates a state variable and a setter function which will persist between component re-renders.
  //The first variable counter is the persistent variable, setCounter is a function to update the value.
  //Calling this setter function causes the component to rerender.
  const [counter, setCounter] = useState(0);

  console.log(
    `Counter was initially set to zero, but it is now ${counter}.
Notice how this line logs each time the button is pressed.
This is because the component has rerendered due to using a react set state (Dispatch) action.`
  );

  return (
    <StyledColumnDiv>
      <h2>{counter}</h2>
      <Button
        onClick={() => {
          console.log(`Counter in good example is now ${counter}`);
          setCounter(counter + 1);
        }}
      >
        Increment
      </Button>
    </StyledColumnDiv>
  );
}
