import React, { useState, useEffect } from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import { CrossIcon } from "@/components/Icons/CrossIcon";
import Time from "@/components/Widgets/Time";
import Tile from "@/components/Widgets/Tile";
import Search from "@/components/Widgets/Search";
import Todo from "@/components/Widgets/Todo";
import Weather from "@/components/Widgets/Weather";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Widget {
  i: string;
  component: string;
  dimensions: Layout;
  props?: { [key: string]: any };
}

interface WidgetLayout {
  edit: boolean;
  widgets: any;
  setWidgets: (widgets: any) => void;
}

const componentMap: { [key: string]: React.ComponentType<any> } = {
  Time,
  Search,
  Todo,
  Tile,
  Weather,
};

const WidgetLayout = ({ edit, widgets, setWidgets }: WidgetLayout) => {
  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        autoSize={true}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 25, md: 20, sm: 20, xs: 20, xxs: 20 }}
        rowHeight={15}
        margin={[10, 10]}
        draggableHandle=".widget"
        isDraggable={edit}
        isResizable={edit}
        onLayoutChange={(layout) => {
          const updatedWidgets = layout
            .map((l) => {
              const widget = widgets.find((w: Widget) => w.i === l.i);
              return widget ? { ...widget, dimensions: l } : null;
            })
            .filter(Boolean);
          setWidgets(updatedWidgets as any);
        }}
      >
        {widgets.map((widget: Widget) => {
          const Component = componentMap[widget.component];

          return (
            <div
              key={widget.i}
              data-grid={widget.dimensions}
              className="h-full relative w-full"
            >
              {edit && (
                <button
                  className="p-1 text-white bg-black z-10 rounded-tr-md absolute top-0 right-0"
                  onClick={() =>
                    setWidgets(widgets.filter((w: Widget) => w.i !== widget.i))
                  }
                >
                  <CrossIcon />
                </button>
              )}
              <Component {...widget.props} />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </>
  );
};

export default WidgetLayout;
