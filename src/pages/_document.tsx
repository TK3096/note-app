/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import {
  DocumentContext,
  DocumentInitialProps,
  RenderPage,
} from 'next/dist/shared/lib/utils'

import createEmotionServer from '@emotion/server/create-instance'
import { EmotionCriticalToChunks } from '@emotion/server/types/create-instance'

import createEmotionCache from '@themes/createEmotionCache'
import { EmotionCache } from '@emotion/cache'

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage: RenderPage = ctx.renderPage

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache: EmotionCache = createEmotionCache()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    extractCriticalToChunks,
  }: { extractCriticalToChunks: (html: string) => EmotionCriticalToChunks } =
    createEmotionServer(cache)

  ctx.renderPage = () => {
    return originalRenderPage({
      enhanceApp: (App: any) => {
        return function EnhanceApp(props: any) {
          return <App emotionCache={cache} {...props} />
        }
      },
    })
  }

  const initialProps: DocumentInitialProps = await Document.getInitialProps(ctx)
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles: EmotionCriticalToChunks = extractCriticalToChunks(
    initialProps.html,
  )
  const emotionStyleTags: JSX.Element[] = emotionStyles.styles.map((style) => {
    return (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    )
  })

  return {
    ...initialProps,
    styles: [
      ...emotionStyleTags,
      ...React.Children.toArray(initialProps.styles),
    ],
  }
}
