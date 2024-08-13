import { FaGithub, FaInstagram, FaLinkedin} from 'react-icons/fa'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer>
      <ul>
        <li><FaGithub /></li>
        <li><FaLinkedin /></li>
        <li><FaInstagram /></li>
      </ul>
      <p className={styles.copyright}><span>LimaCosts</span> &copy; 2024</p>
    </footer>
  );
}