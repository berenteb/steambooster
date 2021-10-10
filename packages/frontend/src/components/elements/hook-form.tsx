import {
  FormProvider,
  Path,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { ReactNode, useEffect } from "react";
import styled from "styled-components";
import { getDisplayableErrorMessage } from "./get-displayable-error-message";
import { spacing } from "../../theme/theme";
import { ErrorMessageContainer } from "./field-wrapper";
import { InfoCircle } from "@styled-icons/boxicons-regular";

export interface HookFormProps<TValues> extends UseFormProps<TValues> {
  onSubmit?: (values: TValues) => void;
  children?: ReactNode;
  watchDefaultValues?: boolean;
  error?: string;
}

export function HookForm<TValues>({
  onSubmit = () => {},
  children,
  watchDefaultValues = false,
  error,
  ...props
}: HookFormProps<TValues>) {
  const methods = useForm<TValues>({
    ...props,
  });
  useEffect(() => {
    if (watchDefaultValues) {
      methods.reset(props.defaultValues);
    }
  }, [methods, props.defaultValues, watchDefaultValues]);
  return (
    <FormProvider {...methods}>
      <StyledHookForm
        onSubmit={methods.handleSubmit((values) =>
          onSubmitHandler(values as TValues, methods, onSubmit)
        )}
      >
        {error && (
          <ErrorMessageContainer>
            <InfoCircle />
            {getDisplayableErrorMessage(Error(error))}
          </ErrorMessageContainer>
        )}
        {children}
      </StyledHookForm>
    </FormProvider>
  );
}

export const StyledHookForm = styled.form`
  width: 100%;
  max-width: 300px;
  padding: ${spacing.sm};
`;

async function onSubmitHandler<Values>(
  values: Values,
  methods: UseFormReturn<Values>,
  onSubmit: (values: Values) => void | Promise<void>
) {
  try {
    await onSubmit(values);
  } catch (error) {
    console.error(error);
    methods.setError("submit" as Path<Values>, {
      type: "submit",
      message: getDisplayableErrorMessage(error as Error),
    });
  }
}
