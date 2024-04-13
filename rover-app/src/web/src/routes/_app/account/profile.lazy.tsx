import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_app/account/profile')({
    component: () => <div>Hello /_app/account/profile!</div>
})