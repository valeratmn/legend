import React from "react";
import { Button } from "@material-ui/core";
import styles from './Dialog.module.css';
import Modal from "../Modal/Modal";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function Dialog({ isOpen, onClose, onConfirm }: DialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.dialog}>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="primary"
        >
          Подтвердить
        </Button>
      </div>
    </Modal>
  );
}

export default React.memo(Dialog);

