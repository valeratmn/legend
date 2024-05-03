import { memo } from "react";
import { Button, TableCell, TableRow } from "@material-ui/core";
import { Campaign } from "../../types";

interface ITableItemProps {
  campaign: Campaign;
  onDelete: (id: number) => void;
  onEdit: (campaign: Campaign) => void;
}

function TableItem({
  campaign,
  onDelete,
  onEdit,
}: ITableItemProps) {
  const { name, giftsCount, createdAt, id } = campaign;
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{new Date(createdAt).toLocaleDateString()}</TableCell>
      <TableCell>{giftsCount}</TableCell>
      <TableCell>
        <Button variant="contained" color="secondary" onClick={() => onDelete(id)}>
          Удалить
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="contained" color="primary" onClick={() => onEdit(campaign)}>
          Редактировать
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default memo(TableItem);
