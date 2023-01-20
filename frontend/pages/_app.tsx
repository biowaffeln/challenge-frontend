import { Inter, Quicksand } from '@next/font/google';
import type { AppProps } from 'next/app';
import 'styles/global.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={`${inter.variable} ${quicksand.variable} root`}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
