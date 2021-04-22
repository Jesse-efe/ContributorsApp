import * as React from "react";
import "./style.scss";

const Welcome = () => {
  const [showOrgInput, setOrgInput] = React.useState(false);

  const changeOrgClick = () => {
    setOrgInput((orgState) => !orgState);
  };

  return (
    <div className="welcome">
      <div className="welcome__main">
        <h1 className="heading-primary">Contributors Ranking</h1>
        <p className="welcome__message">
          View all Contributors to an organisation on Github. Click the button
          below to proceed. Angular is the default organisation, you can click
          'change organisation' below to provide your desired organisation.
        </p>
        {showOrgInput && (
          <input
            type="text"
            className="welcome__input"
            placeholder="Enter organisation name"
          />
        )}
        <button className="welcome__submit">GO!</button>
        <button className="welcome__change-org-btn" onClick={changeOrgClick}>
          {showOrgInput
            ? "proceed with default organisation"
            : "change organisation"}
        </button>
      </div>
    </div>
  );
};

export default Welcome;
