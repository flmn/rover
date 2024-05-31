import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_app/fleet/aircrafts')({
  component: () => <div>Hello /_app/fleet/aircrafts!</div>
})