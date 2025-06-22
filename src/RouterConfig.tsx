import {
  Router,
  Route,
  RootRoute,
  RouterProvider,
  Outlet,
  redirect
} from '@tanstack/react-router'
import CharacterList from './Components/CharacterList';
import Character from './Components/Character';

const rootRoute = new RootRoute({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
})

export  const characterListRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/characterList/page/$pageNumber',
  component: CharacterList,
})

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({
      to: '/characterList/page/$pageNumber',
      params: { pageNumber: '1' },
    });
  },
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/character',
  component: Character,
})

const routeTree = rootRoute.addChildren([homeRoute,characterListRoute, aboutRoute])
export const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

