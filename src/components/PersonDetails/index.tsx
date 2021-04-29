import "./style.scss";

interface personalProps {
  name: string;
  pictureUrl: string;
  followers: number;
  gists: number;
}

const PersonDetails = ({
  name,
  pictureUrl,
  followers,
  gists,
}: personalProps) => {
  return (
    <div className="personal">
      <div className="personal__top">
        <img src={pictureUrl} alt="person" className="personal__picture" />
        <div className="personal__summary">
          <h1 className="personal__name heading-secondary">{name}</h1>
          <span className="personal__count">{followers} followers</span>
          <span className="personal__count">{gists} gists</span>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
