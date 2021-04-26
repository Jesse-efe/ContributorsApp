import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ORG_CONTRIBUTORS } from "../../queries";
import "./style.scss";

interface node {
  name: string;
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
    };
  };
  followers: {
    totalCount: number;
  };
  repositories: {
    totalCount: number;
  };
  gists: {
    totalCount: number;
  };
}

const Contributors = () => {
  const [data, setData] = React.useState<node[] | null>(null);
  const [fetchData, setFetchData] = React.useState(true);
  const [endCursor, setEndCursor] = React.useState(null);
  const [hasNextPage, setHasNextPage] = React.useState(false);

  const { loading } = useQuery(GET_ORG_CONTRIBUTORS, {
    onCompleted: ({
      organization: {
        membersWithRole: { pageInfo, nodes },
      },
    }) => {
      setFetchData(false);
      setEndCursor(pageInfo.endCursor);
      setHasNextPage(pageInfo.hasNextPage);
      return !data ? setData([...nodes]) : setData([...data, ...nodes]);
    },
    variables: {
      orgName: sessionStorage.getItem("organistionName"),
      cursor: endCursor,
    },
    skip: !fetchData,
    fetchPolicy: "no-cache",
  });

  return (
    <div className="contributors">
      <h1>this are the contributors</h1>
      {loading && <p>loading</p>}
      {data &&
        data.map((person: node) => (
          <div className="contributor" key={person.name}>
            <p>Name: {person.name}</p>
            <p>
              contributions:{" "}
              {
                person.contributionsCollection.contributionCalendar
                  .totalContributions
              }
            </p>
            <p>followers: {person.followers.totalCount}</p>
            <p>repositories: {person.repositories.totalCount}</p>
            <p>gists: {person.gists.totalCount}</p>
          </div>
        ))}
      {hasNextPage && (
        <button onClick={() => setFetchData(true)}>
          {loading ? "Loading" : "Fetch more"}
        </button>
      )}
    </div>
  );
};

export default Contributors;
