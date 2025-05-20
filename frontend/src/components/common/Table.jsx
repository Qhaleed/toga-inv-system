import Rows from "./Rows";
import "./Table.css";

const Table = ({
  modifyTable,
  isAll,
  isReturnedTab,
  isNotReturnedTab,
  isAZ,
  isZA,
  allData,
}) => {
  const mainContentHeight = "83vh";
  return (
    <div className="w-full animate-fade-in flex flex-col items-center justify-start mt-12">
      <div
        className="w-full flex justify-center items-start px-1 sm:px-2 md:px-5 lg:ml-0 lg:w-full"
        style={{ height: mainContentHeight, maxWidth: "100vw" }}
      >
        <div className="h-full w-full flex items-stretch justify-center">
          <div className="h-full w-full flex flex-col justify-start items-center">
            <div
              className="relative w-full flex flex-col  min-w-fit max-w-full border  shadow outline-none bg-white"
              style={{
                maxHeight: mainContentHeight,
              }}
            >
              <div
                className="w-full overflow-visible "
                style={{
                  maxWidth: "100vw",
                  position: "relative",
                  width: "100%",
                }}
              >
                <table
                  className="table-auto border-none border-separate border-spacing-0 overflow-hidden w-full min-w-0 max-w-full"
                  style={{
                    width: "100%",
                    minWidth: 0,
                    maxWidth: "100%",
                  }}
                >
                  <Rows
                    isGrid={false}
                    modifyTable={modifyTable}
                    rowHeightClass="h-16"
                    isAll={isAll}
                    isReturnedTab={isReturnedTab}
                    isNotReturnedTab={isNotReturnedTab}
                    isAZ={isAZ}
                    isZA={isZA}
                    allData={allData}
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

export default Table;
