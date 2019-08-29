import React, { useState } from "react";
import { search } from "../util";
import licences from "../licences";

const SearchForm = ({ setRepos, setIsLoading }) => {
  const [form, setValue] = useState({
    query: "",
    stars: "",
    license: "",
    isFork: false
  });

  const [errors, setErrors] = useState({
    query: "",
    stars: "",
    license: ""
  });

  const onClickSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    const newErrors = { query: null, stars: null };
    let hasErrors = false;
    // validation
    if (form.query === "") {
      newErrors.query = "Field is required";
      hasErrors = true;
    }
    if (form.stars !== "") {
      const isValid = /^(<|>|<=|>=)*\d+$/.test(form.stars.trim());
      if (!isValid) {
        newErrors.stars = "Format is wrong. (<2, >=5, 100)";
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setErrors({ ...errors, ...newErrors });
    } else {
      setErrors({ query: "", stars: "", license: "" });
      setIsLoading(true);
      search(form)
        .then(setRepos)
        .then(() => setIsLoading(false));
    }
  };

  return (
    <div className="uk-margin">
      <form uk-grid="true" className="uk-grid-small">
        <div className="uk-width-1-1 uk-width-1-3@s">
          <label className="uk-form-label" htmlFor="search-query">
            Repo Name: (*️)
          </label>
          <div className="uk-form-controls">
            <input
              id="search-query"
              className="uk-input"
              type="text"
              value={form.query}
              placeholder="react, angular, vue..."
              onChange={e => setValue({ ...form, query: e.target.value })}
            />
          </div>
          <div className="uk-text-danger">{errors.query}</div>
        </div>
        <div className="uk-width-1-1 uk-width-1-3@s">
          <label htmlFor="search-stars" className="uk-form-label">
            Stars:{" "}
          </label>
          <div className="uk-form-controls">
            <input
              id="search-stars"
              className="uk-input"
              type="text"
              value={form.stars}
              placeholder="200, >1000, <=500..."
              onChange={e => setValue({ ...form, stars: e.target.value })}
            />
          </div>
          <div className="uk-text-danger">{errors.stars}</div>
        </div>
        <div className="uk-width-1-1 uk-width-1-3@s">
          <label htmlFor="search-license" className="uk-form-label">
            License:
          </label>
          <div className="uk-form-controls">
            <select
              id="search-license"
              className="uk-select"
              value={form.license}
              onChange={e => setValue({ ...form, license: e.target.value })}
            >
              <option value="">Choose a license</option>
              {licences.map(l => (
                <option key={l.key} value={l.key}>
                  {l.name}
                </option>
              ))}
            </select>
            <div className="uk-text-danger">{errors.license}</div>
          </div>
        </div>
        <div className="uk-width-1-1">
          <label htmlFor="search-fork" className="uk-form-label">
            Include forks:
          </label>
          <div className="uk-form-controls">
            <input
              className="uk-checkbox"
              type="checkbox"
              id="search-fork"
              checked={form.isFork}
              onChange={e => setValue({ ...form, isFork: e.target.checked })}
            />
          </div>
        </div>
        <div>
          <button
            className="uk-button uk-button-primary"
            onClick={onClickSearch}
          >
            Search 🔎
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
