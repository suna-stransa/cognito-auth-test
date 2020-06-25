import React from 'react';
import './App.css';
import {AuthContext} from './AuthContext';

// import { withAuthenticator } from 'aws-amplify-react'; // ログイン画面のモジュールの読み込み
import Amplify from 'aws-amplify';           // amplifyのモジュールの読み込み
import aws_exports from './aws-exports';               // 設定情報を読み込みます。
Amplify.configure(aws_exports);                        // 設定情報をAmplifyに反映させます。

function App({match: {params: { redirect }}}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const {login} = React.useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = await login(email, password) //loginが成功したらfalseがreturnされる
    if(!err) {
      window.location.href = `http://localhost:3000/office/${encodeURIComponent(redirect)}`
      // window.location.href = decodeURIComponent(redirect) || 'http://localhost:3001';
    } else {
      setError(err);
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h3>テスト認証</h3>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <button type="submit">Submit</button>
        <p>{error}</p>
      </form>
    </div>
  );
}
export default App;