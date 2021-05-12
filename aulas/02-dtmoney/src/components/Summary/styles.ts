import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -10rem;

  @media (max-width: 1080px) {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  div {
    background: ${props => props.theme.colors.shape};
    padding: 1.5rem 2rem;
    width: 100%;
    border-radius: 0.25rem;
    color: ${props => props.theme.colors.text_title};

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    strong {
      display: block;
      font-size: 2rem;
      line-height: 3rem;
      font-weight: 500;
      margin-top: 1rem;
    }
  }

  .highlight-background {
    background: ${props => props.theme.colors.green};
    color: #ffffff;
  }
`;
