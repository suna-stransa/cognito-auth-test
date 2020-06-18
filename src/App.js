import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react'; // ログイン画面のモジュールの読み込み
import Amplify, { Auth } from 'aws-amplify';           // amplifyのモジュールの読み込み
import aws_exports from './aws-exports';               // 設定情報を読み込みます。
Amplify.configure(aws_exports);                        // 設定情報をAmplifyに反映させます。

function App() {
  const sessionId = Auth.user ? Auth.user.signInUserSession.idToken.payload.sessionId : "" ;
  // const authKey = Auth.user.signInUserSession.idToken.payload.authKey;

  // ログアウトボタンの準備
  const signOut = () => {
    Auth.signOut()
    fetch('https://tooap4mvb3.execute-api.ap-northeast-1.amazonaws.com/demo', {
      method: 'POST',
      body: JSON.stringify({ "sessionId": `${sessionId}`, "logout": "true" }),
      credentials: 'include',
    })
    .then(res => res.json())
    .then(res => {
      document.cookie = 'sso-authenticated=false';
      window.location.assign('http://localhost:3000');
    })
    .catch(err => {
      console.log(err);
    })
  }

  //cookieある時
  useEffect(() => {
    //sso-authenticated=trueの時はAPIを叩く
    if (document.cookie === 'sso-authenticated=true') {
      fetch('https://tooap4mvb3.execute-api.ap-northeast-1.amazonaws.com/demo', {
        method: 'POST',
        body: JSON.stringify({ "sessionId": `${sessionId}` }),
        credentials: 'include',
      })
      .then(res => res.json())
      .then(res => {
          console.log(res);
      })
      .catch(err => console.log(err))
    } else { //sso-authenticated=trueではない(falseとかそもそもないとか)時は認証アプリにリダイレクト
      window.location.assign('http://localhost:3000');
    }
  }, []);

  //cookieない時
  const apiHandler = () => {
    fetch('https://tooap4mvb3.execute-api.ap-northeast-1.amazonaws.com/demo', {
      method: 'POST',
      body: JSON.stringify({ "sessionId": "123", "authKey": "uuid" }),
      credentials: 'include',
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          app1: web問診票
        </p>
        <button onClick={() => apiHandler()}>API送信</button>
        <button onClick={ () => signOut() }>ログアウト</button>
      </header>
    </div>
  );
}
export default App;