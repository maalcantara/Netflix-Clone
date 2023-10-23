import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie/FeaturedMovie";
import Header from "./components/Header/Header";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter((i) => i.slug === "trending");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 50) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />
      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        Image rights for Netflix®
        <br />
        Data from API
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener">
          TheMovieDB
        </a>
        <br />
        Made with
        <span role="img" aria-label="heart">
          ♡
        </span>
        by
        <a href="https://github.com/maalcantara" target="_blank" rel="noopener">
          maalcantara
        </a>
      </footer>

      {movieList <= 0 && (
        <div className="loading" alt="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" />
        </div>
      )}
    </div>
  );
};
