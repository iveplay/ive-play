import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@/components/Global/styles.css';

import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '../theme';

const frankfurter = localFont({
  src: '../public/fonts/frankfurter-highlight-std.otf',
  variable: '--font-frankfurter',
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Head>
        <title>IVE Play</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <body className={frankfurter.variable}>
        <Notifications />
        <Component {...pageProps} />
      </body>
    </MantineProvider>
  );
};

export default App;
