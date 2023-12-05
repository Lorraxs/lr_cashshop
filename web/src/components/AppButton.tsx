import { Box } from 'lr-components';
import styled from 'styled-components';

const AppButton = styled(Box)<{ active?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${(props) =>
    props.active
      ? `linear-gradient(
      100deg,
      rgba(143, 76, 254, 1) 0%,
      rgba(70, 112, 249, 1) 100%
    )`
      : `linear-gradient(
    100deg,
    rgba(143, 76, 254, 0.4) 0%,
    rgba(70, 112, 249, 0.4) 100%
  )`};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: linear-gradient(
      100deg,
      rgba(143, 76, 254, 1) 0%,
      rgba(70, 112, 249, 1) 100%
    );
  }
`;

export default AppButton;
