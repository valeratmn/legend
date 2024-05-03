import React from "react";
import { List, ListItem } from "@material-ui/core";
import { Gift } from "../../types";
import Modal from "../Modal/Modal";

interface IGiftsProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (gift: Gift) => void;
  gifts: Gift[];    
}
function Gifts({ isOpen, onClose, onSelect, gifts }: IGiftsProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <List>
        {gifts.map((gift) => (
          <ListItem key={gift.id} button onClick={() => onSelect(gift)}>
            {gift.name} - Осталось: {gift.balance} - Сгорает:{" "}
            {new Date(gift.dateUntil).toLocaleDateString()} - Номинал:{" "}
            {gift.nominal}
          </ListItem>
        ))}
      </List>
    </Modal>
  );
}

export default React.memo(Gifts);
