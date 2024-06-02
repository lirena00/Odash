import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import useBackgroundImageWithAccent from "@/hooks/useBackgroundImageWithAccent";
import { Layout } from "react-grid-layout";
import { useSettings } from "@/contexts/SettingsContext";
const WidgetLayout = dynamic(() => import("@/components/WidgetLayout"), {
  ssr: false,
});

export default function Home() {
  const [widgets, setWidgets] = useState<
    { i: string; component: string; dimensions: Layout }[]
  >([]);
  const { settings } = useSettings();
  const backgroundImage = settings.backgroundImage;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const savedWidgets = localStorage.getItem("widgets");
    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("widgets", JSON.stringify(widgets));
    }
  }, [widgets, isLoading]);

  const addWidget = (
    component: string,
    dimensions: any,
    props?: { [key: string]: any }
  ) => {
    const id = uuidv4();
    const newWidget = {
      i: id,
      component,
      dimensions: { ...dimensions, i: id },
      props: component === "Tile" ? { ...props, id } : null,
    };
    setWidgets([...widgets, newWidget]);
  };

  useBackgroundImageWithAccent(backgroundImage);

  const [edit, setEdit] = useState(false);
  return (
    <main className={`w-screen h-screen flex`}>
      <Nav edit={edit} setEdit={setEdit} addWidget={addWidget} />
      <div className="w-screen h-screen overflow-y-auto ">
        <WidgetLayout edit={edit} widgets={widgets} setWidgets={setWidgets} />
      </div>
    </main>
  );
}
