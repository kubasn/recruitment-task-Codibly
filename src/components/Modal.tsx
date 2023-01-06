import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styled from "styled-components";

interface ItemProps {
  id?: number;
  name?: string;
  year?: number;
  color?: string;
  pantone_value?: string;
  setModal: (value: boolean) => void;
}

const Modal: React.FC<ItemProps> = ({
  id,
  name,
  year,
  color,
  pantone_value,
  setModal,
}) => {
  return (
    <Container>
      <CloseModal onClick={() => setModal(false)} />
      <div>
        <h2>Full information about item</h2>

        <TableModal>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Color</th>
            <th>Year</th>
            <th>Pantone value</th>
          </tr>
          <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{color}</td>
            <td>{year}</td>
            <td>{pantone_value}</td>
          </tr>
        </TableModal>
      </div>
    </Container>
  );
};

export default Modal;

const Container = styled.div`
  position: absolute;
  top: 10%;
  width: 90%;
  background-color: #faf8f8;
  height: 500px;
  z-index: 10;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const CloseModal = styled(AiOutlineCloseCircle)`
  position: absolute;
  font-size: 1.5rem;
  right: 15px;
  top: 15px;
  cursor: pointer;
  &:hover {
    color: #2b2b2b;
  }
`;

const TableModal = styled.table`
  margin-inline: auto;
  margin-top: 2.5rem;
  & > tr > td {
    padding: 0 15px;
  }
`;
