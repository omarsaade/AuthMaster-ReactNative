import React, {useState, useContext} from 'react';
import AuthContent from '../components/Auth/AuthContent';
import {login} from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {Alert} from 'react-native';
import {AuthContext} from '../store/auth-context';

const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({email, password}) {
    setIsAuthenticating(true);

    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authenticated failed!',
        'Could not log you in. Please check your credentials or try again later!',
      );
      setIsAuthenticating(false);
    }

    // setIsAuthenticating(false); // hon btkun el page rahet...bta3mul error
    // can't perform a react state update on
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default LoginScreen;
