import { useState } from "react";
import classnames from "classnames";
import styles from "./SearchForm.scss";

const cx = classnames.bind(styles);

function SearchForm({ fetchBookList }) {
  const [query, setQuery] = useState("");

  const handleChange = ({ target }) => {
    setQuery(target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    fetchBookList(query);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <fieldset className="fieldset">
        <legend className="a11y-hidden">검색 폼</legend>
        <label aria-label="검색어">
          <input
            id="search-term"
            type="search"
            className="search-term"
            autoComplete="off"
            value={query}
            onChange={handleChange}
          />
        </label>
        <button
          className={cx("icon-search", "search-btn")}
          type="submit"
          aria-label="검색"
        />
      </fieldset>
    </form>
  );
}

export default SearchForm;
