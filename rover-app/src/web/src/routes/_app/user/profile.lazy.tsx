import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_app/user/profile')({
    component: () => <div>Hello /_app/user/profile!</div>
})