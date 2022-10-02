import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import SearchResult from "../components/SearchResult";

const SearchResultList = ({
  userList,
  query,
  setTotalSearch,
  currentPage,
  searchPerPage,
}) => {
  const filtered = userList.filter((user) => user.username.includes(query));
  setTotalSearch(filtered.length);

  if (filtered.length === 0) {
    return <h1>Tidak ditemukan user bernama {query}</h1>;
  }

  const sliceStart = (currentPage - 1) * 4;
  const sliceEnd = sliceStart + searchPerPage;

  const sliced = filtered.slice(sliceStart, sliceEnd);

  const result = sliced.map((user) => (
    <SearchResult key={user._id} user={user} />
  ));
  return result;
};

const Pagination = ({ setCurrentPage, totalPage }) => {
  const arr = Array.from({ length: totalPage }, (_, i) => i + 1);

  if (arr.length > 1)
    return (
      <div>
        {arr.map((num) => (
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </button>
        ))}
      </div>
    );
};

function SearchPage() {
  const searchPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalSearch, setTotalSearch] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  console.log(totalPage);

  useEffect(() => {
    setTotalPage(Math.ceil(totalSearch / searchPerPage));
  }, [totalSearch]);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const userList = useSelector((state) => state.user.userList);

  return (
    <main className="flex-center-center-column">
      <div className="search-query">
        {" "}
        <h3>Hasil Pencarian Untuk</h3>
        <h2>"{query}"</h2>
      </div>
      <SearchResultList
        userList={userList}
        query={query}
        setTotalSearch={setTotalSearch}
        currentPage={currentPage}
        searchPerPage={searchPerPage}
      />
      <Pagination setCurrentPage={setCurrentPage} totalPage={totalPage} />
    </main>
  );
}

export default SearchPage;
