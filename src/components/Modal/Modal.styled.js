import styled from 'styled-components';
import Modal from 'react-modal';

export const CustomModal = styled(Modal)`
  padding-top: 40px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;
