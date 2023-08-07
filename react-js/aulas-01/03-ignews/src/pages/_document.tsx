import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"
            rel="stylesheet"
          />
          <link
            rel="shortcut icon"
            href="/images/favicon.png"
            type="image/png"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
          />
          <meta
            property="og:title"
            content="Ignews - News about the React world"
          />
          <meta property="og:type" content="blog" />
          <meta
            property="og:description"
            content="The best news portal about the react universe!"
          />
          <meta
            property="og:image"
            content="https://i.ibb.co/zrrWV25/react-js.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
