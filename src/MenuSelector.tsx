import { useCallback } from "react";
import { Button } from "react-bootstrap";
import { MenuState } from "./menu";
import styled from "styled-components";

type MenuSelectorProps = {
  state: MenuState;
  setState: React.Dispatch<React.SetStateAction<MenuState>>;
};

export function MenuSelector(props: MenuSelectorProps): JSX.Element {
  return (
    <div
      onClick={(event) => {
        console.log(event);
      }}
    >
      <MenuButton text={"Menu"} selectedState={props.state} stateToSet={MenuState.None} setState={props.setState} />
      <MenuButton text={"useState()"} selectedState={props.state} stateToSet={MenuState.UseState} setState={props.setState} />
      <MenuButton text={"React.Memo()"} selectedState={props.state} stateToSet={MenuState.ReactMemo} setState={props.setState} />
      <MenuButton text={"useMemo()"} selectedState={props.state} stateToSet={MenuState.UseMemo} setState={props.setState} />
      <MenuButton text={"useCallback()"} selectedState={props.state} stateToSet={MenuState.UseCallback} setState={props.setState} />
      <MenuButton text={"useRef()"} selectedState={props.state} stateToSet={MenuState.UseRef} setState={props.setState} />
      <MenuButton text={"useContext()"} selectedState={props.state} stateToSet={MenuState.UseContext} setState={props.setState} />
    </div>
  );
}

const StyledButton = styled(Button)`
  margin: 0px 2px;
`;

type MenuButtonProps = {
  selectedState: MenuState;
  text: string;
  stateToSet: MenuState;
  setState: React.Dispatch<React.SetStateAction<MenuState>>;
};
function MenuButton({ selectedState, text, stateToSet, setState }: MenuButtonProps): JSX.Element {
  const onClick = useCallback(() => {
    console.clear();
    setState(stateToSet);
  }, [stateToSet, setState]);
  return (
    <StyledButton variant={selectedState === stateToSet ? "primary" : "outline-primary"} onClick={onClick}>
      {text}
    </StyledButton>
  );
}
