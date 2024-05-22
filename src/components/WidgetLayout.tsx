import React from "react";
import GridLayout from "react-grid-layout";
import { useState, useEffect } from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Time from "@/components/Widgets/Time";
import Search from "@/components/Widgets/Search";

const WidgetLayout = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        setTheme("dark");
        localStorage.setItem("theme", "dark");
      }
    } catch (e) {
      console.error("Failed to retrieve or set theme in localStorage", e);
      setTheme("dark");
    }
  }, []);

  const layout = [
    { i: "1", x: 0, y: 0, w: 4, h: 5 },
    { i: "2", x: 5, y: 10, w: 4, h: 5 },
    { i: "3", x: 0, y: 5, w: 4, h: 5 },
    { i: "4", x: 18, y: 6, w: 7, h: 2, maxH: 2, maxW: 7, minH: 2 },
    { i: "5", x: 18, y: 8, w: 7, h: 2, maxH: 2, maxW: 7, minH: 2 },
    { i: "6", x: 18, y: 10, w: 7, h: 2, maxH: 2, maxW: 7, minH: 2 },

    // Add more widgets as needed
  ];

  return (
    <GridLayout
      className="layout"
      layout={layout}
      autoSize={true}
      cols={20}
      rowHeight={15}
      width={1326}
      margin={[10, 10]}
      draggableHandle=".widget-header"
    >
      <div key="1" className="widget">
        <Time theme="dark" />
      </div>
      <div key="2" className="widget">
        <Time theme="light" />
      </div>
      <div key="3" className="widget">
        <Time theme="solid" />
      </div>
      <div key="4" className="widget">
        <Search theme="dark" />
      </div>
      <div key="5" className="widget">
        <Search theme="light" />
      </div>
      <div key="6" className="widget">
        <Search theme="solid" />
      </div>
    </GridLayout>
  );
};

export default WidgetLayout;

/*
      <div key="1" className="widget">
        <div className="widget-header">Widget 1</div>
        <div className="widget-content">Content 1</div>
      </div>
      */
