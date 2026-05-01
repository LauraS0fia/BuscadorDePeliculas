import React, { useEffect, useState } from "react";
import { getFirstMovies } from "../../utils/actions";
import { CardMovie } from "./CardMovie";
import styled from "styled-components";

const Container = styled('div')(({ theme }) => `
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    gap: 20px
`)
export const Movies = () => {
    const [movies, setMovies] = useState(null);
    useEffect(() => {
        getMovie();
    }, []);
    const getMovie = async () => {
        try {
            const response = await getFirstMovies();
            const { Search } = response.data;
            setMovies(Search);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Container>
            {movies ? (
                movies.map((movie) => {
                    const { Title, Poster, Type, Year, imdbID } = movie;
                    return (
                        <CardMovie
                            key={imdbID}
                            title={Title}
                            poster={Poster}
                            type={Type}
                            year={Year}
                        />
                    );
                })
            ) : (
                <></>
            )}
        </Container>
    );
};