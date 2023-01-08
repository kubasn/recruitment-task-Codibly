import React from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import styled from "styled-components";

interface Item {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

interface MainProps {
  items: any;
  handleModal: (item: Item) => void;
  handlePagination: (page: number) => void;
  page: number;
  error: string;
  perPage: number;
}

const Main: React.FC<MainProps> = ({
  items,
  handleModal,
  handlePagination,
  page,
  perPage,
  error,
}) => {
  console.log(perPage);
  return (
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
            {items && items?.data?.length > 1 ? (
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
              // !items?.data && (
              <td colSpan={3}>
                <ItemInfo>{error ? error : "No items!"}</ItemInfo>
              </td>
              // )
            )}
          </tbody>
        </Table>
      )}
      <Pagination>
        {page > 1 ? (
          <LeftArrow onClick={() => handlePagination(page - 1)} />
        ) : (
          <LeftArrowDisabled />
        )}
        <Span>{page}</Span>
        {items?.data?.length == perPage && perPage > 1 ? (
          <RightArrow onClick={() => handlePagination(page + 1)} />
        ) : (
          <RightArrowDisabled />
        )}
      </Pagination>
    </Body>
  );
};

const Body = styled.section`
  width: 90%;
  border-radius: 5px;

  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 576px) {
    width: 60%;
  }
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
  text-align: center;
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

const LeftArrowDisabled = styled(BsFillArrowLeftCircleFill)`
  ${LeftArrow}
  cursor: default;
  color: #c9c9c9;
`;
const RightArrowDisabled = styled(BsFillArrowRightCircleFill)`
  ${RightArrow}
  cursor: default;
  color: #c9c9c9;
`;

const Span = styled.span`
  font-size: 1.5rem;
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

export default Main;
