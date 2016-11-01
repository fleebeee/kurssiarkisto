import React from 'react';
import ls from 'local-storage';
import Link from 'next/link'

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Kurssiarkisto</h1>
        <div>
          <Link href="/login"><a>Kirjaudu sisään</a></Link>
        </div>
        <div>
          <Link href="/signup"><a>Rekisteröidy</a></Link>
        </div>
        <div>
          <Link href="/preferences"><a>Asetukset</a></Link>
        </div>
      </div>
    );
  }
}
