import React, { useState } from "react";
import { Repo } from "../types";
import { formatNumber } from "../util";
import Pagination from "./Pagination";
import SearchForm from "./SearchForm";
import Table from "./Table";

const App = () => {
  const [repos, setRepos] = useState<{
    items: Repo[];
    totalCount: number;
    links: { [k: string]: string };
    currentPage: string;
  }>({
    items: [],
    totalCount: 0,
    links: {},
    currentPage: null
  });

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="uk-container">
      <header>
        <h1>Github repo search</h1>
      </header>
      <SearchForm setRepos={setRepos} setIsLoading={setIsLoading} />
      <h2 style={{ marginTop: 0 }}>Results</h2>
      <div>Total Count: {formatNumber(repos.totalCount)}</div>
      <Table repos={repos.items} />
      {repos.currentPage && (
        <div style={{ textAlign: "center" }}>
          Current Page: {repos.currentPage}
        </div>
      )}
      {repos.items.length > 0 && (
        <Pagination
          prev={repos.links.prev}
          next={repos.links.next}
          setRepos={setRepos}
          setIsLoading={setIsLoading}
        />
      )}
      <footer className="uk-position-fixed uk-position-bottom uk-text-center uk-background-secondary">
        Made by Dusan Jovanov 💻
      </footer>
      <Loading isVisible={isLoading} />
    </div>
  );
};

export default App;

const Loading = ({ isVisible }) => (
  <div
    className="lds-ring"
    style={{ visibility: isVisible ? "visible" : "hidden" }}
  >
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
