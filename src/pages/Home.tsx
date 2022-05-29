import React, { FC, useContext, useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { PizzaBlockTypes, SearchContextTypes } from "../types";
import PizzaBlock from "../components/PizzaBlock";
import axios from "axios";
import { Pagination } from "../components/Pagination";
import { SearchContext } from "../App";
import { setCategoryId } from "../redux/slices/filterSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

export const Home: FC = () => {
  const dispatch = useAppDispatch();
  const [pizzas, setPizzas] = useState<PizzaBlockTypes[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { searchValue } = useContext<SearchContextTypes>(SearchContext);
  const { categoryId, sort} = useAppSelector((state) => state.filter);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    const fetchPizzas = async () => {
      const res = await axios.get(
        `https://628d0524a3fd714fd03db9b7.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      );
      setPizzas(res.data);
      setIsLoading(false);
    };
    fetchPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzasList = pizzas.map((obj: PizzaBlockTypes) => (
    <PizzaBlock {...obj} key={obj.id} />
  ));
  const skeletons = [...Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          onCategoriesClick={(i) => onChangeCategory(i)}
          value={categoryId}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzasList}</div>
      <Pagination onChangePage={(number: number) => setCurrentPage(number)} />
    </div>
  );
};
