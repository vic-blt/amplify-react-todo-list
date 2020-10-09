# Todo React + AWS

### Install Amplify CLI
```bash
npm install -g @aws-amplify/cli
amplify configure
```

### Setup Project
```bash
yarn install
amplify pull
```

### Description
The todos are persisted in a Dynamo DB using Amplify library and AppSync's GraphQL API.

### Resources
- https://docs.amplify.aws/lib/graphqlapi/getting-started/q/platform/js
- https://docs.amplify.aws/cli
- https://github.com/mdn/todo-react
