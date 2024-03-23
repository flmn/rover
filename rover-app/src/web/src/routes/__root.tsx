import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const RootLayout = () => {
    return (
        <>
            <Outlet/>
            <TanStackRouterDevtools/>
        </>
    );
}

export const Route = createRootRoute({
    component: RootLayout,
})
