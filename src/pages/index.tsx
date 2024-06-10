import { useState } from "react";
import Head from "next/head";
import Nav from "@/components/Nav";
import dynamic from "next/dynamic";
import useBackground from "@/hooks/useBackground";

const WidgetLayout = dynamic(() => import("@/components/WidgetLayout"), {
  ssr: false,
});

export default function Home() {
  useBackground();

  const [edit, setEdit] = useState(false);
  return (
    <>
      <Head>
        <>
          <title>Odash | Your New Tab, Your Way</title>
          <meta
            name="keywords"
            content="new tab page, customizable new tab, widget-based dashboard, personalized dashboard, todo widget, countdown widget, notes widget, search bar, clock widget, website links, browser customization"
          />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="lirena00" />
          <meta name="title" content="Odash | Your New Tab, Your Way" />
          <meta name="theme-color" content="#142c54" />
          <meta
            name="description"
            content="Personalize your new tab page with customizable widgets, custom colors, background blurs, themes, and wallpapers. Arrange todos, countdowns, notes, search bar, clock, and website links to suit your style and needs. Your new tab, your way."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://odash.lirena.in/" />
          <meta property="og:title" content="Odash | Your New Tab, Your Way" />
          <meta
            property="og:description"
            content="Personalize your new tab page with customizable widgets, custom colors, background blurs, themes, and wallpapers. Arrange todos, countdowns, notes, search bar, clock, and website links to suit your style and needs. Your new tab, your way."
          />
          <meta property="og:image" content="/og.png" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://odash.lirena.in/" />
          <meta
            property="twitter:title"
            content="Odash | Your New Tab, Your Way"
          />
          <meta
            property="twitter:description"
            content="Personalize your new tab page with customizable widgets, custom colors, background blurs, themes, and wallpapers. Arrange todos, countdowns, notes, search bar, clock, and website links to suit your style and needs. Your new tab, your way."
          />
          <meta property="twitter:image" content="/og.png" />
        </>
      </Head>
      <main className={`w-screen h-screen flex`}>
        <Nav edit={edit} setEdit={setEdit} />
        <div className="w-screen h-screen overflow-y-auto ">
          <WidgetLayout edit={edit} />
        </div>
      </main>
    </>
  );
}
