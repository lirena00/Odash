import { useEffect } from "react";
import Nav from "@/components/Nav";
import dynamic from "next/dynamic";
import useBackgroundImageWithAccent from "@/hooks/useBackgroundImageWithAccent";
const WidgetLayout = dynamic(() => import("@/components/WidgetLayout"), {
  ssr: false,
});

export default function Home() {
  useBackgroundImageWithAccent("https://tepi.vercel.app/wp");
  return (
    <main className={`w-screen h-screen flex`}>
      <Nav />
      <WidgetLayout />
    </main>
  );
}
