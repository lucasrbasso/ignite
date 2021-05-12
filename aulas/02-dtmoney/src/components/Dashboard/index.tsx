import { useSpring } from 'react-spring';
import React from 'react';
import { Summary } from '../Summary';
import { TransactionsTable } from '../TransactionsTable';

import { Container } from './styles';

export const Dashboard: React.FC = () => {
  const animation = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 500,
  });

  return (
    <Container style={animation}>
      <Summary />
      <TransactionsTable />
    </Container>
  );
};
