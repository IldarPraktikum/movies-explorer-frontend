import React from "react";
import "./MoviesCardList.css";

const MoviesCardList = ({ children }) => (
  <section className="movies-list">
    <ul className="movies-list__container">{children}</ul>
  </section>
);

export default MoviesCardList;