import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@mantine/core";

const Page = () => {
    return (
        <div>
            <Button variant="filled" size="sm">Enum</Button>
        </div>
    );
}

export const Route = createLazyFileRoute('/_app/settings/enum')({
    component: Page,
})
