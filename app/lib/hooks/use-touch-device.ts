import { useSyncExternalStore } from "react";
import { getIsTouchDevice } from "../utils";

// Subscribe to touch device state (static - doesn't change)
const subscribe = () => () => { };
const getSnapshot = () => getIsTouchDevice();
const getServerSnapshot = () => true; // Assume touch on server to skip rendering

/**
 * Hook to detect if the current device is a touch device.
 * Safe for SSR - returns true as fallback to hide touch-specific features during SSR.
 */
export function useTouchDevice(): boolean {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
