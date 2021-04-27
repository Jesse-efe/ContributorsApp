import { gql } from "@apollo/client";

export const GET_ORG_INFO = gql`
  query($name: String!) {
    organization(login: $name) {
      name
      url
      id
      login
    }
  }
`;

export const GET_ORG_CONTRIBUTORS = gql`
  query($orgName: String!, $cursor: String) {
    organization(login: $orgName) {
      membersWithRole(first: 15, after: $cursor) {
        nodes {
          name
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