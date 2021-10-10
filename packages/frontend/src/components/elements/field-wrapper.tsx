import { CSSProperties, ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { InfoCircle } from "@styled-icons/boxicons-regular";
import styled from "styled-components";
import { colors, fontSize, margins, spacing } from "../../theme/theme";

export const InputTypePatterns = {
  EMAIL: {
    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    message: "E-mail cím formátum kötelező",
  },
};

export interface FieldWrapperProps {
  name: string;
  value?: unknown;
  type?: string;
  label?: ReactNode;
  requiredErrorText?: string;
  onKeyPress?: (value: unknown) => void;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  optional?: boolean;
  placeholder?: string;
  noMargin?: boolean;
  autocomplete?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
}

export function FieldWrapper({
  requiredErrorText = "Kötelező",
  type = "text",
  ...props
}: FieldWrapperProps) {
  const methods = useFormContext();
  const {
    name,
    pattern,
    disabled,
    label,
    className,
    style,
    value,
    onKeyPress,
    placeholder,
    noMargin,
    autocomplete,
  } = props;
  return (
    <StyledFieldWrapper
      className={className}
      style={style}
      $noMargin={noMargin}
    >
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      <Field
        autoComplete={autocomplete}
        onKeyPress={onKeyPress}
        disabled={disabled}
        type={type}
        value={value as string}
        placeholder={placeholder}
        {...methods.register(name, {
          required: !props.optional && requiredErrorText,
          pattern: pattern,
        })}
      />
      <ErrorMessage
        errors={methods.formState.errors}
        name={name}
        render={({ message }) => (
          <ErrorMessageContainer>
            <InfoCircle />
            {message}
          </ErrorMessageContainer>
        )}
      />
    </StyledFieldWrapper>
  );
}

export const ErrorMessageContainer = styled.div`
  margin-top: ${margins.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.sm};
  border: 2px solid ${colors.danger};
  background-color: white;
  color: ${colors.danger};
  border-radius: 10px;
`;

export const Field = styled.input`
  -webkit-appearance: none;
  border-radius: 5px;
  padding: ${spacing.sm};
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: ${fontSize.sm};
  &[type="checkbox"] {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  :checked {
    background-color: ${colors.primary};
    :after {
      content: "";
      height: 15px;
      width: 10px;
      border-right: 2px solid white;
      border-bottom: 2px solid white;
      transform: translateY(-2px) rotate(45deg);
      z-index: 1;
    }
  }
`;

export const FieldLabel = styled.label`
  font-size: ${fontSize.sm};
  font-weight: lighter;
  display: block;
`;

export const TextArea = styled.textarea`
  -webkit-appearance: none;
  border-radius: 5px;
  padding: ${spacing.sm};
  border: 1px solid rgba(0, 0, 0, 0.3);
  resize: vertical;
  font-size: ${fontSize.sm};
`;

export const StyledFieldWrapper = styled.div<{ $noMargin?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  ${({ $noMargin }) =>
    !$noMargin && `margin: ${margins.xs}; > input {margin-top: ${margins.xs};}`}
`;

export const StyledDivider = styled.hr`
  border-radius: 40px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
`;
