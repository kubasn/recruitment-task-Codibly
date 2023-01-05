import React, { useEffect, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useSearchParams } from "react-router-dom";

import styled from "styled-components";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchItems } from "./state/items/items.actions";

function App() {
  const newItems: any = useAppSelector((state) => state.items);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const [id, setId] = useState("");
  const [items, setItems] = useState(newItems.items);
  const [warning, setWarning] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(fetchItems({ page: "1" }));
  }, []);
  console.log(items);
  const onchangeItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value, typeof value === "number");
    setWarning(false);
    if (/^\d+$/.test(value) || value == "") {
      setId(value);
      setSearchParams({ id: value });
    } else {
      setWarning(true);
    }
  };

  useEffect(() => {
    console.log("ello");
    setItems(newItems.items);
    console.log(items);
  }, [newItems]);

  useEffect(() => {
    const page = searchParams.get("page");
    const id = searchParams.get("id");
    const perPage = searchParams.get("per_page");
    const params = { page, id, perPage };
    console.log(params);
    dispatch(fetchItems(params));
  }, [searchParams]);

  const handlePagination = (page: number) => {
    setPage(page);
    setSearchParams({ page: page.toString() });
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
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {items && items.data.length > 1 ? (
              items.data.map((item: any) => (
                <tr key={item.id} style={{ backgroundColor: item.color }}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.year}</td>
                </tr>
              ))
            ) : items ? (
              <tr
                key={items.data.id}
                style={{ backgroundColor: items.data.color }}
              >
                <td>{items.data.id}</td>
                <td>{items.data.name}</td>
                <td>{items.data.year}</td>
              </tr>
            ) : (
              <p>brak itemu</p>
            )}
          </tbody>
        </Table>
        <Pagination>
          {page > 1 ? (
            <LeftArrow onClick={() => handlePagination(page - 1)} />
          ) : (
            <LeftArrow />
          )}
          <Span>{page}</Span>
          {items && items.data.length == 6 ? (
            <RightArrow onClick={() => handlePagination(page + 1)} />
          ) : (
            <RightArrow />
          )}
        </Pagination>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  min-height: 100vh;
  background-color: #ffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
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
  border: 1px solid #bfbfbf;
  border-radius: 2px;
  padding: 2px;
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

export default App;
