import React from 'react';
import Link from 'next/link';

export default () => (
  <div>
    Et ole kirjautunut sisään!
    Kirjaudu sisään <Link href='/login'><a>tästä.</a></Link>
  </div>
);
