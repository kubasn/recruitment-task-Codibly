import React from "react";
import styled from "styled-components";

interface HeaderProps {
  warning: boolean;
  onChangeItem: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const Header: React.FC<HeaderProps> = ({ warning, onChangeItem, id }) => {
  return (
    <Top className="">
      <Input
        type="text"
        value={id}
        placeholder="Put id of item"
        onChange={onChangeItem}
      />
      {warning && <Warning>Insert number!</Warning>}
    </Top>
  );
};

const Warning = styled.label`
  display: block;
  width: 20%;
  font-size: 0.9rem;
  margin: auto;
  background-color: #f2cc85;
  font-weight: 600;
  color: #d96704;
  padding: 5px 0px;
  border-radius: 10px;
`;

const Top = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 90%;
  margin-inline: auto;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 5px;
  gap: 0.5rem;
  background-color: #f0f0f0;

  @media (min-width: 576px) {
    width: 60%;
  }
`;

const Input = styled.input`
  width: 30%;
  padding: 2px;
  text-align: center;
  border: 1px solid #656565;
  border-radius: 2px;
  background-color: white;

  &::placeholder {
    color: #656565;
  }
`;

export default Header;
