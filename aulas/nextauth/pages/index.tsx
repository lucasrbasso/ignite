import { GetServerSideProps } from 'next';
import { useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Home.module.css';
import { parseCookies } from 'nookies';
import { withSSRGuest } from '../utils/withSSRGuest';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();

  async function handleSubmit(e: FormEvent) {

    e.preventDefault();

    const data = {
      email,
      password,
    }

    await signIn(data);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.container}>
      <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
      <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
      <button type="submit">Entrar</button>
    </form>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {


  return {
    props: {}
  }
  }
)
