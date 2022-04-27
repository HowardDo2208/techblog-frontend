import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta property="og:title" content="TechBlog 👨‍💻" />
          <meta property="og:image" content="/blog.jpg" />
          <link rel="icon" href="/whale.jpg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

