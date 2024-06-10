import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Layout } from "react-grid-layout";
import { v4 as uuidv4 } from "uuid";

interface Widget {
  i: string;
  component: string;
  dimensions: Layout;
  props?: { [key: string]: any };
}

interface WidgetsContextProps {
  widgets: Widget[];
  setWidgets: (widgets: Widget[]) => void;
  addWidget: (
    component: string,
    dimensions: any,
    props?: { [key: string]: any }
  ) => void;
}

const defaultWidgets: Widget[] = [
  {
    i: "f70c3ff4-4ebf-46b3-b77a-d9e1e59214c1",
    component: "Weather",
    dimensions: {
      w: 7,
      h: 8,
      x: 0,
      y: 0,
      i: "f70c3ff4-4ebf-46b3-b77a-d9e1e59214c1",
      minW: 4,
      maxW: 7,
      minH: 7,
      maxH: 9,
      moved: false,
      static: false,
    },
    props: {
      id: "f70c3ff4-4ebf-46b3-b77a-d9e1e59214c1",
    },
  },
  {
    i: "9fdc4b79-cf64-4902-800a-183b3fe159fc",
    component: "Search",
    dimensions: {
      w: 7,
      h: 2,
      x: 0,
      y: 13,
      i: "9fdc4b79-cf64-4902-800a-183b3fe159fc",
      minW: 4,
      maxW: 7,
      minH: 2,
      maxH: 3,
      moved: false,
      static: false,
    },
    props: {
      id: "9fdc4b79-cf64-4902-800a-183b3fe159fc",
    },
  },
  {
    i: "2806b5fe-8c8c-415b-9c8a-a5c7c84d344a",
    component: "Time",
    dimensions: {
      w: 4,
      h: 5,
      x: 3,
      y: 8,
      i: "2806b5fe-8c8c-415b-9c8a-a5c7c84d344a",
      minW: 4,
      maxW: 6,
      minH: 5,
      maxH: 7,
      moved: false,
      static: false,
    },
    props: {
      id: "2806b5fe-8c8c-415b-9c8a-a5c7c84d344a",
    },
  },
  {
    i: "0c038094-de30-4306-b447-cba4c609009a",
    component: "Todo",
    dimensions: {
      w: 5,
      h: 12,
      x: 12,
      y: 0,
      i: "0c038094-de30-4306-b447-cba4c609009a",
      minW: 4,
      maxW: 7,
      minH: 2,
      maxH: 14,
      moved: false,
      static: false,
    },
    props: {
      title: "Todo",
      todos: [],
      id: "0c038094-de30-4306-b447-cba4c609009a",
    },
  },
  {
    i: "1a00ff60-0af4-4960-bcfd-871073aadbef",
    component: "Note",
    dimensions: {
      w: 5,
      h: 12,
      x: 7,
      y: 0,
      i: "1a00ff60-0af4-4960-bcfd-871073aadbef",
      minW: 4,
      maxW: 7,
      minH: 2,
      maxH: 13,
      moved: false,
      static: false,
    },
    props: {
      title: "Note",
      description: "",
      id: "1a00ff60-0af4-4960-bcfd-871073aadbef",
    },
  },
  {
    i: "8d5d4c1f-3492-49b0-8992-debe3449a04f",
    component: "Tile",
    dimensions: {
      w: 3,
      h: 5,
      x: 0,
      y: 8,
      i: "8d5d4c1f-3492-49b0-8992-debe3449a04f",
      minW: 2,
      maxW: 3,
      minH: 4,
      maxH: 5,
      moved: false,
      static: false,
    },
    props: {
      title: "Animood",
      url: "https://animood.lirena.in",
      id: "8d5d4c1f-3492-49b0-8992-debe3449a04f",
    },
  },
];

const WidgetsContext = createContext<WidgetsContextProps>({
  widgets: defaultWidgets,
  addWidget: () => {},
  setWidgets: () => {},
});

export const WidgetsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedWidgets = localStorage.getItem("widgets");
    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    }
    setIsLoading(false);
  }, []);

  // Save widgets to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      console.log(widgets);
      localStorage.setItem("widgets", JSON.stringify(widgets));
      console.log("widgets saved");
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
      props: { ...props, id } || {},
    };
    setWidgets([...widgets, newWidget]);
  };

  return (
    <WidgetsContext.Provider value={{ widgets, setWidgets, addWidget }}>
      {children}
    </WidgetsContext.Provider>
  );
};

// Custom hook to use the Widgets context
export const useWidgets = () => {
  return useContext(WidgetsContext);
};
