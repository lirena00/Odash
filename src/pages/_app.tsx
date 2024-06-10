import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { WidgetsProvider } from "@/contexts/WidgetsContext";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider>
      <WidgetsProvider>
        <Head>
          <script
            defer
            src="https://analytics.lirena.in/script.js"
            data-website-id="40c3bcb0-bc51-4dae-9871-616b5c155aa0"
          ></script>
        </Head>
        <Component {...pageProps} />
      </WidgetsProvider>
    </SettingsProvider>
  );
}

export default App;
