import { useEffect, useRef, useState } from "react";

import { FormulaDefinition, createFormula } from "./api/formulaAPI";
import APIEditor from "./components/api-editor";
import RenderedFormula from "./components/rendered-formula";

interface DirectFormulaRendererProps {
  formula?: FormulaDefinition;
  autoRender?: boolean;
  height?: number | string;
  width?: number | string;
}

const DEFAULT_FORMULA: FormulaDefinition = {
  expression: "K = \\frac{1}{2}mv^2",
  id: "kinetic-energy",
  description: "Kinetic energy equation",
  variables: {
    K: {
      type: "output",
      units: "J",
      label: "kinetic energy",
      round: 2,
    },
    m: {
      type: "constant",
      value: 1,
      units: "kg",
      label: "mass",
    },
    v: {
      type: "input",
      value: 2,
      range: [0.1, 10],
      units: "m/s",
      label: "velocity",
    },
  },
};

const DirectFormulaRenderer = ({
  formula = DEFAULT_FORMULA,
  autoRender = true,
  height = 300,
  width = "100%",
}: DirectFormulaRendererProps) => {
  const [formulaInput, setFormulaInput] = useState<FormulaDefinition>(formula);
  const [isRendered, setIsRendered] = useState<boolean>(autoRender);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoRender) {
      renderFormula();
    }
  }, []);

  const renderFormula = async () => {
    try {
      setError(null);
      const success = await createFormula(formulaInput);

      if (success) {
        setIsRendered(true);
      } else {
        setError("Failed to create formula");
      }
    } catch (err) {
      console.error("Error rendering formula:", err);
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div className="formula-renderer border border-gray-200 rounded-lg overflow-hidden">
      {!isRendered ? (
        <APIEditor
          formulaInput={formulaInput}
          setFormulaInput={setFormulaInput}
          renderFormula={renderFormula}
          error={error}
          setError={setError}
        />
      ) : (
        <RenderedFormula
          formulaInput={formulaInput}
          containerRef={containerRef}
          height={height}
          width={width}
          setIsRendered={setIsRendered}
        />
      )}
    </div>
  );
};

export default DirectFormulaRenderer;
