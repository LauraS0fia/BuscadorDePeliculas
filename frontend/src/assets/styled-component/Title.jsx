import styled from "styled-components";
export const Title = styled("h1")(
    ({ theme }) => `
font-size: 2rem;
margin-bottom: 1rem;
color: ${theme.primaryColor};

@media screen and (max-width: 768px) {
  font-size: 1.5rem;
}
`
);