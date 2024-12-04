import styled, { css } from 'styled-components';

const Heading = styled.h1`
  ${props =>
    props.as == 'h1' &&
    css`
      color: var() --color-grey-500;
    `}

  font-weight: 600;
`;

export default Heading;
