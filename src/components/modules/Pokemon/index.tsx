import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../Layout";
import pokemonStore from "../../../state-managment/pokemon";
import { useParams } from "react-router-dom";
import styles from "./pokemon.module.scss";
import SkeletonLoading from "../../elements/Sceleton";
import axios from "axios";

const Pokemon = () => {
  const navigate = useNavigate();
  const { name } = useParams();

  const { data, loading, error, fetchPokemon } = pokemonStore();
  const [openModal, setOpenModal] = useState(false);
  const [evolutionsData, setEvolutionsData] = useState<{
    chain: {
      evolves_to: {
        species: {
          name: string;
          url: string;
        };
      }[];
    };
  }>();

  const fetchEvolution = async (pokemon) => {
    if (pokemon) {
      let result = await axios.get(pokemon?.species?.url);
      console.log("result: ", result.data);
      if (result.data) {
        let evolutions = await axios.get(result?.data?.evolution_chain?.url);
        console.log("evolutions.data", evolutions.data);
        setEvolutionsData(evolutions.data);
      }
    }
  };

  useEffect(() => {
    if (name) {
      fetchPokemon({ pokemon: name.toLowerCase() });
    }
  }, [name]);

  //   useEffect(() => {
  //     if (data) {
  //       fetchEvolution(data);
  //     }
  //   }, [data]);

  const handleTypeClick = (type) => {
    // Handle clicking on a type (for example, navigate to a page showing Pokémon of that type)
    // Example:
    navigate(`/types/${type}`);
  };

  return (
    <Layout>
      {loading ? (
        <SkeletonLoading />
      ) : (
        <div className={styles.bigCard}>
          <div className={styles.infoCard}>
            <img src={data?.sprites?.front_default} alt={data.name} />
            <h2>{data.name}</h2>
          </div>
          <div className={styles.types}>
            <p className={styles.maxStatsTitle}>Types:</p>
            <div className={styles.typeList}>
              {data?.types?.map((type) => (
                <span
                  key={type.type.name}
                  className={styles.type}
                  onClick={() => handleTypeClick(type.type.name)}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className={styles.maxStatsTitle}>Stats:</p>
            {data.stats && data.stats.length && (
              <div className={styles.maxStatsList}>
                <div className={styles.maxStatItem}>
                  <span className={styles.statName}>HP:</span>
                  <span className={styles.statValue}>
                    {data?.stats[0]?.base_stat}
                  </span>
                </div>
                <div className={styles.maxStatItem}>
                  <span className={styles.statName}>Attack:</span>
                  <span className={styles.statValue}>
                    {data?.stats[1]?.base_stat}
                  </span>
                </div>
                <div className={styles.maxStatItem}>
                  <span className={styles.statName}>Defense:</span>
                  <span className={styles.statValue}>
                    {data?.stats[2]?.base_stat}
                  </span>
                </div>
                <div className={styles.maxStatItem}>
                  <span className={styles.statName}>Special Attack:</span>
                  <span className={styles.statValue}>
                    {data?.stats[3]?.base_stat}
                  </span>
                </div>
                <div className={styles.maxStatItem}>
                  <span className={styles.statName}>Special Defense:</span>
                  <span className={styles.statValue}>
                    {data?.stats[4]?.base_stat}
                  </span>
                </div>
                <div className={styles.maxStatItem}>
                  <span className={styles.statName}>Speed:</span>
                  <span className={styles.statValue}>
                    {data?.stats[5]?.base_stat}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className={styles.evolutionHeader}>
            <button
              className={styles.button}
              onClick={() => fetchEvolution(data)}
            >
              Show possible evolutions
            </button>
            <div className={styles.evolutionContainer}>
              {evolutionsData &&
                evolutionsData?.chain &&
                evolutionsData?.chain?.evolves_to.map((ev) => (
                  <div
                    className={styles.evolution}
                    onClick={() => {
                      setEvolutionsData(null);
                      navigate(`/pokemon/${ev.species.name}`);
                    }}
                  >
                    {ev.species.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      <div>{error && error}</div>
    </Layout>
  );
};

export default Pokemon;
