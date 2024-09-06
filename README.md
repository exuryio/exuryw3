# exury - Tech excersice by Jose Ruiz

## Material UI - Vite.js in TypeScript example

The main goal of the test is to build a side menu bar by having in count the following requirements:

1. Must be full height but should not be fixed - completed
2. Needs to be implemented with Material UI components - completed
3. Must have a transition between collapsed and expanded - completed
4. Each link should route to a different route - completed
5. On each route the user must to have a different title on tab of the browser - completed
6. Mark as selected the actual active route - completed

### How should looks like

Expanded:

![Menu expanded](menu-expanded.png?raw=true "Menu expanded")

- [reference to figma](https://www.figma.com/design/BybcTFgHhMMIOeS8ni3OAq/Exury?node-id=348-1807&t=1LdN9DZI4tOVChzC-4)

Collapsed

![Menu collapsed](menu-collapsed.png?raw=true "Menu collapsed")

- [reference to figma](https://www.figma.com/design/BybcTFgHhMMIOeS8ni3OAq/Exury?node-id=357-49912&t=1LdN9DZI4tOVChzC-4)

### How to use

This project uses node to run, so you must have node installed with npm avaible locally, here a reference how to [make it run](https://nodejs.org/en/download/package-manager). Runs with v16 or higher versions of node.

```bash
# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# download and install Node.js (you may need to restart the terminal)
nvm install 20
# verifies the right Node.js version is in the environment
node -v # should print `v20.15.0`
# verifies the right NPM version is in the environment
npm -v # should print `10.7.0`
```

Once you got node installed, just install the project and you're ready to start coding:

```bash
yarn
yarn dev
```

### Some hints

- Icons are already installed part of [material ui](https://mui.com/material-ui/material-icons/)
- For routing we recommend `vue router`
- There is no need for any state management
