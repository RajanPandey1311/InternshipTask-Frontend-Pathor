"use client";
import { useState, useEffect } from "react";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const perPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${perPage}`
      );
      const data = await response.json();
      setUsers(data);
    };

    fetchData();
  }, [page]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`container p-20 ${darkMode ? "bg-black text-white" : ""}`}>
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold text-center mb-8">
          Top 5 Users List
        </h1>
        <button
          onClick={toggleDarkMode}
          className="px-2 py-2 rounded-full h-12 bg-stone-500 text-white"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={handleSearch}
          className="w-full px-4 py-2 rounded-lg shadow-lg bg-violet-50"
        />
      </div>

      <ul className="divide-y divide-gray-400">
        {filteredUsers.map((user) => (
          <li key={user.id} className="py-4">
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevPage}
          className={`px-4 py-2 rounded-lg ${
            page === 1
              ? "bg-lime-200 cursor-not-allowed"
              : "bg-teal-500 hover:bg-teal-600 text-white"
          }`}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-700 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
