import LoadingSkeleton from "./LoadingSkeleton";

const List = ({
  items,
  listContainerStyles,
  renderItem,
  isLoading,
  loadingStyles,
  emptyListMsg,
  emptyListStyles,
}) => {
  if (isLoading) return <LoadingSkeleton className={loadingStyles} />;

  if (!items.length) return <p className={emptyListStyles}>{emptyListMsg}</p>;

  return (
    <ul className={listContainerStyles}>
      {items.map((item) => renderItem(item))}
    </ul>
  );
};

export default List;
