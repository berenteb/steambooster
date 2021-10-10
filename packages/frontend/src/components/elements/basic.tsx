import styled from "styled-components";
import { borderRadius } from "../../theme/theme";

export const StyledImage = styled.img<{ $rounded?: boolean }>`
  max-height: 100px;
  height: auto;
  width: auto;
  margin: auto;
  ${({ $rounded }) => $rounded && `border-radius: ${borderRadius.lg};`}
`;
