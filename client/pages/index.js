import React from 'react';
import Link from 'next/link';
import css from 'next/css';
import Head from 'next/head';

import { Button } from 'react-bootstrap';

const index = css({
  padding: '5%',
});

const ul = css({
  listStyleType: 'none',
  paddingLeft: 0,
});
// superkommentti
const li = css({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: '5px',
  padding: '7px',
  border: '1px solid black',
  borderRadius: '5px',
});

export default () => (
  <div className={index}>
    {/* TODO Move this to header */}
    <Head>
      <title>Kurssiarkisto</title>
      <meta charSet='utf-8' />
      {/* eslint-disable max-len */}
      <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css' />
      <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css' />
      {/* eslint-enable max-len */}
    </Head>
    <h1>Kurssiarkisto</h1>
    <ul {...ul}>
      <li {...li}>
        <Link href='/login'>
          <Button bsStyle='primary'>
            Kirjaudu sisään
          </Button>
        </Link>
      </li>
      <li {...li}>
        <Link href='/signup'><a>Rekisteröidy</a></Link>
      </li>
      <li {...li}>
        <Link href='/preferences'><a>Asetukset</a></Link>
      </li>
    </ul>
  </div>
);
