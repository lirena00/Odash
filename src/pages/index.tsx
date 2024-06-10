import { useState } from "react";
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
    <main className={`w-screen h-screen flex`}>
      <Nav edit={edit} setEdit={setEdit} />
      <div className="w-screen h-screen overflow-y-auto ">
        <WidgetLayout edit={edit} />
      </div>
    </main>
  );
}
