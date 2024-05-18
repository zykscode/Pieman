import { siteConfig } from '../config/site'
import { ModeToggle } from './mode-toggle'
import styles from './styles.module.css'
import { FaGithub, FaTwitter, FaYoutube } from 'react-icons/fa'

type Props = {}

function PageFooter({}: Props) {
  const { twitter, github, youtube } = siteConfig.links

  return (
    <footer className={ ` hidden md:flex ${styles.footer}`}>
      <div className={styles.copyright}>copyright 2024 zyk</div>
      <div className={styles.settings}>
        <ModeToggle />
      </div>
      <div className={styles.social}>
        {twitter && (
          <a
            className={styles.twitter}
            href={`https://twitter.com/${twitter}`}
            title={`Twitter @${twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
        )}

        {github && (
          <a
            className={styles.github}
            href={`https://github.com/${github}`}
            title={`GitHub @${github}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        )}

        {youtube && (
          <a
            className={styles.youtube}
            href={`https://www.youtube.com/${youtube}`}
            title={`YouTube middle ma`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
        )}
      </div>
    </footer>
  )
}

export default PageFooter