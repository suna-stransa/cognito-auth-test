import React, {useState, createContext} from 'react';

import Amplify, { Auth } from 'aws-amplify';           // amplifyのモジュールの読み込み
import aws_exports from './aws-exports';               // 設定情報を読み込みます。
Amplify.configure(aws_exports);                        // 設定情報をAmplifyに反映させます。

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [sessionId, setSessionId] = useState(null);

  const login = async (email, password) => {
    try {
      const user = await Auth.signIn(email, password)
      if(!user.signInUserSession.idToken.payload.sessionId || !user.signInUserSession.idToken.payload.authKey) {
          return '以外にエラーはなった！'
      }

      setSessionId(user.signInUserSession.idToken.payload.sessionId)
      await fetch('https://tooap4mvb3.execute-api.ap-northeast-1.amazonaws.com/demo/', {
        method: 'POST',
        body: JSON.stringify({
          sessionId: user.signInUserSession.idToken.payload.sessionId,
          authKey: user.signInUserSession.idToken.payload.authKey,
        }),
        credentials: 'include',
      })
      document.cookie = 'sso-authenticated=true; path=/';
      return false;
    } catch(err) {
      return '以外にエラーはなった！';
    }
  }

  const logout = async () => {
    Auth.signOut();

    const res = await fetch('https://tooap4mvb3.execute-api.ap-northeast-1.amazonaws.com/demo/', {
      method: 'POST',
      body: JSON.stringify({
        "sessionId": sessionId,
        logout: true,
      }),
      credentials: 'include',
    })
    const parsedRes = res.json();
    return parsedRes.logout;
  }

  return (
    <AuthContext.Provider value={{
      login,
      logout,
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;