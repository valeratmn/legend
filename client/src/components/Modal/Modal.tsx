import { Container, Modal as ModalMUI } from "@material-ui/core";
import styles from './Modal.module.css';
import { memo } from "react";

interface IModalProps {
    children: React.ReactElement
    isOpen: boolean;
    onClose: () => void;
}

function Modal({children, isOpen, onClose}: IModalProps) {
  return (
    <ModalMUI open={isOpen} onClose={onClose} className={styles.ModalMUI}>
      <Container className={styles.modalContainer}>
        {children}
      </Container>
    </ModalMUI>
  );
}

export default memo(Modal)