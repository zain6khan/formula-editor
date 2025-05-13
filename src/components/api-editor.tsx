import { FormulaDefinition } from "../api/formulaAPI";

interface FormulaEditorProps {
  formulaInput: FormulaDefinition;
  setFormulaInput: (formula: FormulaDefinition) => void;
  renderFormula: () => Promise<void>;
  error: string | null;
  setError: (error: string | null) => void;
}

const APIEditor = ({
  formulaInput,
  setFormulaInput,
  renderFormula,
  error,
  setError,
}: FormulaEditorProps) => {
  return (
    <div className="p-8 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Formula Definition</h2>
      <textarea
        value={JSON.stringify(formulaInput, null, 2)}
        onChange={(e) => {
          try {
            const newFormula = JSON.parse(e.target.value);
            setFormulaInput(newFormula);
            setError(null);
          } catch (e) {
            // Handle JSON parse error silently - will be caught during render
            setError("Invalid JSON format");
          }
        }}
        className="w-full p-2 rounded font-mono text-sm h-80 bg-slate-100"
      />

      <button
        onClick={renderFormula}
        className="bg-blue-500 text-white w-fit px-4 py-2 rounded hover:bg-blue-600"
      >
        Render Formula
      </button>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
    </div>
  );
};

export default APIEditor;
