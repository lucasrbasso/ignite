import React from 'react';
import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';

export const NavModal = () => {
  return (
    <div className={styles.navContainer}>
      <nav>
        <ActiveLink activeClassName={styles.active} href="/">
          <a>Home</a>
        </ActiveLink>
        <ActiveLink activeClassName={styles.active} href="/posts">
          <a>Posts</a>
        </ActiveLink>
        <SignInButton />
      </nav>
    </div>
  );
};
