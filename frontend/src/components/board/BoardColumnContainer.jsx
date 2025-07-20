import BoardColumn from "./BoardColumn";
import BoardColumnHeader from "./BoardColumnHeader";
import PriorityColumn from "./PriorityColumn";
import { COLUMNS } from "../../utils/constants";

const BoardColumnContainer = () => {
  return (
    <div className="mx-auto my-0 flex h-[90%] w-full max-w-7xl flex-wrap items-center justify-center gap-4 px-6 pt-1 md:flex-nowrap md:px-3">
      {Object.entries(COLUMNS).map(([columnTitle, priorities]) => (
        <BoardColumn key={columnTitle} title={columnTitle}>
          <BoardColumnHeader title={columnTitle} />

          {priorities.map((priority) => (
            <PriorityColumn
              key={`${columnTitle}-${priority}`}
              priority={priority}
              title={columnTitle}
            />
          ))}
        </BoardColumn>
      ))}
    </div>
  );
};

export default BoardColumnContainer;
