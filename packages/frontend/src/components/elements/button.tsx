import styled from "styled-components";
import {
  animations,
  borderRadius,
  boxShadows,
  margins,
  spacing,
} from "../../theme/theme";
import { ReactNode } from "react";
import { useHistory } from "react-router-dom";
import { Trash } from "@styled-icons/boxicons-regular";

const ButtonBaseStyle = styled.button<{
  $background?: string;
  $textColor?: string;
}>`
  appearance: none;
  color: ${({ $textColor }) => $textColor || "black"};
  background: ${({ $background }) => $background || "white"};
  cursor: pointer;
  text-decoration: none;
  border: none;
  font-size: large;
  > * {
    height: 30px;
  }
  border-radius: ${borderRadius.sm};
`;

export const Button = styled(ButtonBaseStyle)`
  padding: ${spacing.md} ${spacing.lg};
  box-shadow: ${boxShadows.md};
  -webkit-box-shadow: ${boxShadows.md};
  -moz-box-shadow: ${boxShadows.md};
  ${animations.scale}
  margin:${margins.xs};
`;

export function LinkButton({
  to,
  children,
  $background,
  $textColor,
  className,
}: {
  to: string;
  children: ReactNode;
  $background?: string;
  $textColor?: string;
  className?: string;
}) {
  const history = useHistory();
  return (
    <Button
      className={className}
      onClick={() => {
        history.push(to);
      }}
      $background={$background}
      $textColor={$textColor}
    >
      {children}
    </Button>
  );
}

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: ${margins.sm} 0;
  width: 100%;
`;

export function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <ButtonBaseStyle $textColor="red" onClick={onClick} style={{ padding: 0 }}>
      <Trash />
    </ButtonBaseStyle>
  );
}
