import React, { useEffect, useState } from "react";
import "./scss/app.scss";
import { Header } from "./components/Header";
import { Categories } from "./components/Categories";
import { Sort } from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
import { PizzaBlockTypes } from "./types";
import axios from "axios";
import { Skeleton } from "./components/PizzaBlock/Skeleton";

function App() {
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
  }, []);

  return (
    <div className="wrapper">
      <div className="content">
        <Header />
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
      </div>
    </div>
  );
}

export default App;
