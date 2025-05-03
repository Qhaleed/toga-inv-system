import EvaluationRows from "./EvaluationRows";
import "../common/Table.css";

const EvaluationTable = ({ isGrid, modifyTable, value, setValue, evalTab, setEvaluationTab }) => {
  const mainContentHeight = "80vh";
  return (
    <div className="w-full flex flex-col items-center justify-start mt-10">
      <div className="w-full flex flex-col items-start justify-center mb-2 px-2" />
      <div
        className="w-full flex justify-center items-start px-1 sm:px-2 md:px-5 lg:ml-0 lg:w-full"
        style={{ height: mainContentHeight, maxWidth: "100vw" }}
      >
        <div className="h-full w-full flex items-stretch justify-center">
          <div className="h-full w-full flex flex-col justify-start items-center">
            {isGrid ? (
              <div className="flex-1 flex flex-col h-full">
                <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col justify-end p-12 sm:p-2 md:p-4 h-full">
                  <EvaluationRows isGrid hideActionButton />
                </div>
              </div>
            ) : (
              <div
                className="relative w-full flex flex-col min-h-[300px] max-w-full border border-black shadow outline-none bg-white rounded-lg"
                style={{
                  maxHeight: mainContentHeight,
                  minHeight: 400,
                  minWidth: 300,
                  maxWidth: "100vw",
                  overflow: "visible",
                }}
              >
                <div
                  className="w-full overflow-x-auto scrollbar-hide"
                  style={{
                    maxWidth: "100vw",
                    position: "relative",
                    width: "100%",
                  }}
                >
                  <table
                    className="table-auto border-none border-separate border-spacing-0 rounded-b-lg w-full min-w-0 max-w-full"
                    style={{
                      tableLayout: "fixed",
                      width: "100%",
                      minWidth: 0,
                      maxWidth: "100%",
                    }}
                  >
                    <EvaluationRows
                      isGrid={false}
                      modifyTable={modifyTable}
                      rowHeightClass="h-16"
                      setValue={setValue} 
                      setEvaluationTab={setEvaluationTab}
                    />
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationTable;
