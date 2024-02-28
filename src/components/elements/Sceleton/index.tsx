import React from "react";
import styles from "./skeletonLoading.module.scss"; // Import your CSS module

const SkeletonLoading = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonCard}>
        <div className={styles.skeletonCardHeader}></div>
        <div className={styles.skeletonCardBody}></div>
        <div className={styles.skeletonCardFooter}></div>
      </div>
      <div className={styles.skeletonCard}>
        <div className={styles.skeletonCardHeader}></div>
        <div className={styles.skeletonCardBody}></div>
        <div className={styles.skeletonCardFooter}></div>
      </div>
      <div className={styles.skeletonCard}>
        <div className={styles.skeletonCardHeader}></div>
        <div className={styles.skeletonCardBody}></div>
        <div className={styles.skeletonCardFooter}></div>
      </div>
      <div className={styles.skeletonCard}>
        <div className={styles.skeletonCardHeader}></div>
        <div className={styles.skeletonCardBody}></div>
        <div className={styles.skeletonCardFooter}></div>
      </div>
      <div className={styles.skeletonCard}>
        <div className={styles.skeletonCardHeader}></div>
        <div className={styles.skeletonCardBody}></div>
        <div className={styles.skeletonCardFooter}></div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
