import Link from 'next/link';
import { Icon } from 'components/Icon';
import styles from './Nav.module.css';

export function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/doctors">
        <Icon name="logo" />
      </Link>
    </nav>
  );
}
