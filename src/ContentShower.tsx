import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { ReactMemoExampleBad, ReactMemoExampleGood } from "./Examples/ReactMemoExample";
import { UseMemoExampleBad, UseMemoExampleGood } from "./Examples/useMemoExample";
import { UseStateExampleBad, UseStateExampleGood } from "./Examples/UseStateExample";
import { MenuState } from "./menu";

const StyledContainer = styled(Container)``;

const StyledCol = styled(Col)`
  background-color: #47b5ff;
  border: 8px solid #1363df;
  margin: 5px;
  min-height: 150px;
  padding: unset;
  border-radius: 20px;
`;

type ContentShowerProps = { state: MenuState };
export function ContentShower(props: ContentShowerProps): JSX.Element {
  let badExample = null;
  let goodExample = null;

  switch (props.state) {
    case MenuState.UseState:
      badExample = <UseStateExampleBad />;
      goodExample = <UseStateExampleGood />;
      break;
    case MenuState.ReactMemo:
      badExample = <ReactMemoExampleBad />;
      goodExample = <ReactMemoExampleGood />;
      break;
    case MenuState.UseMemo:
      badExample = <UseMemoExampleBad />;
      goodExample = <UseMemoExampleGood />;
      break;
    default:
      console.log("Not implemented yet");
      break;
  }
  return (
    <StyledContainer>
      <Row>
        <ContentBox title={"Bad Example"}>{badExample}</ContentBox>
        <ContentBox title={"Good Example"}>{goodExample}</ContentBox>
      </Row>
    </StyledContainer>
  );
}

const StyledTitle = styled.div`
  background-color: #1363df;
  padding: 5px 12px;
  width: 100%;
`;

const ContentDiv = styled.div`
  padding: 10px;
`;

type ContentBoxProps = {
  children: JSX.Element | string | null | number;
  title: string;
};
function ContentBox(props: ContentBoxProps): JSX.Element {
  return (
    <StyledCol>
      <StyledTitle>
        <h1>{props.title}</h1>
      </StyledTitle>
      <ContentDiv>{props.children}</ContentDiv>
    </StyledCol>
  );
}
