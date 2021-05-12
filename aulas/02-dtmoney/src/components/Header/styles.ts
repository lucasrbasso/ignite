import styled from 'styled-components';

export const Container = styled.header`
  background: ${props => props.theme.colors.blue};
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 2rem 1rem 12rem;
  max-width: 1120px;
  margin: 0 auto;

  @media (max-width: 720px) {
    padding: 2rem 1rem 12rem;
    flex-direction: column;

    img {
      margin-top: 2rem;
    }
  }

  button {
    font-size: 1rem;
    color: #ffffff;
    background: ${props => props.theme.colors.blue_light};
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;

    transition: filter 0.2s;

    @media (max-width: 720px) {
      padding: 0 1rem;
      margin-top: 2rem;
    }

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
