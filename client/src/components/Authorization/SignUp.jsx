import { useCallback, useState } from 'react';
import styles from './styles.module.scss';

const initialRegisterInfo = {
  nickname: {
    value: '',
    isValid: true,
  },
  password: {
    value: '',
    isValid: true,
  },
  repeatedPassword: {
    value: '',
    isValid: true,
  },
  bio: {
    value: '',
    isValid: true,
  },
};

export const SignUp = () => {
  const [userInfo, setUserInfo] = useState(initialRegisterInfo);

  const setClassName = useCallback((field) => {
    return !userInfo[field].isValid ? styles.invalid : ''
  }, [userInfo]);

  const changeInputHandler = useCallback((event) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [event.target.id]: {
        value: event.target.value,
        isValid: true,
      },
    }))
  }, [userInfo]);

  const changeValidUserField = (field) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [field]: {
        ...prevInfo[field],
        isValid: false,
      },
    }))
  };

  const submitHandler = useCallback((e) => {
    e.preventDefault();

    if (!userInfo.nickname.length || !userInfo.nickname.trim()) {
      changeValidUserField('nickname');
    }

    if (userInfo.password !== userInfo.repeatedPassword) {
      changeValidUserField('password');
      changeValidUserField('repeatedPassword');
    }
  }, [userInfo]);

  return (
    <>
      <h2 className={styles.title}>Registration</h2>
      <form
        className={styles.form}
        id='form-registration'
        onSubmit={submitHandler}
      >
        <label>
          <label htmlFor='nickname' className={setClassName('nickname')}>Nickname</label>
          <span className={styles.symbol}>{`>`}</span>
          <input
            type='text'
            id='nickname'
            value={userInfo.nickname.value}
            onChange={changeInputHandler}
          />
        </label>
        <label>
          <label htmlFor='password' className={setClassName('password')}>Password</label>
          <span className={styles.symbol}>{`>`}</span>
          <input
            type='password'
            id='password'
            value={userInfo.password.value}
            onChange={changeInputHandler}
          />
        </label>
        <label>
          <label htmlFor='repeatedPassword' className={setClassName('repeatedPassword')}>Repeat password</label>
          <span className={styles.symbol}>{`>`}</span>
          <input
            type='password'
            id='repeatedPassword'
            value={userInfo.repeatedPassword.value}
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
              value={userInfo.bio.value}
              onChange={changeInputHandler}
            />
          </span>
        </label>
        <button
          className={styles.btn}
          type='submit'
        >
          {`Sign up --->`}
        </button>
      </form>
    </>
  )
}
