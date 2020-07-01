import React, {useState, createContext} from 'react';

import Amplify, { Auth } from 'aws-amplify';           // amplifyのモジュールの読み込み
import aws_exports from './aws-exports';               // 設定情報を読み込みます。
Amplify.configure(aws_exports);                        // 設定情報をAmplifyに反映させます。

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const login = async (email, password) => {
    try {
      await fetch('https://ut9ppg22uk.execute-api.ap-northeast-1.amazonaws.com/dev/', {
        method: 'POST',
        body: JSON.stringify({
          userId: email,
          userPassword: password,
          login: true
        }),
        credentials: 'include',
      })
      return false;
    } catch(err) {
      console.log(err);
      return '以外にエラーはなった！';
    }
  }

  const logout = async () => {
    const res = await fetch('https://ut9ppg22uk.execute-api.ap-northeast-1.amazonaws.com/dev/', {
      method: 'POST',
      body: JSON.stringify({
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