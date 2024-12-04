import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: var(--color-grey-100);
  padding: 1rem 4.8rem;
  border: 1xp solid var(--color-grey-100);
`;

export default function Header() {
  return <StyledHeader>Header</StyledHeader>;
}
