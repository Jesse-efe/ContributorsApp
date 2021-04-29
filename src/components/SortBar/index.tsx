import "./style.scss";

enum optionType {
  contributions = "contributions",
  repositories = "repositories",
  followers = "followers",
  gists = "gists",
}

const SortBar = ({
  sortFunction,
}: {
  sortFunction: (option: optionType) => void;
}) => {
  const sortOptions = ["contributions", "followers", "gists", "repositories"];

  return (
    <div className="sort-bar">
      <span className="sort-bar__text">Sort list by: </span>
      <div className="sort-bar__buttons">
        {sortOptions.map((option) => (
          <button
            key={option}
            onClick={() => sortFunction(option as optionType)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortBar;
