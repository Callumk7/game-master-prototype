/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as GamesIndexImport } from './routes/games/index'
import { Route as GamesGameIdIndexImport } from './routes/games/$gameId/index'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const GamesIndexRoute = GamesIndexImport.update({
  id: '/games/',
  path: '/games/',
  getParentRoute: () => rootRoute,
} as any)

const GamesGameIdIndexRoute = GamesGameIdIndexImport.update({
  id: '/games/$gameId/',
  path: '/games/$gameId/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/games/': {
      id: '/games/'
      path: '/games'
      fullPath: '/games'
      preLoaderRoute: typeof GamesIndexImport
      parentRoute: typeof rootRoute
    }
    '/games/$gameId/': {
      id: '/games/$gameId/'
      path: '/games/$gameId'
      fullPath: '/games/$gameId'
      preLoaderRoute: typeof GamesGameIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/login': typeof LoginRoute
  '/games': typeof GamesIndexRoute
  '/games/$gameId': typeof GamesGameIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/login': typeof LoginRoute
  '/games': typeof GamesIndexRoute
  '/games/$gameId': typeof GamesGameIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/login': typeof LoginRoute
  '/games/': typeof GamesIndexRoute
  '/games/$gameId/': typeof GamesGameIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/about' | '/login' | '/games' | '/games/$gameId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/login' | '/games' | '/games/$gameId'
  id: '__root__' | '/' | '/about' | '/login' | '/games/' | '/games/$gameId/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  LoginRoute: typeof LoginRoute
  GamesIndexRoute: typeof GamesIndexRoute
  GamesGameIdIndexRoute: typeof GamesGameIdIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  LoginRoute: LoginRoute,
  GamesIndexRoute: GamesIndexRoute,
  GamesGameIdIndexRoute: GamesGameIdIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/login",
        "/games/",
        "/games/$gameId/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/games/": {
      "filePath": "games/index.tsx"
    },
    "/games/$gameId/": {
      "filePath": "games/$gameId/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
