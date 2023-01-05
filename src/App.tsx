import React, { useEffect, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";

import styled from "styled-components";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchItems } from "./state/items/items.actions";
import { table } from "console";

interface Item {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

function App() {
  const newItems: any = useAppSelector((state) => state.items);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const [id, setId] = useState("");
  const [items, setItems] = useState(newItems.items);
  const [warning, setWarning] = useState(false);
  const [modal, setModal] = useState(false);
  const [itemModal, setItemModal] = useState<Item | null>(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(fetchItems({ page: "1" }));
  }, []);
  const onchangeItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWarning(false);
    if (/^\d+$/.test(value) || value == "") {
      setId(value);
      setSearchParams({ id: value });
    } else {
      setWarning(true);
    }
  };

  useEffect(() => {
    setItems(newItems.items);
  }, [newItems]);

  useEffect(() => {
    const page = searchParams.get("page");
    const id = searchParams.get("id");
    const perPage = searchParams.get("per_page");
    const params = { page, id, perPage };
    dispatch(fetchItems(params));
  }, [searchParams]);

  const handlePagination = (page: number) => {
    setPage(page);
    setSearchParams({ page: page.toString() });
  };

  const handleModal = (item: Item) => {
    setItemModal(item);
    setModal(true);
  };

  return (
    <Container className="App">
      <Top className="">
        <Input
          type="text"
          value={id}
          placeholder="Put id of item"
          onChange={onchangeItem}
        />
        {warning && <Warning>Insert number!</Warning>}
      </Top>
      <Body>
        {!items?.error && (
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {items && items?.data?.length > 5 ? (
                items.data.map((item: any) => (
                  <tr
                    key={item.id}
                    onClick={() => handleModal(item)}
                    style={{ backgroundColor: item.color, cursor: "pointer" }}
                  >
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.year}</td>
                  </tr>
                ))
              ) : items?.data?.id ? (
                <tr
                  onClick={() => handleModal(items)}
                  key={items.data.id}
                  style={{
                    backgroundColor: items.data.color,
                    cursor: "pointer",
                  }}
                >
                  <td>{items.data.id}</td>
                  <td>{items.data.name}</td>
                  <td>{items.data.year}</td>
                </tr>
              ) : (
                <td colSpan={3}>
                  <ItemInfo>
                    {newItems?.error ? newItems.error : "No items!"}
                  </ItemInfo>
                </td>
              )}
            </tbody>
          </Table>
        )}
        <Pagination>
          {page > 1 ? (
            <LeftArrow onClick={() => handlePagination(page - 1)} />
          ) : (
            <LeftArrow />
          )}
          <Span>{page}</Span>
          {items && items?.data?.length == 6 ? (
            <RightArrow onClick={() => handlePagination(page + 1)} />
          ) : (
            <RightArrow />
          )}
        </Pagination>
      </Body>
      {modal && (
        <Modal>
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
                <td>{itemModal?.id}</td>
                <td>{itemModal?.name}</td>
                <td>{itemModal?.color}</td>
                <td>{itemModal?.year}</td>
                <td>{itemModal?.pantone_value}</td>
              </tr>
            </TableModal>
          </div>
        </Modal>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  min-height: 100vh;
  background-image: linear-gradient(
    to bottom,
    #e6e6e7,
    #d8d8d9,
    #cacacb,
    #bdbcbd,
    #afafaf
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;

  & > ul,
  li {
    list-style-type: none;
  }
`;

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

const Body = styled.section`
  width: 60%;
  border-radius: 5px;

  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  margin: 10px 0;
  width: 90%;
  color: #e3e3e3;
  border: 1px solid #656565;

  & > thead {
    color: #656565;
  }
`;

const Pagination = styled.div`
  display: flex;
  font-size: 2rem;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const LeftArrow = styled(BsFillArrowLeftCircleFill)`
  color: #545454;
  cursor: pointer;
  &:hover {
    color: #3a3939;
  }
`;
const RightArrow = styled(BsFillArrowRightCircleFill)`
  color: #545454;
  cursor: pointer;
  &:hover {
    color: #3a3939;
  }
`;

const Span = styled.span`
  font-size: 1.5rem;
`;

const Modal = styled.div`
  position: absolute;
  top: 10%;
  width: 50%;
  background-color: #faf8f8;
  height: 500px;
  z-index: 10;
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

const ItemInfo = styled.p`
  width: 80%;
  font-size: 0.9rem;
  margin: 20px auto;

  background-color: #f2cc85;
  font-weight: 600;
  color: #d96704;
  padding: 5px 0px;
  border-radius: 10px;
`;

export default App;
