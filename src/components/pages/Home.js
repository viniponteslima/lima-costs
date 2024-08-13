import styles from './Home.module.css'
import savings from '../../images/savings.svg'
import LinkButton from '../layout/LinkButton';

export default function Home() {
  return (
    <section className={styles.homeContainer}>
      <h1>Bem-vindo ao <span>LimaCosts</span></h1>
      <p>Comece a gerenciar os seus projetos agora mesmo!</p>
      <LinkButton to="/novo-projeto" text="Criar Projeto" />
      <img src={savings} alt='LimaCosts' />
    </section>
  );
}