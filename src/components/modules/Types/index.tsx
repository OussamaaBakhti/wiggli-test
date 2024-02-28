import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../Layout";
import pokemonStore, {
  typesPokemonStore,
} from "../../../state-managment/store";

import styles from "./types.module.scss";
import allPokemonStore from "../../../state-managment/store";
import SkeletonLoading from "../../elements/Sceleton";
import Pagination from "../../elements/Pagination";

const Types = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  const { fetchPokemonTypes, types, typesError, typesLoading } =
    typesPokemonStore();
  const { fetchByType, loading, error, data } = allPokemonStore();
  const [selectedType, setSelectedType] = useState("normal");
  const [offset, setOffset] = useState(0);
  const totalPages = Math.ceil(data.count / 20);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState([]);

  useEffect(() => {
    fetchPokemonTypes();
  }, []);

  useEffect(() => {
    setSelectedType(type);
  }, [type]);

  useEffect(() => {
    if (selectedType) fetchByType({ type: selectedType });
  }, [selectedType]);

  const handleSelectType = (event) => {
    setSelectedType(event.target.value);
    setOffset(0);
  };
  useEffect(() => {
    if (selectedType) {
      setPaginationData(data.results.slice(offset, offset + 20));
    }
  }, [data, offset]);

  return (
    <Layout>
      <div>
        {!type && (
          <div className={styles.filter}>
            Search by type:
            <select onChange={handleSelectType} value={selectedType}>
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
        )}
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
                          `/pokemon/${
                            item.name ? item.name : item.pokemon.name
                          }`
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
      </div>
    </Layout>
  );
};

export default Types;
