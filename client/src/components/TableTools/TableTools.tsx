import { memo } from "react";
import { Button } from "@material-ui/core";
import styles from "./TableTools.module.css";
import Search from "../Search/Search";

interface ITableHeaderProps {
  onOpen: () => void;
  searchValue: string;
  setSearchValue: (search: string) => void;
}

function TableTools({ onOpen, searchValue, setSearchValue }: ITableHeaderProps) {
  return (
    <div className={styles.tableTools}>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <Button variant="contained" color="primary" onClick={onOpen}>
        Добавить
      </Button>
    </div>
  );
}

export default memo(TableTools);

