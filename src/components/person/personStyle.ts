import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 15px;
`;

export const PersonName = styled.div`
  width: 100%;
  height: 50px;
  background-color: #FFA500;
  margin-bottom: 15px;
  border-radius: 0 0 10px 10px;
  color: #000;
  font-family: Arial, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Item = styled.div`
  margin-bottom: 10px;
  color: #FFA500;
  font-family: Arial, sans-serif;
`;

export const List = styled.ul`
  padding-left: 0;
  margin-left: 0;
  list-style-type: none;
`;

export const ListItem = styled.li`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
`;

export const ButtonNext = styled.button`
  padding: 10px 20px;
  background-color: #FFA500;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 0;
  font-family: Arial, sans-serif;

  &:hover {
    background-color: #FF8C00;
  }
`;

export const ButtonBack = styled.button`
  padding: 10px 20px;
  background-color: #FFA500;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 0;
  font-family: Arial, sans-serif;

  &:hover {
    background-color: #FF8C00;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Loader = styled.div`
  border: 4px solid #f26d21;
  border-top: 4px solid transparent;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;
`;
