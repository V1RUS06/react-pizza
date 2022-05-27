import React, { createContext, useState } from "react";
import "./scss/app.scss";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Cart } from "./pages/Cart";
import { SearchContextTypes } from "./types";

export const SearchContext = createContext<SearchContextTypes>({});

function App() {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
