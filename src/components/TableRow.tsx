import React from "react";
import colors from "../lang_colors.json";
import { formatNumber } from "../util";
import { Repo } from "../types";

type Props = {
  repo: Repo;
};

const TableRow = ({ repo }: Props) => {
  return (
    <tr>
      <td className="uk-table-expand" uk-accordion="true">
        <div>
          <span className="uk-text uk-accordion-title">{repo.full_name}</span>
          <div className="uk-accordion-content">{repo.description}</div>
        </div>
      </td>
      <td>
        {" "}
        <span
          className="uk-badge"
          style={{
            backgroundColor: colors[repo.language]
              ? colors[repo.language]
              : "#ccc"
          }}
        >
          <span>{repo.language === null ? "Not Code" : repo.language}</span>
        </span>
      </td>
      <td>
        <span>⭐</span> <span>{formatNumber(repo.stargazers_count)}</span>
      </td>
    </tr>
  );
};

export default TableRow;
