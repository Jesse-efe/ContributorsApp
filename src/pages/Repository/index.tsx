import * as React from "react";
import { useParams, useHistory } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_REPO_DETAILS } from "../../queries";
import EntityInfo from "../../components/EntityInfo";
import PersonCard from "../../components/PersonCard";
import "./style.scss";

interface node {
  name: string;
  login: string;
  bio: string;
  avatarUrl: string;
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

interface repoObject {
  name: string;
  id: string;
  description: string;
  contributors: node[];
}

const Repository = () => {
  const [repoData, setRepoData] = React.useState<repoObject | null>(null);
  const history = useHistory();
  const { name, ownerLogin } = useParams<{
    name: string;
    ownerLogin: string;
  }>();

  const { loading } = useQuery(GET_REPO_DETAILS, {
    onCompleted: ({ repository }) => {
      setRepoData({
        name: repository.name,
        id: repository.id,
        description: repository.description,
        contributors: [...repository.mentionableUsers.nodes],
      });
    },
    variables: {
      repoName: name,
      ownerLogin,
    },
  });

  if (!repoData && loading)
    return <div className="spinner--dark mx-auto"></div>;
  return (
    <div className="page">
      {repoData && (
        <>
          <EntityInfo title={repoData.name} intro={repoData.description} />
          <h2 className="heading-tertiary mx-auto">Collaborators</h2>
          <div className="contributors page-body">
            {repoData.contributors.map((person: node) => (
              <PersonCard
                pictureUrl={person.avatarUrl}
                name={person.name}
                bio={person.bio}
                key={person.login}
                contributions={
                  person.contributionsCollection.contributionCalendar
                    .totalContributions
                }
                gists={person.gists.totalCount}
                followers={person.followers.totalCount}
                repositories={person.repositories.totalCount}
                clickHandler={() =>
                  history.push(`/contributors/${person.login}`)
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Repository;
