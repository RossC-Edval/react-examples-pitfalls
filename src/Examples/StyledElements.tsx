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

export const StyledAdditionalDiv = styled.div<StyledColumnDivProps>`
  background-color: #dff6ff;
  border: 4px solid white;
  border-radius: 10px;
  margin: 15px;
  padding: 10px;
`;
