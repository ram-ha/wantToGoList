import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export interface ICountry {
    text: string;
    id: number;
    category: 'WANT_TO_GO' | 'VISITED' | 'LOVED';
}
const { persistAtom: countryPersist } = recoilPersist({
    key: 'countryLocalStorage',
    storage: localStorage,
});

export const countryState = atom<ICountry[]>({
    key: 'country',
    default: [],
    effects_UNSTABLE: [countryPersist],
});

export const toGoSelector = selector({
    key: 'toGoSelector',
    get: ({ get }) => {
        const toGo = get(countryState);
        return [
            toGo.filter((toGo) => toGo.category === 'WANT_TO_GO'),
            toGo.filter((toGo) => toGo.category === 'VISITED'),
            toGo.filter((toGo) => toGo.category === 'LOVED'),
        ];
    },
});
