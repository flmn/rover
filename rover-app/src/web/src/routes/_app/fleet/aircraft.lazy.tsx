import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@mantine/core";

const Page = () => {
    return (
        <div>
            <Button variant="filled" size="sm">Aircraft</Button>
        </div>
    );
}

export const Route = createLazyFileRoute('/_app/fleet/aircraft')({
    component: Page,
})
