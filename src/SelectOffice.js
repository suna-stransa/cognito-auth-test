import React from 'react';

const selectOffice = (props) => {
  const {match: {params: {redirect}}} = props;

  const clickHandler = (redirectURL, officeId) => {
    document.cookie = `officeId=${officeId}; path=/`;
    window.location.href = redirectURL || 'http://localhost:3001';
  }

  const renderOffice = (redirect) => {
    const redirectURL = decodeURIComponent(redirect)

    return (
      <>
        <tr>
          <td>医院1</td><td><button onClick={() => clickHandler(redirectURL, "1")}>dental1</button></td>
        </tr>
        <tr>
          <td>医院2</td><td><button onClick={() => clickHandler(redirectURL, "2")}>dental2</button></td>
        </tr>
      </>
    )
  }

  return (
    <div>
      <h1>医院一覧</h1>
      <table>
        <thead>
          <tr>
            <th>Office name</th><th>link</th>
          </tr>
        </thead>
        <tbody>
          {renderOffice(redirect)}
        </tbody>
      </table>
    </div>
  )
}

export default selectOffice;