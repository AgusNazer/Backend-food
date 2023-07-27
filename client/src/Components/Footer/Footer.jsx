import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <>
      <hr className={styles.lineaHr} />
      <div className={`${styles.footerContainer} mx-6 pt-3 pb-4`}>
        <div className={`flex flex-col justify-center items-center text-center ${styles.footerContent}`}>
          <p className={styles.textos}>© 2023 Agustin Nazer. All Rights reserved.</p>
          <p className={styles.textos}>Developed & designed by Agustin Nazer 👨🏽‍💻</p>

          <div className={styles.iconsContainer}>
            <a href='https://github.com/AgusNazer' target='_blank' rel='noopener noreferrer'>
              <FaGithub className={styles.icon} />
            </a>
            <a href='https://www.linkedin.com/in/agustínnazer/' target='_blank' rel='noopener noreferrer'>
              <FaLinkedin className={styles.icon} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
