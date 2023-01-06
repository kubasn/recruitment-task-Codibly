import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import styled from "styled-components";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchItems } from "./state/items/items.actions";
import Modal from "./components/Modal";
import Main from "./components/Main";
import Header from "./components/Header";

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
  const onChangeItem = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <Header warning={warning} onChangeItem={onChangeItem} id={id}></Header>
      <Main
        items={items}
        handleModal={handleModal}
        page={page}
        error={newItems?.error}
        handlePagination={handlePagination}
      />

      {modal && <Modal {...itemModal} setModal={setModal} />}
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

export default App;
