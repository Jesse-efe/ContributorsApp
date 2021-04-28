import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import EntityInfo from "../../components/EntityInfo";
import SortBar from "../../components/SortBar";
import {
  GET_ORG_CONTRIBUTORS,
  CACHED_CONTRIBUTORS,
  GET_ORG_INFO,
} from "../../queries";
import "./style.scss";

interface node {
  name: string;
  login: string;
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
  const [fetchData, setFetchData] = React.useState(false);
  const [endCursor, setEndCursor] = React.useState(null);
  const history = useHistory();
  const client = useApolloClient();
  let { organization } = useParams<{ organization: string }>();

  const orgInfo = client.readQuery({
    query: GET_ORG_INFO,
    variables: { name: organization.toLowerCase() },
  });

  const cachedContributors = client.readQuery({
    query: CACHED_CONTRIBUTORS,
  });

  React.useEffect(() => {
    if (cachedContributors) {
      setData(cachedContributors.contributors.data);
      setEndCursor(cachedContributors.contributors.endCursor);
    } else {
      setFetchData(true);
    }
  }, []);

  const { loading } = useQuery(GET_ORG_CONTRIBUTORS, {
    variables: {
      orgName: orgInfo?.organization.login,
      cursor: endCursor,
    },
    skip: !fetchData,
    fetchPolicy: "no-cache",
    onCompleted: ({
      organization: {
        membersWithRole: {
          pageInfo: { endCursor, hasNextPage },
          nodes,
        },
      },
    }) => {
      setFetchData(false);
      setEndCursor(hasNextPage ? endCursor : null);
      const newData = !data ? [...nodes] : [...data, ...nodes];
      client.writeQuery({
        query: CACHED_CONTRIBUTORS,
        data: {
          contributors: {
            data: newData,
            endCursor,
          },
        },
      });
      setData(newData);
    },
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
console.log(orgInfo)
  if (!orgInfo?.organization) return <Redirect to="/" />;
  return (
    <div className="contributors">
      <EntityInfo
        title={orgInfo?.organization.name}
        intro={
          orgInfo?.organization.description ||
          `learn more about ${orgInfo?.organization.name} organization at ${orgInfo?.organization.url}`
        }
      />
      <SortBar sortFunction={sortUsers} />
      {loading && <p>loading</p>}
      {data &&
        data.map((person: node) => (
          <div
            className="contributor"
            key={person.login}
            onClick={() => history.push(`/contributors/${person.login}`)}
          >
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
      {endCursor && (
        <button onClick={() => setFetchData(true)}>
          {loading ? "Loading" : "Fetch more"}
        </button>
      )}
    </div>
  );
};

export default Contributors;
