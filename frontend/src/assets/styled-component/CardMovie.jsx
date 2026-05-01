import React from "react";
import styled from "styled-components";

const Card = styled("div")(
    ({ theme }) => `
  background-color: ${theme.primaryColor};
  color: ${theme.textColor};
  width: 40%;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`
);
const Title = styled("h2")(
    ({ theme }) => `
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`
);
const Poster = styled("img")(
    ({ theme }) => `
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`
);
const Info = styled("div")(
    ({ theme }) => `
  display: flex;
  justify-content: space-between;
  width: 100%;
`
);
const Type = styled("p")(
    ({ theme }) => `
font-size: 1rem;

`
);
const Year = styled("p")(
    ({ theme }) => `
font-size: 1rem;
`
);
export const CardMovie = ({ title, poster, type, year }) => {
    return (
        <Card>
            <Title>{title}</Title>
            <Poster src={poster} />
            <Info>
                <Type>{type}</Type>
                <Year>{year}</Year>
            </Info>
        </Card>
    );
};