import '../styles/globals.scss';
import { useRouter } from 'next/router';
import { ApolloProvider } from "@apollo/client";
import client from '../apollo-client';
import AuthProvider from '../common/providers/AuthProvider';
import { LanguageContext } from '../common/providers/LanguageContext';
import { en } from '../locales/en';
import 'react-quill/dist/quill.snow.css';
import "react-datepicker/dist/react-datepicker.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  // TODO: Language switcher
  const t = router.locale === 'en' ? en : en;

  return (
    <ApolloProvider client={client}>
      <LanguageContext.Provider value={t}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </LanguageContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp
