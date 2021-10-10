import { Page } from "../containers/page-containers";
import { CenteredFlex } from "../containers/flex-containers";
import { Button, LinkButton } from "../elements/button";
import { colors } from "../../theme/theme";
import { Paths } from "../../utils/paths";
import { Actions, makeApiCall } from "../../utils/api";
import { useHistory } from "react-router-dom";

export function LogoutPage() {
  const history = useHistory();
  return (
    <Page>
      <CenteredFlex>
        <h1>Leállítás</h1>
        <h2>Biztosan le szeretnéd állítani a boostert?</h2>
        <CenteredFlex $direction="row">
          <Button
            $textColor="white"
            $background={colors.danger}
            onClick={() => {
              makeApiCall({
                action: Actions.STOP,
              })
                .then((result) => {
                  if (result.error) {
                    alert(result.error);
                  } else {
                    history.push(Paths.MAIN);
                  }
                })
                .catch((err) => {
                  alert(err);
                });
            }}
          >
            Igen
          </Button>
          <LinkButton
            $textColor={colors.danger}
            $background="white"
            to={Paths.MAIN}
          >
            Mégse
          </LinkButton>
        </CenteredFlex>
      </CenteredFlex>
    </Page>
  );
}
