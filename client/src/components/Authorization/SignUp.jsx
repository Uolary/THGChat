import { useCallback, useState } from 'react';
import styles from './styles.module.scss';

const initialRegisterInfo = {
  nickname: '',
  password: '',
  repeatedPassword: '',
  bio: '',
};

export const SignUp = () => {
  const [userInfo, setUserInfo] = useState(initialRegisterInfo);

  const changeInputHandler = useCallback((event) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [event.target.id]: event.target.value,
    }))
  }, [userInfo]);

  return (
    <>
      <h2 className={styles.title}>Registration</h2>
      <form className={styles.form} id='form-registration'>
        <label>
          <label htmlFor='nickname'>Nickname</label>
          <span className={styles.symbol}>{`>`}</span>
          <input
            type='text'
            id='nickname'
            value={userInfo.nickname}
            onChange={changeInputHandler}
          />
        </label>
        <label>
          <label htmlFor='password'>Password</label>
          <span className={styles.symbol}>{`>`}</span>
          <input
            type='password'
            id='password'
            value={userInfo.password}
            onChange={changeInputHandler}
          />
        </label>
        <label>
          <label htmlFor='repeatedPassword'>Repeat password</label>
          <span className={styles.symbol}>{`>`}</span>
          <input
            type='password'
            id='repeatedPassword'
            value={userInfo.repeatedPassword}
            onChange={changeInputHandler}
          />
        </label>
        <label>
          <label htmlFor='bio'>Bio</label>
          <span className='row'>
            <span className={styles.symbol}>{`>`}</span>
            <input
              type='text'
              id='bio'
              value={userInfo.bio}
              onChange={changeInputHandler}
            />
          </span>
        </label>
        <button
          className={styles.btn}
        >
          {`Sign up --->`}
        </button>
      </form>
    </>
  )
}
