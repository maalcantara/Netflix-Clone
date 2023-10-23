import React, { useState }from "react";
import './MovieRow.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const MovieRow = ({ title, items }) => {
  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth);
    if(x > 0){
      x = 0;
    }
    setScrollX(x);
  }
  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth);
    let listW = items.results.length * 150;
    if((window.innerWidth - listW) > x){
      x = (window.innerWidth - listW) - 60;
    }
    setScrollX(x);
  }

  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movieRow--left" onClick={handleLeftArrow}>
        <IoIosArrowBack style={{fontSize: 40}} />
      </div>
      <div className="movieRow--right" onClick={handleRightArrow}>
        <IoIosArrowForward style={{fontSize: 40}}/>
      </div>
      <div className="movieRow--listarea">
        <div className="movieRow--list" style={{
          marginLeft: scrollX,
          width: items.results.length * 150
        }}>
        {items && items.results && items.results.length > 0 && items.results.map((item, key) => (
          <div key={key} className="movieRow--item">
            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} key={key} alt={item.original_title} />
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
