/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AppImport } from './routes/_app'
import { Route as AppIndexImport } from './routes/_app/index'

// Create Virtual Routes

const AppSettingsServerInfoLazyImport = createFileRoute(
  '/_app/settings/server-info',
)()
const AppFleetAircraftsLazyImport = createFileRoute('/_app/fleet/aircrafts')()
const AppAccountProfileLazyImport = createFileRoute('/_app/account/profile')()
const AppSettingsUsersIndexLazyImport = createFileRoute(
  '/_app/settings/users/',
)()
const AppSettingsRolesIndexLazyImport = createFileRoute(
  '/_app/settings/roles/',
)()
const AppSettingsEnumsIndexLazyImport = createFileRoute(
  '/_app/settings/enums/',
)()
const AppSettingsConfigsIndexLazyImport = createFileRoute(
  '/_app/settings/configs/',
)()
const AppDataAirportsIndexLazyImport = createFileRoute('/_app/data/airports/')()
const AppAnalysisMapIndexLazyImport = createFileRoute('/_app/analysis/map/')()

// Create/Update Routes

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AppRoute = AppImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const AppIndexRoute = AppIndexImport.update({
  path: '/',
  getParentRoute: () => AppRoute,
} as any)

const AppSettingsServerInfoLazyRoute = AppSettingsServerInfoLazyImport.update({
  path: '/settings/server-info',
  getParentRoute: () => AppRoute,
} as any).lazy(() =>
  import('./routes/_app/settings/server-info.lazy').then((d) => d.Route),
)

const AppFleetAircraftsLazyRoute = AppFleetAircraftsLazyImport.update({
  path: '/fleet/aircrafts',
  getParentRoute: () => AppRoute,
} as any).lazy(() =>
  import('./routes/_app/fleet/aircrafts.lazy').then((d) => d.Route),
)

const AppAccountProfileLazyRoute = AppAccountProfileLazyImport.update({
  path: '/account/profile',
  getParentRoute: () => AppRoute,
} as any).lazy(() =>
  import('./routes/_app/account/profile.lazy').then((d) => d.Route),
)

const AppSettingsUsersIndexLazyRoute = AppSettingsUsersIndexLazyImport.update({
  path: '/settings/users/',
  getParentRoute: () => AppRoute,
} as any).lazy(() =>
  import('./routes/_app/settings/users/index.lazy').then((d) => d.Route),
)

const AppSettingsRolesIndexLazyRoute = AppSettingsRolesIndexLazyImport.update({
  path: '/settings/roles/',
  getParentRoute: () => AppRoute,
} as any).lazy(() =>
  import('./routes/_app/settings/roles/index.lazy').then((d) => d.Route),
)

const AppSettingsEnumsIndexLazyRoute = AppSettingsEnumsIndexLazyImport.update({
  path: '/settings/enums/',
  getParentRoute: () => AppRoute,
} as any).lazy(() =>
  import('./routes/_app/settings/enums/index.lazy').then((d) => d.Route),
)

const AppSettingsConfigsIndexLazyRoute =
  AppSettingsConfigsIndexLazyImport.update({
    path: '/settings/configs/',
    getParentRoute: () => AppRoute,
  } as any).lazy(() =>
    import('./routes/_app/settings/configs/index.lazy').then((d) => d.Route),
  )

const AppDataAirportsIndexLazyRoute = AppDataAirportsIndexLazyImport.update({
  path: '/data/airports/',
  getParentRoute: () => AppRoute,
} as any).lazy(() =>
  import('./routes/_app/data/airports/index.lazy').then((d) => d.Route),
)

const AppAnalysisMapIndexLazyRoute = AppAnalysisMapIndexLazyImport.update({
  path: '/analysis/map/',
  getParentRoute: () => AppRoute,
} as any).lazy(() =>
  import('./routes/_app/analysis/map/index.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_app/': {
      id: '/_app/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AppIndexImport
      parentRoute: typeof AppImport
    }
    '/_app/account/profile': {
      id: '/_app/account/profile'
      path: '/account/profile'
      fullPath: '/account/profile'
      preLoaderRoute: typeof AppAccountProfileLazyImport
      parentRoute: typeof AppImport
    }
    '/_app/fleet/aircrafts': {
      id: '/_app/fleet/aircrafts'
      path: '/fleet/aircrafts'
      fullPath: '/fleet/aircrafts'
      preLoaderRoute: typeof AppFleetAircraftsLazyImport
      parentRoute: typeof AppImport
    }
    '/_app/settings/server-info': {
      id: '/_app/settings/server-info'
      path: '/settings/server-info'
      fullPath: '/settings/server-info'
      preLoaderRoute: typeof AppSettingsServerInfoLazyImport
      parentRoute: typeof AppImport
    }
    '/_app/analysis/map/': {
      id: '/_app/analysis/map/'
      path: '/analysis/map'
      fullPath: '/analysis/map'
      preLoaderRoute: typeof AppAnalysisMapIndexLazyImport
      parentRoute: typeof AppImport
    }
    '/_app/data/airports/': {
      id: '/_app/data/airports/'
      path: '/data/airports'
      fullPath: '/data/airports'
      preLoaderRoute: typeof AppDataAirportsIndexLazyImport
      parentRoute: typeof AppImport
    }
    '/_app/settings/configs/': {
      id: '/_app/settings/configs/'
      path: '/settings/configs'
      fullPath: '/settings/configs'
      preLoaderRoute: typeof AppSettingsConfigsIndexLazyImport
      parentRoute: typeof AppImport
    }
    '/_app/settings/enums/': {
      id: '/_app/settings/enums/'
      path: '/settings/enums'
      fullPath: '/settings/enums'
      preLoaderRoute: typeof AppSettingsEnumsIndexLazyImport
      parentRoute: typeof AppImport
    }
    '/_app/settings/roles/': {
      id: '/_app/settings/roles/'
      path: '/settings/roles'
      fullPath: '/settings/roles'
      preLoaderRoute: typeof AppSettingsRolesIndexLazyImport
      parentRoute: typeof AppImport
    }
    '/_app/settings/users/': {
      id: '/_app/settings/users/'
      path: '/settings/users'
      fullPath: '/settings/users'
      preLoaderRoute: typeof AppSettingsUsersIndexLazyImport
      parentRoute: typeof AppImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AppRoute: AppRoute.addChildren({
    AppIndexRoute,
    AppAccountProfileLazyRoute,
    AppFleetAircraftsLazyRoute,
    AppSettingsServerInfoLazyRoute,
    AppAnalysisMapIndexLazyRoute,
    AppDataAirportsIndexLazyRoute,
    AppSettingsConfigsIndexLazyRoute,
    AppSettingsEnumsIndexLazyRoute,
    AppSettingsRolesIndexLazyRoute,
    AppSettingsUsersIndexLazyRoute,
  }),
  LoginRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_app",
        "/login"
      ]
    },
    "/_app": {
      "filePath": "_app.tsx",
      "children": [
        "/_app/",
        "/_app/account/profile",
        "/_app/fleet/aircrafts",
        "/_app/settings/server-info",
        "/_app/analysis/map/",
        "/_app/data/airports/",
        "/_app/settings/configs/",
        "/_app/settings/enums/",
        "/_app/settings/roles/",
        "/_app/settings/users/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_app/": {
      "filePath": "_app/index.tsx",
      "parent": "/_app"
    },
    "/_app/account/profile": {
      "filePath": "_app/account/profile.lazy.tsx",
      "parent": "/_app"
    },
    "/_app/fleet/aircrafts": {
      "filePath": "_app/fleet/aircrafts.lazy.tsx",
      "parent": "/_app"
    },
    "/_app/settings/server-info": {
      "filePath": "_app/settings/server-info.lazy.tsx",
      "parent": "/_app"
    },
    "/_app/analysis/map/": {
      "filePath": "_app/analysis/map/index.lazy.tsx",
      "parent": "/_app"
    },
    "/_app/data/airports/": {
      "filePath": "_app/data/airports/index.lazy.tsx",
      "parent": "/_app"
    },
    "/_app/settings/configs/": {
      "filePath": "_app/settings/configs/index.lazy.tsx",
      "parent": "/_app"
    },
    "/_app/settings/enums/": {
      "filePath": "_app/settings/enums/index.lazy.tsx",
      "parent": "/_app"
    },
    "/_app/settings/roles/": {
      "filePath": "_app/settings/roles/index.lazy.tsx",
      "parent": "/_app"
    },
    "/_app/settings/users/": {
      "filePath": "_app/settings/users/index.lazy.tsx",
      "parent": "/_app"
    }
  }
}
ROUTE_MANIFEST_END */
