import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_app/settings/info')({
    component: () => <div>Hello /_app/settings/info!</div>
})