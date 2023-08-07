import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { ActiveLink } from '../ActiveLink/index';
import { NavModal } from '../NavModal';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';

export const Header: React.FC = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const { asPath } = useRouter();

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  useEffect(() => {
    setMenuIsOpen(false);
  }, [asPath]);

  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <button
            className={styles.menuButton}
            type="button"
            onClick={toggleMenu}
          >
            {menuIsOpen ? (
              <FiX color="#FFFFFF" size={23} />
            ) : (
              <FiMenu color="#FFFFFF" size={23} />
            )}
          </button>
          <img src="/images/logo.svg" alt="ig.news" />
          <nav>
            <ActiveLink activeClassName={styles.active} href="/">
              <a>Home</a>
            </ActiveLink>
            <ActiveLink activeClassName={styles.active} href="/posts">
              <a>Posts</a>
            </ActiveLink>
          </nav>

          <SignInButton />
        </div>
      </header>
      {menuIsOpen && <NavModal />}
    </>
  );
};
