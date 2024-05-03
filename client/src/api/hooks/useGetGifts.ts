import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchGifts } from "../api";
import { setGifts, setLoading } from "../../redux/slices";

function useGetGifts() {
  const dispatch = useAppDispatch();
  const { gifts } = useAppSelector((state) => state.gift);

  useEffect(() => {
    const getGifts = async () => {
      try {
        const response = await fetchGifts();
        dispatch(setGifts(response));
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    getGifts();
  }, []);

  return gifts;
}

export default useGetGifts;
