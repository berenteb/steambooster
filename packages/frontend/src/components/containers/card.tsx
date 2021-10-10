import styled from "styled-components";
import { borderRadius, boxShadows, spacing } from "../../theme/theme";

export const Card = styled.div`
  border-radius: ${borderRadius.lg};
  box-shadow: ${boxShadows.md};
  -webkit-box-shadow: ${boxShadows.md};
  -moz-box-shadow: ${boxShadows.md};
  padding: ${spacing.lg};
  max-width: 100%;
`;
