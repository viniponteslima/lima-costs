import styles from './Loading.module.css';
import loading from '../../images/loading.svg'

export default function Loading() {
  return (
    <div className={styles.loaderContainer}>
        <img src={loading} alt='loading' />
    </div>
  );
}