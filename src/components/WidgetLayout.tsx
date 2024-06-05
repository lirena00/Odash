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
import Countdown from "@/components/Widgets/Countdown";
import Note from "@/components/Widgets/Note";

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
  Weather,
  Tile,
  Countdown,
  Note,
};

const WidgetLayout = ({ edit, widgets, setWidgets }: WidgetLayout) => {
  const handleNoteUpdate = (id: string, title: string, description: string) => {
    const updatedWidgets = widgets.map((widget: Widget) =>
      widget.i === id
        ? { ...widget, props: { ...widget.props, title, description } }
        : widget
    );
    setWidgets(updatedWidgets);
  };

  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        autoSize={true}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 25, md: 25, sm: 25, xs: 25, xxs: 25 }}
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
              {widget.component === "Note" ? (
                <Component {...widget.props} onUpdate={handleNoteUpdate} />
              ) : (
                <Component {...widget.props} />
              )}
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </>
  );
};

export default WidgetLayout;
