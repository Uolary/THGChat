import styles from './styles.module.scss';
import { useCallback, useState } from 'react';

const initialLoginInfo = {
  nickname: '',
  password: '',
}

export const SignIn = () => {
  const [userInfo, setUserInfo] = useState(initialLoginInfo);

  const changeInputHandler = useCallback((event) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [event.target.id]: event.target.value,
    }))
  }, [userInfo]);

  return (
    <>
      <h2 className={styles.title}>Login</h2>
      <form className={styles.form} id='form-registration'>
        <label>
          <label htmlFor='nickname'>Nickname</label>
          <span className={styles.symbol}>{`>`}</span>
          <input
            type='text'
            id='nickname'
            onChange={changeInputHandler}
          />
        </label>
        <label>
          <label htmlFor='password'>Password</label>
          <span className={styles.symbol}>{`>`}</span>
          <input
            type='password'
            id='password'
            onChange={changeInputHandler}
          />
        </label>
        <button
          className={styles.btn}
        >
          {`Sign in --->`}
        </button>
      </form>
    </>
  )
}
