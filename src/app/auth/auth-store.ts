import { atom } from 'jotai';

export const isAuthenticatedAtom = atom(false);
export const isLoginModalOpenAtom = atom(false);

export const openLoginModalAtom = atom(null, (_, set) => {
  set(isLoginModalOpenAtom, true);
});

export const closeLoginModalAtom = atom(null, (_, set) => {
  set(isLoginModalOpenAtom, false);
});