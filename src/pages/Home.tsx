import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { Categories } from "../components/Categories";
import { list, Sort } from "../components/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { PizzaBlockTypes, SearchContextTypes } from "../types";
import PizzaBlock from "../components/PizzaBlock";
import axios from "axios";
import { Pagination } from "../components/Pagination";
import { SearchContext } from "../App";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import qs from "qs";
import { useNavigate } from "react-router-dom";

export const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef<boolean>(false);
  const isMounted = useRef<boolean>(false);
  const [pizzas, setPizzas] = useState<PizzaBlockTypes[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { searchValue } = useContext<SearchContextTypes>(SearchContext);
  const { categoryId, sort, currentPage } = useAppSelector(
    (state) => state.filter
  );

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = async () => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    const res = await axios.get(
      `https://628d0524a3fd714fd03db9b7.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    setPizzas(res.data);
    setIsLoading(false);
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // Если был первый рендер, то проверяем URL-параметрыи сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
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
      <Pagination onChangePage={onChangePage} currentPage={currentPage} />
    </div>
  );
};
