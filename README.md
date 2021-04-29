# Contributors Ranking App

This application list all members of an organisation and is able to rank them according to their number of contributions. The data used in the app is gotten from github graphql API.

## Live URL
https://contributorsapp.vercel.app/

## Steps to set up the application locally
- clone this repository
- cd into the repository directory on your machine
- run `npm install`
- get an access token from github (or use this one: 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)
- set the token to the value of `REACT_APP_VERY_OPEN_SECRET_KEY` in your .env file
- run npm start

## Asumptions 
- members of an organisation are assumed to be the collaratorsf.
- contributions of a user is assumed to be the numer of repositories the user has contributed to, plus repositories the user has created
- contributors to a repositoy are assumed to be a list of Users that can be mentioned in the context of the repository.
