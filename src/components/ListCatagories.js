// Component which list the Genres that we have for to the User to choose from.
import React from "react";
import "../Stylesheet.css";
import { Link } from "react-router-dom";

const ListCatagories = () => {
    const Categories = ['Metal', 'Study', 'Rainy Day', 'Hip-Hop', 'Pop', 'Rock', 'Rap', 'Country']
  return ( 
    <div id="categoryList">
        {
            Categories.map(Categories => <Link id="listItems" style={{ textDecoration: 'none' }} to="/Track"><h3>{Categories}</h3></Link>)
        }
    </div>
  );
};

export default ListCatagories;