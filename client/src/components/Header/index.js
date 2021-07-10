import styles from './styles.module.scss';

export const Header = ({username, bio}) => {
  return (
    <div className={styles.header}>
      <div className={styles.user} title={bio}>
        <h3>{username}</h3>
      </div>
    </div>
  )
};
