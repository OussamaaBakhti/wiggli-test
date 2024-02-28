import axios from "axios";
import { create, SetState, StoreApi } from "zustand";

export interface PokemonState {
  data: {
    name: string;
    sprites: {
      front_default: string;
    };
    stats: {
      base_stat: string;
    }[];
    types: {
      type: {
        name: string;
      };
    }[];
  };
  loading: boolean;
  error: string;
  fetchPokemon: ({ pokemon }: { pokemon: string }) => void;
}

export const pokemonStore = create<PokemonState>((set) => ({
  data: {
    name: "",
    sprites: {
      front_default: "",
    },
    stats: [
      {
        base_stat: "",
      },
    ],
    types: [
      {
        type: {
          name: "",
        },
      },
    ],
  },
  loading: false,
  error: null,
  fetchPokemon: async ({ pokemon }: { pokemon: string }) => {
    try {
      set({ loading: true });
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      set({ data: response.data, loading: false }); // Assuming results is an array
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default pokemonStore;
