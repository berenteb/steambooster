import styled from "styled-components";
import { spacing } from "../../theme/theme";

export const Flex = styled.div<{
  $direction?: "row" | "column";
}>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction || "column"};
  width: 100%;
`;

export const CenteredFlex = styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 100%;
`;

export const SpacedFlex = styled(Flex)<{ $notAvailable?: boolean }>`
  justify-content: space-between;
  ${({ $notAvailable }) =>
    $notAvailable && `text-decoration: line-through red;`}
  * {
    margin: ${spacing.sm};
  }
  p:first-child {
    text-align: left;
  }
  p {
    text-align: center;
  }
  p:last-child {
    text-align: right;
  }
`;
