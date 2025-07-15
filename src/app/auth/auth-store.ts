import { atom } from 'jotai';

export const isAuthenticatedAtom = atom(false);
export const isLoginModalOpenAtom = atom(false);

export const openLoginModalAtom = atom(null, (get, set) => {
  set(isLoginModalOpenAtom, true);
});

export const closeLoginModalAtom = atom(null, (get, set) => {
  set(isLoginModalOpenAtom, false);
});