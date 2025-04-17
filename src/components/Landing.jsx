import React, { useState } from "react";
import restaurants from "../sample-restaurants";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [display, toggleDisplay] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const displayList = () => toggleDisplay(!display);
  
  const getTitle = (restaurant) => {
    const { title, url } = restaurant;
    toggleDisplay(false);
    setTitle(title);
    setUrl(url);
  };

  const goToRestaurant = () => navigate(`/restaurant/${url}`);

  return (
    <div className="restaurant_select">
      <div className="restaurant_select_top">
        <div onClick={displayList} className="restaurant_select_top-header font-effect-outline">
          {title ? title : "Выбери ресторан"}
        </div>
        <div className="arrow_picker">
          <div className="arrow_picker-up"></div>
          <div className="arrow_picker-down"></div>
        </div>
      </div>

      {display && (
        <div className="restaurant_select_bottom">
          <ul>
            {restaurants.map(restaurant => (
              <li onClick={() => getTitle(restaurant)} key={restaurant.id}>
                {restaurant.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {title && !display && <button onClick={goToRestaurant}>Перейти в ресторан</button>}
    </div>
  );
};

export default Landing;