import { useEffect, useState } from "react";
import styled from "styled-components";
import { Motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
  };
  useEffect(() => {
    getCuisine(params.type);
    console.log(params.type);
  }, [params.type]);

  return (
    <Grid>
      {cuisine.map((items) => {
        return (
          <Card key={items.id}>
            <img src={items.image} alt="" />
            <h4>{items.title}</h4>
          </Card>
        );
      })}
    </Grid>
  );
}
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;
const Card = styled.div`
  img {
    width: 100%;
    border-radius: 15px;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Cuisine;
