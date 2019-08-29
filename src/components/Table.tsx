import React from "react";
import { Repo } from "../types.js";
import TableRow from "./TableRow";

type Props = { repos: Repo[] };

const Table = ({ repos }: Props) => {
  return (
    <table className="uk-table uk-table-striped uk-table-divider uk-table-responsive">
      <tbody>
        {repos.map(r => (
          <TableRow key={r.id} repo={r} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
