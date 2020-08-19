import React from "react";
import styles from "./FilterSelect.module.css";
import TextField from "@material-ui/core/TextField";

const FilterSelect = () => {
  return (
    <div className={styles.FilterBox}>
      <p>Data Age:</p>

      <div className={styles.FilterInput}>
        <TextField height="75%" id="outlined-basic" label="Number of Days" variant="outlined" />
      </div>
    </div>
  );
};

export default FilterSelect;
