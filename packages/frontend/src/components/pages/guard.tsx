import { Page } from "../containers/page-containers";
import { CenteredFlex, Flex } from "../containers/flex-containers";
import { Button, LinkButton } from "../elements/button";
import { colors } from "../../theme/theme";
import { Paths } from "../../utils/paths";
import { HookForm } from "../elements/hook-form";
import { FieldWrapper } from "../elements/field-wrapper";
import { Actions, makeApiCall } from "../../utils/api";
import { useHistory } from "react-router-dom";
import { LoaderIcon } from "../elements/loader";
import { useState } from "react";

export function GuardPage() {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const onSubmit = ({
    username,
    password,
    guard,
  }: {
    username: string;
    password: string;
    guard: string;
  }) => {
    setLoading(true);
    makeApiCall({
      action: Actions.GUARD,
      username: username,
      password: password,
      steamGuard: guard,
    })
      .then((result) => {
        if (result.error) {
          setError(result.error);
        } else {
          history.push(Paths.MAIN);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Page>
      <CenteredFlex>
        <h1>Steam Guard</h1>
        <HookForm onSubmit={onSubmit} error={error}>
          <CenteredFlex>
            <FieldWrapper
              name="guard"
              label="Steam Guard kód"
              placeholder="ABC123"
            />
            {loading ? (
              <LoaderIcon />
            ) : (
              <Flex>
                <Button
                  $textColor="white"
                  $background={colors.primary}
                  type="submit"
                >
                  Bejelentkezés
                </Button>
                <LinkButton
                  $textColor={colors.primary}
                  $background="white"
                  to={Paths.MAIN}
                >
                  Főoldal
                </LinkButton>
              </Flex>
            )}
          </CenteredFlex>
        </HookForm>
      </CenteredFlex>
    </Page>
  );
}
