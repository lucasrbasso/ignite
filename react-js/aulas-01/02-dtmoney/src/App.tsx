import React, { useCallback, useState } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import Modal from 'react-modal';

import light from './styles/themes/light';

import { TransactionsProvider } from './hooks/useTransactions';

import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import { GlobalStyle } from './styles/global';
import dark from './styles/themes/dark';
import usePersistedState from './hooks/usePersistedState';

Modal.setAppElement('#root');

export const App: React.FC = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>(
    '@DtMoney:theme',
    light,
  );

  const handleToggleTheme = useCallback(() => {
    setTheme(theme.title === 'light' ? dark : light);
  }, [theme.title, setTheme]);

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  const handleOpenTransactionModal = useCallback(() => {
    setIsNewTransactionModalOpen(true);
  }, []);

  const handleCloseTransactionModal = useCallback(() => {
    setIsNewTransactionModalOpen(false);
  }, []);

  return (
    <TransactionsProvider>
      <ThemeProvider theme={theme}>
        <Header
          toggleTheme={handleToggleTheme}
          onOpenNewTransactionModal={handleOpenTransactionModal}
        />
        <Dashboard />
        <NewTransactionModal
          isOpen={isNewTransactionModalOpen}
          onRequestClose={handleCloseTransactionModal}
        />
        <GlobalStyle />
      </ThemeProvider>
    </TransactionsProvider>
  );
};
