import styles from './styles.module.scss';
import { useCallback, useState } from 'react';
import AuthService from '../../api/auth';
import { Redirect } from 'react-router-dom';

const loginInfo = {
  nickname: '',
  password: '',
}

export const SignIn = () => {
  const [userInfo, setUserInfo] = useState(loginInfo);
  const [isError, setIsError] = useState(false);

  const changeInputHandler = useCallback((event) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [event.target.id]: event.target.value,
    }))
  }, [userInfo]);

  const submitHandler = useCallback(async (e) => {
    e.preventDefault();

    const signInResponse = await AuthService.login(userInfo.nickname, userInfo.password);

    if (signInResponse) {
      console.log(signInResponse);
    } else {
      setIsError(true);
    }
  }, [userInfo]);

  if (isError) {
    return <Redirect to='/error' />
  }

  return (
    <>
      <h2 className={styles.title}>Login</h2>
      <form
        className={styles.form}
        id='form-registration'
        onSubmit={submitHandler}
      >
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
          onClick={() => {
            console.log(process.env);
          }}
        >
          {`Sign in --->`}
        </button>
      </form>
    </>
  )
}
