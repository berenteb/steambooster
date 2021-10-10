import { Page } from "../containers/page-containers";
import { CenteredFlex, Flex } from "../containers/flex-containers";
import { Button, LinkButton } from "../elements/button";
import { colors } from "../../theme/theme";
import { Paths } from "../../utils/paths";
import { HookForm } from "../elements/hook-form";
import { FieldWrapper } from "../elements/field-wrapper";
import { Actions, makeApiCall } from "../../utils/api";
import { useHistory } from "react-router-dom";
import SteamLogo from "../../assets/steam.svg";
import { StyledImage } from "../elements/basic";
import { useState } from "react";
import { LoaderIcon } from "../elements/loader";

export function LoginPage() {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const onSubmit = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    makeApiCall({
      action: Actions.LOGIN,
      username: username,
      password: password,
    })
      .then((result) => {
        if (result.error) {
          setError(result.error);
        } else {
          if (result.steamGuardRequired) {
            history.push(Paths.GUARD);
          } else {
            history.push(Paths.MAIN);
          }
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
        <StyledImage src={SteamLogo} alt="Steam" />
        <h1>Bejelentkezés</h1>
        <HookForm onSubmit={onSubmit} error={error}>
          <CenteredFlex>
            <FieldWrapper
              autocomplete="username"
              placeholder="Karcsi"
              name="username"
              label="Felhasználónév"
            />
            <FieldWrapper
              autocomplete="current-password"
              placeholder="******"
              type="password"
              name="password"
              label="Jelszó"
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
