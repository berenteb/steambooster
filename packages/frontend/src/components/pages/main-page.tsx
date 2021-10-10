import { Page } from "../containers/page-containers";
import { CenteredFlex } from "../containers/flex-containers";
import { LinkButton } from "../elements/button";
import { colors } from "../../theme/theme";
import { Paths } from "../../utils/paths";
import { useEffect, useState } from "react";
import { Actions, makeApiCall } from "../../utils/api";
import { CheckCircle, X } from "styled-icons/boxicons-regular";
import styled from "styled-components";
import { ErrorMessageContainer } from "../elements/field-wrapper";
import { InfoCircle } from "@styled-icons/boxicons-regular";
import { getDisplayableErrorMessage } from "../elements/get-displayable-error-message";
import { LoadingPage } from "../elements/loader";

export function MainPage() {
  const [running, setRunning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  useEffect(() => {
    makeApiCall({
      action: Actions.STATUS,
    })
      .then((result) => {
        if (result.error) {
          setError(result.error);
        } else {
          setRunning(!!result.running);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return <LoadingPage />;
  return (
    <Page>
      <CenteredFlex>
        <h1>SteamBooster</h1>
        {error && (
          <ErrorMessageContainer>
            <InfoCircle />
            {getDisplayableErrorMessage(Error(error))}
          </ErrorMessageContainer>
        )}
        {running ? <StyledCheck /> : <StyledX />}
        <h2>{running ? "A booster aktív." : "A booster inaktív."}</h2>
        {running ? (
          <LinkButton
            $textColor="white"
            $background={colors.danger}
            to={Paths.LOGOUT}
          >
            Leállítás
          </LinkButton>
        ) : (
          <LinkButton
            $textColor="white"
            $background={colors.primary}
            to={Paths.LOGIN}
          >
            Bejelentkezés
          </LinkButton>
        )}
      </CenteredFlex>
    </Page>
  );
}

const StyledX = styled(X)`
  height: 100px;
  color: ${colors.danger};
`;

const StyledCheck = styled(CheckCircle)`
  height: 100px;
  color: ${colors.green};
`;
