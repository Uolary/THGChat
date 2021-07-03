import styles from './styles.module.scss';
import classNames from 'classnames';
import { SignUp } from './SignUp';
import { useState } from 'react';
import { auth } from '../../const/components';
import { SignIn } from './SignIn';
import { Title } from '../Title';

export const Authorization = () => {
  const [active, setActive] = useState();

  return (
    <div className='wrap'>
      <Title />
      <div className={styles.wrapAuth}>
        {
          active === auth.signIn && <SignIn />
        }
        {
          active === auth.signUp && <SignUp />
        }
        {
          !active && (
            <>
              <button
                className={classNames(styles.btn, styles.option)}
                onClick={() => setActive(auth.signUp)}
              >
                {`[ Sign up ]`}
              </button>
              <button
                className={classNames(styles.btn, styles.option)}
                onClick={() => setActive(auth.signIn)}
              >
                {`[ Log in ]`}
              </button>
            </>
          )
        }
      </div>
    </div>
  )
}
