import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@mantine/core";

const Page = () => {
    return (
        <div>
            <Button variant="filled" size="sm">Dashboard</Button>
        </div>
    );
}

export const Route = createFileRoute('/_app/')({
    component: Page,
})
