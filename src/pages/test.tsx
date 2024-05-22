import React, { useState } from "react";
import GridLayout from "react-grid-layout";

const ComplexInterfaceGrid = () => {
  const [layout, setLayout] = useState([
    { i: "widget1", x: 0, y: 0, w: 2, h: 4 },
    // More widgets...
  ]);

  const addWidget = () => {
    const newWidget = {
      i: `widget${layout.length + 1}`,
      x: 0,
      y: 0,
      w: 2,
      h: 4,
    };
    setLayout([...layout, newWidget]);
  };

  // Function to remove a widget...
  // Function to update a widget...

  return (
    <GridLayout
      className="complex-interface-layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={1200}
      onLayoutChange={(newLayout) => setLayout(newLayout)}
    >
      {layout.map((item) => (
        <div key={item.i} style={{ background: "#009688" }}>
          {`Widget ${item.i}`}
          <button onClick={() => addWidget()}>Add</button>
        </div>
      ))}
      {/* Add button to trigger addWidget */}
    </GridLayout>
  );
};

export default ComplexInterfaceGrid;
