import axios from "axios";
import { create, SetState, StoreApi } from "zustand";

// Define the type for the state
export interface AllPokemonState {
  data: {
    count: number;
    next: string;
    previous: string;
    results: { name: string; url: string }[];
  };
  loading: boolean;
  error: string;
  fetchData: ({ offset }: { offset: number }) => void;
  fetchByType: ({ type }: { type: string }) => void;
}

export interface PokemonTypesState {
  types: {
    count: number;
    next: string;
    previous: string;
    results: { name: string; url: string }[];
  };
  typesLoading: boolean;
  typesError: string;
  fetchPokemonTypes: () => void;
}

// Pass the type to create
const allPokemonStore = create<AllPokemonState>((set) => ({
  data: {
    count: 0,
    next: "",
    previous: "",
    results: [],
  },
  loading: false,
  error: null,
  fetchData: async ({ offset }) => {
    try {
      set({ loading: true });
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
      );
      set({ data: response.data, loading: false }); // Assuming results is an array
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  fetchByType: async ({ type }: { type: string }) => {
    try {
      set({ loading: true });
      const response = await axios.get(
        `https://pokeapi.co/api/v2/type/${type}`
      );
      console.log("response", response.data.pokemon);
      set({
        data: {
          count: response.data.pokemon.length,
          results: response.data.pokemon,
          next: "",
          previous: "",
        },
        loading: false,
      }); // Assuming results is an array
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export const typesPokemonStore = create<PokemonTypesState>((set) => ({
  types: {
    count: 0,
    next: "",
    previous: "",
    results: [],
  },
  typesLoading: false,
  typesError: null,
  fetchPokemonTypes: async () => {
    try {
      set({ typesLoading: true });
      const response = await axios.get(`https://pokeapi.co/api/v2/type`);
      set({ types: response.data, typesLoading: false }); // Assuming results is an array
    } catch (error) {
      set({ typesError: error.message, typesLoading: false });
    }
  },
}));

export default allPokemonStore;
