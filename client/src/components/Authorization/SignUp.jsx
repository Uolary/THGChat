import { useCallback, useState } from 'react';
import {
  Redirect,
} from 'react-router-dom';
import AuthService from '../../api/auth';
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
  const [registeredUser, setRegisteredUser] = useState({});
  const [isError, setIsError] = useState(false);

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

  const checkValidAllField = (field) => field.isValid;

  const submitHandler = useCallback(async (e) => {
    e.preventDefault();

    if (!userInfo.nickname.value.length || !userInfo.nickname.value.trim()) {
      changeValidUserField('nickname');
    }

    if (userInfo.password.value !== userInfo.repeatedPassword.value || !userInfo.password.value.length) {
      changeValidUserField('password');
      changeValidUserField('repeatedPassword');
    }

    if (Object.values(userInfo).every(checkValidAllField)) {
      const data = await AuthService.register(
        userInfo.nickname.value,
        userInfo.password.value,
        userInfo.bio.value,
      );

      if (data) {
        setRegisteredUser(data);
      } else {
        console.log('error');
        setIsError(true);
      }
    }
  }, [userInfo]);

  if (registeredUser.id) {
    return <Redirect to={`/${registeredUser.id}`} />
  }

  if (isError) {
    return <Redirect to={`/error`} />
  }

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
