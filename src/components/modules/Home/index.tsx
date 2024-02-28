import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../Layout";
import Pagination from "../../elements/Pagination";

import pokemonStore, {
  AllPokemonState,
  PokemonTypesState,
  typesPokemonStore,
} from "../../../state-managment/store";

import styles from "./home.module.scss";
import SkeletonLoading from "../../elements/Sceleton";

const Home = () => {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const { data, loading, error, fetchData, fetchByType }: AllPokemonState =
    pokemonStore();
  const {
    types,
    typesLoading,
    typesError,
    fetchPokemonTypes,
  }: PokemonTypesState = typesPokemonStore();
  const totalPages = Math.ceil(data.count / 20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [paginationData, setPaginationData] = useState([]);

  useEffect(() => {
    fetchPokemonTypes();
  }, []);

  useEffect(() => {
    if (!selectedType) {
      fetchData({ offset: offset });
    } else if (selectedType !== "") {
      fetchByType({ type: selectedType });
    }
  }, [selectedType, offset]);

  useEffect(() => {
    if (selectedType) {
      setPaginationData(data.results.slice(offset, offset + 20));
    } else {
      setPaginationData(data.results);
    }
  }, [data]);

  const handleSelectType = (event) => {
    setSelectedType(event.target.value);
    setOffset(0);
  };

  return (
    <Layout>
      <div className={styles.filter}>
        filter by type:
        <select onChange={handleSelectType}>
          {types.results.length && (
            <>
              <option value="">---</option>
              {types.results.map((type) => (
                <option value={type.name}>{type.name}</option>
              ))}
            </>
          )}
        </select>
      </div>
      {loading ? (
        <SkeletonLoading />
      ) : paginationData?.length ? (
        <>
          <div className={styles.homeContainer}>
            {paginationData.map((item) => (
              <div
                className={styles.card}
                key={item.name ? item.name : item.pokemon.name}
              >
                <div className={styles.cardHeader}>
                  {item.name ? item.name : item.pokemon.name}
                </div>
                <div className={styles.cardFooter}>
                  <button
                    onClick={() =>
                      navigate(
                        `/pokemon/${item.name ? item.name : item.pokemon.name}`
                      )
                    }
                    className={styles.button}
                  >
                    Détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>No data available</div>
      )}
      {error && <>Error</>}
      <div className={styles.pagination}>
        <Pagination
          offset={offset}
          setOffset={setOffset}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </Layout>
  );
};

export default Home;
