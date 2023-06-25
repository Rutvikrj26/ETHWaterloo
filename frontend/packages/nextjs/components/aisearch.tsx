// Frontend form to submit a search query to the backend:
// recieves a list of 10 json objects to be displayed in a grod format. 

import React, { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "@components/MetaHeader";

const AiSearch = () => {
  const [search_query, setSearchQuery] = useState("");
  const [aiData, setAiData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/ai_search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search_query }),
      });
      const data = await res.json();
      console.log(data);
      setAiData(JSON.stringify(data, null, 2));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MetaHeader title="AI Search" />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <h1 className="text-6xl font-bold">
              <span className="text-blue-600">AI</span> Search
            </h1>
            <p className="mt-3 text-2xl">
              Search for a token by its attributes.
            </p>
            <form
              className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center"
              onSubmit={handleSubmit}
            >
              <input
                className="border border-black-300 rounded-md px-4 py-2 m-2 w-1/2"
                type="text"
                name="search_query"
                placeholder="Search Query"
                value={search_query}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="border border-black-300 rounded-md px-4 py-2 m-2 w-1/2"
                type="submit"
              >
                Search
              </button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {aiData && (
              <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <pre className="text-left">{aiData}</pre>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default AiSearch;