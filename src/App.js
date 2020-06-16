import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

import { withAuthenticator } from 'aws-amplify-react'; // ログイン画面のモジュールの読み込み
import Amplify, { Auth } from 'aws-amplify';           // amplifyのモジュールの読み込み
import aws_exports from './aws-exports';               // 設定情報を読み込みます。
Amplify.configure(aws_exports);                        // 設定情報をAmplifyに反映させます。

function App() {
  // ログアウトボタンの準備
  function signOut() {
    Auth.signOut()
  }

  useEffect(() => {
    const response = axios.get("https://rzl4a40l77.execute-api.ap-northeast-1.amazonaws.com/demo?TestId=1");
    console.log(response);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit src/App.js and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={ () => signOut() }>ログアウト</button>
      </header>
    </div>
  );
}
export default withAuthenticator(App);