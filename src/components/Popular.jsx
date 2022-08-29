import { useEffect, useState } from "react";
import styled from "styled-components";
import Recipe from "./Recipe";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';

function Popular() {

    const [popular, setPopular] = useState([]);

    useEffect(() => {
        getPopular();
    }, [])


    const getPopular = async () => {

        const check = localStorage.getItem('popular');

        if (check) {
            setPopular(JSON.parse(check));
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`)
            const data = await api.json();
            localStorage.setItem('popular', JSON.stringify(data.recipes));
            setPopular(data.recipes);
        }

    }

    return (
        <Wrapper>
            <h3>Trending Picks</h3>

            <Splide options={{
                perPage: 4,
                arrows: false,
                pagination: false,
                drag: "free",
                gap: "5rem",
            }}>
                {
                    popular?.length > 0 ?

                        popular.map((recipe) => {
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


export default Popular