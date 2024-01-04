import React, { useEffect, useState } from 'react';

export default function ProductList(props) {
  const { searchText } = props;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let debounceTimer;

    const fetchData = async () => {
      try {
        const response = await fetch(`https:dummyjson.com/products/search?q=${searchText}&page=${currentPage}`);
        const result = await response.json();
        setData(result.products || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const debounceSearch = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        fetchData();
      }, 1000); // 1 second delay
    };

    debounceSearch();

    return () => clearTimeout(debounceTimer);

  }, [searchText, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="product-list">
      <ul>
        {visibleData.map((el) => (
          <li key={el.id}>
            {el.title}, {el.price}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span> page {currentPage} </span>
        <button onClick={handleNextPage} disabled={data.length <= startIndex + itemsPerPage}>
          Next
        </button>
      </div>
    </div>
  );
}