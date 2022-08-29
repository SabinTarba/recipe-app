import { useEffect, useState } from "react";
import styled from "styled-components";
import Recipe from "./Recipe";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';


function Veggie() {

    const [veggie, setVeggie] = useState([]);

    useEffect(() => {
        getVeggie();
    }, [])

    const getVeggie = async () => {

        const check = localStorage.getItem('veggie');

        if (check) {
            setVeggie(JSON.parse(check));
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10&tags=vegetarian`)
            const data = await api.json();
            localStorage.setItem('veggie', JSON.stringify(data.recipes));
            setVeggie(data.recipes);
        }

    }


    return (
        <Wrapper>
            <h3>Our Vegetarian Picks</h3>

            <Splide options={{
                perPage: 3,
                arrows: false,
                pagination: false,
                drag: "free",
                gap: "5rem",
            }}>
                {
                    veggie?.length > 0 ?

                        veggie.map((recipe) => {
                            return (
                                <SplideSlide key={recipe.id}>
                                    <Link to={"/recipe/" + recipe.id}>
                                        <Recipe recipe={recipe}></Recipe>
                                    </Link>
                                </SplideSlide>
                            )
                        })

                        :

                        <>
                            <h1>Error in fetching API</h1>
                        </>
                }

            </Splide>

        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin: 5rem;
`

export default Veggie