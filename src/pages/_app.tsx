import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { WidgetsProvider } from "@/contexts/WidgetsContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider>
      <WidgetsProvider>
        <Component {...pageProps} />
      </WidgetsProvider>
    </SettingsProvider>
  );
}

export default App;
