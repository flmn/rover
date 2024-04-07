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
import { Route as AppFleetAircraftsImport } from './routes/_app/fleet/aircrafts'

// Create Virtual Routes

const AppSettingsUsersLazyImport = createFileRoute('/_app/settings/users')()
const AppSettingsServerInfoLazyImport = createFileRoute(
  '/_app/settings/server-info',
)()
const AppSettingsRolesLazyImport = createFileRoute('/_app/settings/roles')()
const AppSettingsEnumsLazyImport = createFileRoute('/_app/settings/enums')()
const AppSettingsConfigsLazyImport = createFileRoute('/_app/settings/configs')()

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

const AppSettingsUsersLazyRoute = AppSettingsUsersLazyImport.update({
  path: '/settings/users',
  getParentRoute: () => AppRoute,
} as any).lazy(() =>
  import('./routes/_app/settings/users.lazy').then((d) => d.Route),
)

const AppSettingsServerInfoLazyRoute = AppSettingsServerInfoLazyImport.update({
  path: '/settings/server-info',
  getParentRoute: () => AppRoute,
} as any).lazy(() =>
  import('./routes/_app/settings/server-info.lazy').then((d) => d.Route),
)

const AppSettingsRolesLazyRoute = AppSettingsRolesLazyImport.update({
  path: '/settings/roles',
  getParentRoute: () => AppRoute,
} as any).lazy(() =>
  import('./routes/_app/settings/roles.lazy').then((d) => d.Route),
)

const AppSettingsEnumsLazyRoute = AppSettingsEnumsLazyImport.update({
  path: '/settings/enums',
  getParentRoute: () => AppRoute,
} as any).lazy(() =>
  import('./routes/_app/settings/enums.lazy').then((d) => d.Route),
)

const AppSettingsConfigsLazyRoute = AppSettingsConfigsLazyImport.update({
  path: '/settings/configs',
  getParentRoute: () => AppRoute,
} as any).lazy(() =>
  import('./routes/_app/settings/configs.lazy').then((d) => d.Route),
)

const AppFleetAircraftsRoute = AppFleetAircraftsImport.update({
  path: '/fleet/aircrafts',
  getParentRoute: () => AppRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_app': {
      preLoaderRoute: typeof AppImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_app/': {
      preLoaderRoute: typeof AppIndexImport
      parentRoute: typeof AppImport
    }
    '/_app/fleet/aircrafts': {
      preLoaderRoute: typeof AppFleetAircraftsImport
      parentRoute: typeof AppImport
    }
    '/_app/settings/configs': {
      preLoaderRoute: typeof AppSettingsConfigsLazyImport
      parentRoute: typeof AppImport
    }
    '/_app/settings/enums': {
      preLoaderRoute: typeof AppSettingsEnumsLazyImport
      parentRoute: typeof AppImport
    }
    '/_app/settings/roles': {
      preLoaderRoute: typeof AppSettingsRolesLazyImport
      parentRoute: typeof AppImport
    }
    '/_app/settings/server-info': {
      preLoaderRoute: typeof AppSettingsServerInfoLazyImport
      parentRoute: typeof AppImport
    }
    '/_app/settings/users': {
      preLoaderRoute: typeof AppSettingsUsersLazyImport
      parentRoute: typeof AppImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AppRoute.addChildren([
    AppIndexRoute,
    AppFleetAircraftsRoute,
    AppSettingsConfigsLazyRoute,
    AppSettingsEnumsLazyRoute,
    AppSettingsRolesLazyRoute,
    AppSettingsServerInfoLazyRoute,
    AppSettingsUsersLazyRoute,
  ]),
  LoginRoute,
])

/* prettier-ignore-end */
