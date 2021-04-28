import * as React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { GET_USER_DETAILS } from "../../queries";
import "./style.scss";

interface repo {
  name: string;
  id: string;
}

interface dataObject {
  name: string;
  bio: string;
  company: string;
  avatarUrl: string;
  twitterUsername: string | null;
  url: string;
  totalRepos: number;
  reposEndcursor: string;
}

function SingleContributor() {
  const [userData, setUserData] = React.useState<dataObject | null>(null);
  const [userRepos, setUserRepos] = React.useState<repo[]>([]);
  const [fetchData, setFetchData] = React.useState(true);
  const [hasNextPage, setHasNextPage] = React.useState(false);
  let { loginName } = useParams<{ loginName: string }>();

  const { loading } = useQuery(GET_USER_DETAILS, {
    onCompleted: ({
      user: {
        name,
        bio,
        company,
        avatarUrl,
        twitterUsername,
        url,
        topRepositories: { totalCount, nodes, pageInfo },
      },
    }) => {
      setFetchData(false);
      if (!userData) {
        setUserData({
          name,
          bio,
          company,
          avatarUrl,
          twitterUsername,
          url,
          totalRepos: totalCount,
          reposEndcursor: pageInfo.endCursor,
        });
      }
      setUserRepos([...userRepos, ...nodes]);
      setHasNextPage(pageInfo.hasNextPage);
    },
    variables: {
      loginName,
      cursor: userData?.reposEndcursor || null,
    },
    skip: !fetchData,
  });

  return (
    <div>
      {loading && <p>loading</p>}
      {userData && (
        <div className="contributor">
          <p>Name: {userData.name}</p>
          <p>company: {userData.company}</p>
          <p>bio: {userData.bio}</p>
          <p>Twitter username: {userData.twitterUsername}</p>
          <p>Avatar url: {userData.avatarUrl}</p>
          <p>Github url: {userData.url}</p>
          <p>Total repos: {userData.totalRepos}</p>
        </div>
      )}
      {userRepos.length > 1 &&
        userRepos.map((repo) => (
          <div className="contributor" key={repo.id}>
            <p>Name: {repo.name}</p>
          </div>
        ))}

      {hasNextPage && (
        <button onClick={() => setFetchData(true)}>
          {loading ? "Loading" : "Fetch more"}
        </button>
      )}
    </div>
  );
}

export default SingleContributor;
