import React from 'react';
import Link from 'next/link'

export default class NotAuthorized extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Et ole kirjautunut sisään!
        Kirjaudu sisään <Link href="/login"><a>tästä.</a></Link>
      </div>
    );
  }
}
