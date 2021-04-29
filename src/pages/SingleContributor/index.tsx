import * as React from "react";
import { useQuery } from "@apollo/client";
import { useParams, useHistory } from "react-router";
import { GET_USER_DETAILS } from "../../queries";
import PersonDetails from "../../components/PersonDetails";
import SingleRepo from "../../components/SingleRepo";
import "./style.scss";

interface repo {
  name: string;
  description: string;
  id: string;
  owner: {
    login: string;
  };
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
  followers: number;
  gists: number;
}

function SingleContributor() {
  const [userData, setUserData] = React.useState<dataObject | null>(null);
  const [userRepos, setUserRepos] = React.useState<repo[]>([]);
  const [fetchData, setFetchData] = React.useState(true);
  const [hasNextPage, setHasNextPage] = React.useState(false);
  const history = useHistory();
  const { loginName } = useParams<{ loginName: string }>();

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
        followers: { totalCount: followers },
        gists: { totalCount: gists },
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
          followers,
          gists,
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
    fetchPolicy: "no-cache",
  });

  if (!userData && loading)
    return <div className="spinner--dark mx-auto"></div>;
  return (
    <div className="page">
      {userData && (
        <PersonDetails
          name={userData.name}
          pictureUrl={userData.avatarUrl}
          followers={userData.followers}
          gists={userData.gists}
        />
      )}
      <div className="page-body">
        <div className="contributor-bio">{userData?.bio}</div>
        <h2 className="heading-tertiary">Top Repositories</h2>
        {userRepos.length > 1 ? (
          userRepos.map((repo) => (
            <SingleRepo
              name={repo.name}
              description={repo.description}
              key={repo.id}
              clickHandler={() =>
                history.push(`/repository/${repo.name}/${repo.owner.login}`)
              }
            />
          ))
        ) : (
          <p>No Repositories</p>
        )}
      </div>
      {hasNextPage && (
        <button onClick={() => setFetchData(true)} className="button mx-auto">
          Fetch more {loading && <div className="spinner--small"></div>}
        </button>
      )}
    </div>
  );
}

export default SingleContributor;
