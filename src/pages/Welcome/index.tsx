import * as React from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router";
import {GET_ORG_INFO} from "../../queries"
import "./style.scss";

const Welcome = () => {
  const [showOrgInput, setOrgInput] = React.useState(false);
  const [message, setMessagee] = React.useState("");
  const [fetchData, setFetchData] = React.useState(false);
  const history = useHistory();

  const orgInput = React.useRef<HTMLInputElement>(null!);
  const { loading } = useQuery(GET_ORG_INFO, {
    variables: { name: orgInput.current?.value.trim() || "angular" },
    skip: !fetchData,
    onCompleted: (result) => {
      sessionStorage.setItem("organistionName", result.organization.login);
      history.push("/contributors");
      setFetchData(false);
    },
    onError: (error) => {
      setFetchData(false);
      setMessagee(error.message);
    },
  });

  React.useEffect(() => {
    if (showOrgInput) {
      orgInput.current.focus();
    }
  }, [showOrgInput]);

  const onSubmit = () => {
    if (showOrgInput && orgInput.current.value.trim().length === 0) {
      return setMessagee("Please specify an orginisation name");
    }
    setFetchData(true);
  };

  const changeOrgClick = () => {
    if (showOrgInput) {
      return (orgInput.current.value = "angular");
    }
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
            ref={orgInput}
            className="welcome__input"
            placeholder="enter organisation name"
          />
        )}
        <pre>{loading ? "loading" : message}</pre>
        <button className="welcome__submit" onClick={onSubmit}>
          GO!
        </button>
        <button className="welcome__change-org-btn" onClick={changeOrgClick}>
          {showOrgInput ? "use default organisation" : "change organisation"}
        </button>
      </div>
    </div>
  );
};

export default Welcome;
