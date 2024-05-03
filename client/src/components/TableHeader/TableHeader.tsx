import React from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";

interface ITableHeaderProps {
  sortField: string;
  sortOrder: "asc" | "desc";
  onSortChange: (field: string) => void;
}

function TableHeader({
  sortField,
  sortOrder,
  onSortChange,
}: ITableHeaderProps) {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <TableSortLabel
            active={sortField === "name"}
            direction={sortField === "name" ? sortOrder : "asc"}
            onClick={() => onSortChange("name")}
          >
            Название рассылки
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={sortField === "createdAt"}
            direction={sortField === "createdAt" ? sortOrder : "asc"}
            onClick={() => onSortChange("createdAt")}
          >
            Дата рассылки
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={sortField === "giftsCount"}
            direction={sortField === "giftsCount" ? sortOrder : "asc"}
            onClick={() => onSortChange("giftsCount")}
          >
            Кол-во отправленных подарков
          </TableSortLabel>
        </TableCell>
        <TableCell>Отмена рассылки (Удалить)</TableCell>
        <TableCell>Редактировать рассылку (редактировать)</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default React.memo(TableHeader);
