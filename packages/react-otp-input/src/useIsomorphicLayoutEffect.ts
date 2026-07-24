import { useEffect, useLayoutEffect } from 'react'

/**
 * `useLayoutEffect` on the client, `useEffect` on the server. Calling
 * `useLayoutEffect` during `renderToString` triggers React's "does nothing on
 * the server" warning; swapping it out on the server keeps SSR output quiet
 * while preserving the pre-paint timing (caret injection, spatial measurement)
 * that only matters in the browser anyway.
 */
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
