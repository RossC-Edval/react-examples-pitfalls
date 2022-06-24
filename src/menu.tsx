import { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { ContentShower } from "./ContentShower";
import { MenuSelector } from "./MenuSelector";

export enum MenuState {
  None,
  UseState,
  UseRef,
  UseMemo,
  ReactMemo,
  UseCallback,
}

export function Menu(): JSX.Element {
  const [menuState, setMenuState] = useState<MenuState>(MenuState.None);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <MenuSelector state={menuState} setState={setMenuState} />
        </Container>
      </Navbar>
      {menuState !== MenuState.None ? <ContentShower state={menuState} /> : null}
    </div>
  );
}
