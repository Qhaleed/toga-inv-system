import EvaluationRows from "./EvaluationRows";
import "../common/Table.css";

const EvaluationTable = ({
  modifyTable,
  setValue,
  setEvaluationTab,
  isAll,
  isEvaluationTab,
  isNotEvaluationTab,
}) => {
  const mainContentHeight = "80vh";

  return (
    <div className="w-full flex flex-col items-center justify-start mt-12">
      {/* Removed top sorting/filtering buttons, only sidebar buttons control filtering/sorting */}
      <div
        className="w-full flex justify-center items-start px-1 sm:px-2 md:px-5 lg:ml-0 lg:w-full"
        style={{ height: mainContentHeight, maxWidth: "100vw" }}
      >
        <div className="h-full w-full flex items-stretch justify-center">
          <div className="h-full w-full flex flex-col justify-start items-center">
            <div
              className="relative w-full flex flex-col min-h-fit min-w-fit max-w-full border border-black shadow outline-none bg-white"
              style={{
                maxHeight: mainContentHeight,
              }}
            >
              <div
                className="w-full overflow--visible "
                style={{
                  maxWidth: "100vw",
                  position: "relative",
                  width: "100%",
                }}
              >
                <table
                  className="table-auto border-none border-separate border-spacing-0 w-full min-w-0 max-w-full"
                  style={{
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
                    isAll={isAll}
                    isEvaluationTab={isEvaluationTab}
                    isNotEvaluationTab={isNotEvaluationTab}
                  />
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationTable;
