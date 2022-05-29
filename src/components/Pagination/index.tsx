import React, { FC } from "react";
import ReactPaginate from "react-paginate";
// @ts-ignore
import styles from "./Pagination.module.scss";

interface Props {
  onChangePage: (number: number) => void;
  currentPage: number;
}

export const Pagination: FC<Props> = ({ onChangePage, currentPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      forcePage={currentPage - 1}
    />
  );
};
