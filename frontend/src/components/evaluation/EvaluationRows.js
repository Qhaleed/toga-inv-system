import Rows from "../common/Rows";

const EvaluationRows = ({ isGrid, hideActionButton, modifyTable }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <div className="w-full max-w-[1400px] h-full flex flex-col justify-start items-center">
        <Rows
          isGrid={isGrid}
          hideActionButton={hideActionButton}
          modifyTable={modifyTable}
        />
      </div>
    </div>
  );
};

export default EvaluationRows;
