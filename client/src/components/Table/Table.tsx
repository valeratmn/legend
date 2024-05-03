import { useState, useEffect, memo, useCallback } from "react";
import { Table, TableBody, TablePagination } from "@material-ui/core";
import TableItem from "../TableItem/TableItem";
import { fetchCampaigns } from "../../api/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setCampaigns,
  setTotal,
} from "../../redux/slices";
import TableHeader from "../TableHeader/TableHeader";
import { Campaign } from "../../types";
import { selectCampaign } from "../../redux/slices";
import useCampaignActions from "../../api/hooks/useCampaignActions";

interface ITableCampaignsProps {
  searchQuery: string;
  onOpenEditForm: () => void;
}

function TableCampaigns({ searchQuery, onOpenEditForm }: ITableCampaignsProps) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { campaigns, total } = useAppSelector((state) => state.campaign);
  const dispatch = useAppDispatch();

  const { onDeleteCampaign } = useCampaignActions();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCampaigns({
        page,
        limit,
        sortField,
        sortOrder,
        searchQuery,
      });
      dispatch(setCampaigns(data.campaigns));
      dispatch(setTotal(data.total));
    };
    fetchData();
  }, [page, limit, sortField, sortOrder, searchQuery]);

  const handleSortChange = useCallback(
    (field: string) => {
      const isAsc = sortField === field && sortOrder === "asc";
      setSortOrder(isAsc ? "desc" : "asc");
      setSortField(field);
    },
    [sortField, sortOrder]
  );


  const onEditCampaign = (campaign: Campaign) => {
    dispatch(selectCampaign(campaign));
    onOpenEditForm();
  };

  return (
    <Table>
      <TableHeader
        sortField={sortField}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
      <TableBody>
        {campaigns.map((campaign: Campaign) => (
          <TableItem
            key={campaign.id}
            campaign={campaign}
            onDelete={onDeleteCampaign}
            onEdit={onEditCampaign}
          />
        ))}
      </TableBody>
      <TablePagination
        count={total}
        page={page}
        onPageChange={(_e, page) => setPage(page)}
        onRowsPerPageChange={(e) => setLimit(parseInt(e.target.value, 10))}
        rowsPerPageOptions={[3, 5, 10]}
        rowsPerPage={limit}
      />
    </Table>
  );
}

export default memo(TableCampaigns);
