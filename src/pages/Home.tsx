import React, { useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { PizzaBlockTypes } from "../types";
import PizzaBlock from "../components/PizzaBlock";
import axios from "axios";

export const Home = () => {
  const [pizzas, setPizzas] = useState<PizzaBlockTypes[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPizzas = async () => {
      const res = await axios.get(
        "https://628d0524a3fd714fd03db9b7.mockapi.io/items"
      );
      setPizzas(res.data);
      setIsLoading(false);
    };
    fetchPizzas();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((obj: PizzaBlockTypes) => (
              <PizzaBlock {...obj} key={obj.id} />
            ))}
      </div>
    </div>
  );
};
