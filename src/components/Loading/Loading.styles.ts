import styled, { keyframes } from 'styled-components';

export const LoaderContainer = styled.div`
  width: 50vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  0% { 
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg); 
  }
  100% { 
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg); 
  }
`;

export const Spinner = styled.div`
  border: 12px solid #f4f4f4;
  border-radius: 50%;
  border-top: 12px solid black;
  width: 120px;
  height: 120px;
  -webkit-animation: ${spin} 1.2s linear infinite;
  animation: ${spin} 1.2s linear infinite;
`;
