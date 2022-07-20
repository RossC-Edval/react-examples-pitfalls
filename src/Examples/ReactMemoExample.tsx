import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { StyledAdditionalDiv, StyledColumnDiv } from "./StyledElements";

const badTerms = ["bad", "terrible", "awful", "discouraging", "lousy", "atrocious", "slipshod"];

const goodTerms = ["good", "excellent", "great", "wonderful", "nice", "satisfactory", "marvelous"];

export function ReactMemoExampleBad(): JSX.Element {
  const [counter, setCounter] = useState(0);
  const [additionalComponentText, setAdditionalText] = useState(badTerms[0]);

  console.log(`Counter was initially set to zero, but it is now ${counter}.`);

  return (
    <StyledColumnDiv>
      <h2>{counter}</h2>
      <Button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Increment
      </Button>
      <Button
        onClick={() => {
          let newText = additionalComponentText;
          while (newText === additionalComponentText) {
            newText = badTerms[Math.floor(Math.random() * badTerms.length)];
          }
          setAdditionalText(newText);
        }}
      >
        Change additional component text
      </Button>
      <AdditionalComponentBad text={additionalComponentText} />
    </StyledColumnDiv>
  );
}

export function ReactMemoExampleGood(): JSX.Element {
  const [counter, setCounter] = useState(0);
  const [additionalComponentText, setAdditionalText] = useState(goodTerms[0]);

  console.log(`Good example parent component has rerendered, counter is currently ${counter}.`);

  return (
    <StyledColumnDiv>
      <h2>{counter}</h2>
      <Button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Increment
      </Button>
      <Button
        onClick={() => {
          let newText = additionalComponentText;
          while (newText === additionalComponentText) {
            newText = goodTerms[Math.floor(Math.random() * goodTerms.length)];
          }
          setAdditionalText(newText);
        }}
      >
        Change additional component text
      </Button>
      {/* The good and bad components are identical other than the good example making use of React.memo */}
      <AdditionalComponentGood text={additionalComponentText} />
    </StyledColumnDiv>
  );
}

type AdditionalProps = { text: string };

/**
 * This component will rerender each time its parent component rerenders.
 */
const AdditionalComponentBad = (props: AdditionalProps): JSX.Element => {
  console.log(`Rerendering the ${props.text} additional component.
Notice how this component re-renders each time the parent re-renders.
A parent rerendering will cause its children to rerender.`);

  return <StyledAdditionalDiv>The additional {props.text} component</StyledAdditionalDiv>;
};

/**
 * This component makes use of React.memo, which will cache the result of the function call, and will only re-compute
 * the output when the props have changed. For this example, it means that this component will only rerender when
 * the value of props.text updates. This will prevent unnecessary rerenders, although this is not necessary for very
 * lightweight components. Its main benefit is in larger, more complicated components.
 */
const AdditionalComponentGood = React.memo((props: AdditionalProps): JSX.Element => {
  console.log(`Rerendering the ${props.text} additional component.
Notice that this component only rerenders when the props (the text) changes.`);
  //Notice how this component does not rerender. This is because

  return <StyledAdditionalDiv>The additional {props.text} component</StyledAdditionalDiv>;
});
