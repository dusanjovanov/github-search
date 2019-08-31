import React from "react";
import { fetchRepos } from "../util";

type Props = {
  next: string;
  prev: string;
  setRepos: (repos: any) => void;
  setIsLoading: (isLoading: boolean) => void;
};

const Pagination = ({ next, prev, setRepos, setIsLoading }: Props) => {
  const onClickPrev = () => {
    setIsLoading(true);
    fetchRepos(prev)
      .then(setRepos)
      .then(() => setIsLoading(false));
  };

  const onClickNext = () => {
    setIsLoading(true);
    fetchRepos(next)
      .then(setRepos)
      .then(() => setIsLoading(false))
      .catch(() => {
        setIsLoading(false);
        UIkit.modal.alert(
          "There was an error with the request. Please try again later."
        );
      });
  };

  return (
    <div
      className="uk-flex uk-align-center uk-flex-center"
      style={{ marginBottom: 70 }}
    >
      <button
        className="uk-button uk-button-default"
        onClick={onClickPrev}
        disabled={!prev}
      >
        Previous
      </button>
      <button
        className="uk-button uk-button-default uk-margin-small-left"
        onClick={onClickNext}
        disabled={!next}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
