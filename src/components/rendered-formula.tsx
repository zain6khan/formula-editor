import React from "react";

import { FormulaDefinition } from "../api/formulaAPI";
import BlockInteractivity from "../rendering/BlockInteractivity";

interface RenderedFormulaProps {
  formulaInput: FormulaDefinition;
  containerRef: React.RefObject<HTMLDivElement>;
  height: number | string;
  width: number | string;
  setIsRendered: (isRendered: boolean) => void;
}

const RenderedFormula = ({
  formulaInput,
  containerRef,
  height,
  width,
  setIsRendered,
}: RenderedFormulaProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between bg-gray-100 px-4 py-2">
        <h3 className="font-medium">
          {formulaInput.description || "Interactive Formula"}
        </h3>
        <button
          onClick={() => setIsRendered(false)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
      </div>

      <div
        ref={containerRef}
        style={{ height, width }}
        className="interactive-formula-container"
      >
        <BlockInteractivity />
      </div>

      <div className="p-2 bg-gray-50 text-xs text-gray-500">
        Drag sliding variables (blue) to see how they affect the output (gray)
      </div>
    </div>
  );
};

export default RenderedFormula;
