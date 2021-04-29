import "./style.scss";

const EntityInfo = ({ title, intro }: { title: string; intro: string }) => {
  return (
    <div className="entity">
      <h1 className="heading-secondary entity__title">{title}</h1>
      <p className="entity__bio">{intro}</p>
    </div>
  );
};

export default EntityInfo;
