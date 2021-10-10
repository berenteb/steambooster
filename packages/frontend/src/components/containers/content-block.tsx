import styled from "styled-components";
import { margins } from "../../theme/theme";

export const ContentBlockWrapper = styled.div<{
  $noVerticalMargin?: boolean;
  $background?: string;
  $darkenBackground?: boolean;
  $fullHeight?: boolean;
}>`
  padding: ${({ $noVerticalMargin }) => ($noVerticalMargin ? 0 : margins.md)}
    ${margins.md};
  ${({ $background }) => $background && `background: ${$background};`}
  ${({ $fullHeight }) => $fullHeight && `min-height:100vh;`}
  ${({ $darkenBackground }) =>
    $darkenBackground && `background-color: rgba(0,0,0,0.7);`}
  max-width: 100%;
  background-position: center;
  background-size: cover;
  margin: auto;
`;

export const ImageBlockWrapper = styled(ContentBlockWrapper)<{
  $imageUrl: string;
  $darken?: boolean;
  $fullHeight?: boolean;
}>`
  background: ${({ $darken }) =>
      $darken && "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),"}
    url(${(props) => props.$imageUrl});
  background-repeat: no-repeat;
  ${({ $darken }) => $darken && `color: white;`}
  background-size: cover;
  background-position: center;
  background-color: white;
  ${({ $fullHeight }) => $fullHeight && `min-height: 100vh`}
`;
