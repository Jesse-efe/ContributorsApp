import "./style.scss";

const SingleRepo = ({
  name,
  description,
  clickHandler,
}: {
  name: string;
  description: string;
  clickHandler: () => void;
}) => {
  return (
    <div className="repo" onClick={clickHandler}>
      <p className="repo__name">{name}</p>
      <p className="repo__description">{description}</p>
    </div>
  );
};

export default SingleRepo;
