import Link from 'next/link';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.container}>
      <Link href="/">
        <a>
          <img src="/images/logo.svg" alt="spacetraveling" />
        </a>
      </Link>
    </header>
  );
}
