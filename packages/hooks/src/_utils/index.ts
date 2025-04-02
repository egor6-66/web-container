import { useEffect, useLayoutEffect } from 'react';

export * as iDB from './iDB';
export * from './onOff';
export * from './storageManager';
export const noop = () => {};
export const isBrowser = typeof window !== 'undefined';
export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
