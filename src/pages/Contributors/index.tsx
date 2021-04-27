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

  const sortUsers = (
    field: "contributions" | "repositories" | "followers" | "gists"
  ) => {
    const users = [...data!];
    const sortFunction = (a: node, b: node) => {
      if (field === "contributions") {
        return (
          b.contributionsCollection.contributionCalendar.totalContributions -
          a.contributionsCollection.contributionCalendar.totalContributions
        );
      }
      return b[field].totalCount - a[field].totalCount;
    };
    users.sort(sortFunction);
    setData(users);
  };

  return (
    <div className="contributors">
      <h1>this are the contributors</h1>
      {loading && <p>loading</p>}
      <div className="sort-box">
        <button onClick={() => sortUsers("contributions")}>
          Contributions
        </button>
        <button onClick={() => sortUsers("repositories")}>Repositories</button>
        <button onClick={() => sortUsers("followers")}>Followers</button>
        <button onClick={() => sortUsers("gists")}>Gists</button>
      </div>
      {data &&
        data.map((person: node) => (
          <div className="contributor" key={person.name || Math.random()}>
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
