import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="CRUD Manager - A comprehensive records management system with full CRUD operations" />
        <meta property="og:title" content="CRUD Manager" />
        <meta property="og:description" content="Manage your data records with full CRUD operations" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}