import "./style.scss";

const SingleRepo = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  return (
    <div className="repo">
      <p className="repo__name">{name}</p>
      <p className="repo__description">{description}</p>
    </div>
  );
};

export default SingleRepo;
