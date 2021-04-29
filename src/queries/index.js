import { gql } from "@apollo/client";

export const GET_ORG_INFO = gql`
  query($name: String!) {
    organization(login: $name) {
      name
      url
      id
      login
      description
    }
  }
`;

export const GET_ORG_CONTRIBUTORS = gql`
  query($orgName: String!, $cursor: String) {
    organization(login: $orgName) {
      membersWithRole(first: 15, after: $cursor) {
        nodes {
          name
          login
          bio
          avatarUrl
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
          followers {
            totalCount
          }
          repositories(privacy: PUBLIC) {
            totalCount
          }
          gists {
            totalCount
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const GET_USER_DETAILS = gql`
  query($loginName: String!, $cursor: String) {
    user(login: $loginName) {
      name
      bio
      company
      avatarUrl
      twitterUsername
      websiteUrl
      url
      status {
        message
      }
      topRepositories(
        first: 30
        after: $cursor
        orderBy: { field: NAME, direction: ASC }
      ) {
        totalCount
        nodes {
          name
          id
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const CACHED_CONTRIBUTORS = gql`
  {
    contributors {
      data
      endCursor
    }
  }
`;
