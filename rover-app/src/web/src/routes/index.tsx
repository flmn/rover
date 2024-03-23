import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@mantine/core";

const Page = () => {
    return (
        <div>
            <Button variant="filled" size="sm">Button</Button>
        </div>
    );
}

export const Route = createFileRoute('/')({
    component: Page,
})
