import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { StyledColumnDiv } from "./StyledElements";

export function UseRefExampleBad(): JSX.Element {
  const [inputText, setInputText] = useState<string>("");
  //Note that because we're defining and initialising the variable in the function body of the react component
  //it will be re-initialised every time the component renders.
  let count = 0;

  return (
    <StyledColumnDiv>
      <h2>Enter some text</h2>
      <Form.Control
        value={inputText}
        id="test"
        onChange={(e) => {
          //The count will be incremented, but the count which is incremented is the one from the current render
          count++;
          //As soon as this setInputText function is run, the component will re-render and a new count will be initialised.
          setInputText(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          console.log(`%cInput has been edited ${count} times`, "font-weight: bold");
        }}
      >
        Log number of edits
      </Button>

      <Button
        onClick={() => {
          const textField = document.getElementById("test");
          if (textField !== null) {
            //Note, this is not how you should apply classes and styles to react components,
            //we're just doing it here as an example of the fact that you have access to the DOM element
            textField.className += " Test";
          }
        }}
      >
        Add css class to input
      </Button>
    </StyledColumnDiv>
  );
}

export function UseRefExampleGood(): JSX.Element {
  const [inputText, setInputText] = useState<string>("");
  /**
   * useRef will create an object containing a .current property. The object returned by a useRef call will remain the same
   * when the component re-renders, so it can be used to store persistent values that don't need to be rendered to the DOM
   * when they update. NOTE, updating a useRef value will NOT cause the react component to rerender since no dispatch action
   * occurs. It can be useful for storing state of a component without resorting to global variables.
   */
  const countRef = useRef(0);

  /**
   * The second use for useRef is to store a reference to an element when it is rendered without having to search the
   * DOM using getElementById. This can be used to find information about the dom elements, for example looking at their size,
   * or to perform operations on the elements, like scrolling them into view.
   */
  const fieldRef = useRef<HTMLInputElement | null>(null);

  return (
    <StyledColumnDiv>
      <h2>Enter some text</h2>
      <Form.Control
        ref={fieldRef}
        value={inputText}
        onChange={(e) => {
          countRef.current++;
          setInputText(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          console.log(`%cInput has been edited ${countRef.current} times`, "font-weight: bold");
        }}
      >
        Log number of edits
      </Button>

      <Button
        onClick={() => {
          if (fieldRef.current !== null) {
            //Note, this is not how you should apply classes and styles to react components,
            //we're just doing it here as an example of the fact that you have access to the DOM element
            fieldRef.current.className += " Test";
          }
        }}
      >
        Add css class to input
      </Button>
    </StyledColumnDiv>
  );
}
