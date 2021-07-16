import { Header } from '../Header';
import { useEffect, useState } from 'react';
import UserService from '../../api/user';
import { Redirect } from 'react-router-dom';
import { Rooms } from '../Rooms';
import styles from './styles.module.scss';

export const Main = () => {
  const [user, setUser] = useState();
  const [isError, setIsError] = useState(false);

  useEffect(async () => {
    const userDataFromStorage = JSON.parse(localStorage.getItem('user'));

    const responseUser = await UserService.getInfo(userDataFromStorage.id);

    if (responseUser.username && responseUser.bio) {
      setUser(responseUser);
    } else {
      setIsError(true);
    }
  }, []);

  if (!user) {
    return 'Loading';
  }

  if (isError) {
    return <Redirect to={`/error`} />
  }

  return (
    <div className={styles.main}>
      <Header
        username={user.username}
        bio={user.bio}
      />
      <div>
        <Rooms />
      </div>
    </div>
  )
};
