import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@/components/global/styles.css';

import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '../theme';

const frankfurter = localFont({
  src: '../public/fonts/frankfurter-highlight-std.otf',
  variable: '--font-frankfurter',
  display: 'swap',
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Head>
        <title>IVE - Interactive Video Experience</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="shortcut icon" href="/icon0.svg" />
        <meta name="apple-mobile-web-app-title" content="ive" />

        <meta
          name="description"
          content="Control your haptic devices directly from your browser and sync with your favorite videos on any site!"
        />
        <meta
          name="keywords"
          content="ive, the handy, lovense, kiiroo, eroscripts, faptap, ivdb, interactive video Experience, chrome, firefox, toy, haptic"
        />

        <meta property="og:site_name" content="IVE - Interactive Video Experience" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://iveplay.io" />
      </Head>
      <div className={frankfurter.variable}>
        <Notifications />
        <Component {...pageProps} />
      </div>
    </MantineProvider>
  );
};

export default App;
