import React from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import Time from "@/components/Widgets/Time";
import { TimeDimensions } from "@/components/Widgets/Time";

import Search from "@/components/Widgets/Search";
import { SearchDimensions } from "./Widgets/Search";

const WidgetLayout = () => {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        autoSize={true}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 20, md: 20, sm: 20, xs: 20, xxs: 20 }}
        rowHeight={15}
        margin={[10, 10]}
        draggableHandle=".widget"
      >
        <div key="1" data-grid={SearchDimensions} className="h-full w-full">
          <Time />
        </div>

        <div key="2" data-grid={SearchDimensions} className="h-full w-full">
          <Time />
        </div>
        <div key="3" data-grid={SearchDimensions} className="h-full w-full">
          <Time />
        </div>
        <div key="4" data-grid={TimeDimensions} className="h-full w-full">
          <Search />
        </div>
        <div key="5" data-grid={TimeDimensions} className="h-full w-full">
          <Search />
        </div>
        <div key="6" data-grid={TimeDimensions} className="h-full w-full">
          <Search />
        </div>
      </ResponsiveGridLayout>
    </>
  );
};

export default WidgetLayout;

/*
      <div key="1" className="widget">
        <div className="widget-header">Widget 1</div>
        <div className="widget-content">Content 1</div>
      </div>
      */
