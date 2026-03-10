import ErrorPage from './404';
import { useRouter } from 'next/router';
import { useRef } from 'react'; 
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store/store';
import persistStore from 'redux-persist/lib/persistStore';
import { PersistGate } from 'redux-persist/integration/react';

import { config, themeStyles } from '../config/index';

import Layout from "./layout";
import "../i18n";
import "../styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const storeRef = useRef<AppStore>(null);
  const persistorRef = useRef<any>(null);

  if (!storeRef.current) {
    const storeInstance = makeStore();
    storeRef.current = storeInstance;
    persistorRef.current = persistStore(storeInstance);
  }
  const allAllowed = config.allowedPages?.includes("*") || false;
  const isAllowed = config.allowedPages?.includes(router.pathname);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        <div className={themeStyles.contenedorPrincipal}>
          <Layout>
            {isAllowed || allAllowed ? (
              <Component {...pageProps} />
            ) : (
              <ErrorPage/>
            )}
          </Layout>
        </div>
      </PersistGate>
    </Provider>
  );
}