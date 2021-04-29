import "./style.scss";

interface cardProps {
    pictureUrl: string,
    name: string,
    bio: string,
    contributions: number,
    gists: number,
    followers: number,
    repositories: number,
    clickHandler: () => void,
}

const PersonCard = ({pictureUrl, name, bio, contributions, gists, followers, repositories, clickHandler}: cardProps) => {
  return (
    <div className="card" onClick={clickHandler}>
      <img
        src={pictureUrl}
        alt="person"
        className="card__picture"
      />
      <p className="card__name">{name}</p>
      <p className="card__bio">{bio}
      </p>
      <div className="card__stats">
        <div className="card__stats-item">
          <span className="card__stats-field">contributions</span>
          <span className="card__stats-count">{contributions}</span>
        </div>
        <div className="card__stats-item">
          <span className="card__stats-field">gists</span>
          <span className="card__stats-count">{gists}</span>
        </div>
        <div className="card__stats-item">
          <span className="card__stats-field">followers</span>
          <span className="card__stats-count">{followers}</span>
        </div>
        <div className="card__stats-item">
          <span className="card__stats-field">repositories</span>
          <span className="card__stats-count">{repositories}</span>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
