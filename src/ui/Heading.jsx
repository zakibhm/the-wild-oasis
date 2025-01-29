import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 1.5em;
      font-weight: bold;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.3em;
      font-weight: bold;
    `}

      ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 1.1em;
      font-weight: bold;
      color: red;
    `}

      ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3em;
      font-weight: 600;
      text-align: center;
    `}


  line-height: 1.5;
`;

export default Heading;
