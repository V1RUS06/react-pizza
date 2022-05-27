import React, { FC } from "react";
import ReactPaginate from "react-paginate";
// @ts-ignore
import styles from "./Pagination.module.scss";

interface Props {
  onChangePage: (number: number) => void;
}

export const Pagination: FC<Props> = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
    />
  );
};
