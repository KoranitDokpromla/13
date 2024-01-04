import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";

function App() {
  const [searchText, setSearchText] = useState('')
  return (
    <>
      <h1>Search Products</h1>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <ProductList searchText={searchText} />
    </>
  )
};

export default App;