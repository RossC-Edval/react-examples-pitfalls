import { ReactNode } from "react";
import styled from "styled-components";

type StyledColumnDivProps = {
  children: ReactNode | ReactNode[];
};
export const StyledColumnDiv = styled.div<StyledColumnDivProps>`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;
