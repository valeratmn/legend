import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addCampaign, updateCampaign as updateCampaignInState, deleteCampaign as deleteCampaignFromState } from "../../redux/slices";
import { createCampaign, updateCampaign, deleteCampaign } from "../api";
import { Campaign } from "../../types";

const useCampaignActions = () => {
  const dispatch = useAppDispatch();
  const { selectedCampaign } = useAppSelector(state => state.campaign);

  const onCreateCampaign = async (values: Campaign) => {
    try {
      const response = await createCampaign(values);
      if (response.message === "Ok") {
        dispatch(addCampaign({ ...values, id: response.id }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateCampaign = async (values: Campaign) => {
    if (selectedCampaign) {
      try {
        const updatedData = { ...values };
        delete updatedData.createdAt;
        const response = await updateCampaign(selectedCampaign.id, updatedData);
        if (response.message === "Ok") {
          dispatch(updateCampaignInState(values));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No campaign selected");
    }
  };
  
  const onDeleteCampaign = async (id: number) => {
    try {
      const response = await deleteCampaign(id);
      if ((response.message = "Ok")) {
        dispatch(deleteCampaignFromState(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { onCreateCampaign, onUpdateCampaign, onDeleteCampaign };
};

export default useCampaignActions;