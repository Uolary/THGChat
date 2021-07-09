import AuthService from './auth';

export const authHeader = () => {
  const user = AuthService.getUserData();

  if (user && user.accessToken) {
    return {
      'x-access-token': user.accessToken,
    }
  } else {
    return {};
  }
};
