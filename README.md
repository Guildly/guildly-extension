# Guildly Extension

## Introduction

Guildly is a platform to create, manage and interact with multiplayer smart accounts on Starknet. Players can share assets, game state and make decisions together when playing any game or interacting with any contract.

[Guildly Alpha](https://alpha.guildly.xyz) is currently the place to manage guilds, while this extension connects game state of guilds and handles transactions on any dapp. You will need to become a member of a guild in order to access the extension.

## 👩🏾‍💻 Development

To contribute to this repository please read the contributing guidelines first.

Prerequisite :  
* Install [Yarn](https://www.npmjs.com/package/yarn)   
* Install [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

To setup the repo on your machine, first clone it, then just run:

```
yarn      # setup dependencies
yarn dev  # run build process for all packages in watch mode
```

Now you need to load the locally built chrome extension into your browser, by loading an unpacked extension from path packages/extension/dist:

1. Open the Extension Management page by navigating to chrome://extensions.
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the Load unpacked button and select the extension directory (dist folder).

<img src="https://camo.githubusercontent.com/bba6e775823f099d509dedf7065e560de448e5123e3d9f71e60d843624b1e1f3/68747470733a2f2f77642e696d6769782e6e65742f696d6167652f4268754b474a6149654c4e50573965686e7335394e6677714b7846322f764f75376950626161706b414c65643936727a4e2e706e673f6175746f3d666f726d6174">

## Note

A few known issues:

- After installing the extension, will need to refresh the current browser you are on in order for Guildly to be recognised when connecting.
