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
  width: 20%;
  font-size: 0.9rem;
  margin: auto;
  background-color: #f2cc85;
  font-weight: 600;
  color: #d96704;
  display: block;
  padding: 5px 0px;
  border-radius: 10px;
`;

const Top = styled.section`
  margin-top: 2rem;
  width: 60%;
  margin-inline: auto;
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background-color: #f0f0f0;
`;

const Input = styled.input`
  background-color: white;
  text-align: center;
  width: 30%;
  border: 1px solid #656565;
  border-radius: 2px;
  padding: 2px;

  &::placeholder {
    color: #656565;
  }
`;

export default Header;
