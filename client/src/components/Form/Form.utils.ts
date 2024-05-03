import * as Yup from "yup";
import { FormikErrors } from "formik";
import { CampaignFormValues } from "../../types";

export const validationSchema = Yup.object({
  name: Yup.string().required("Название обязательно"),
  description: Yup.string().required("Описание обязательно"),
  giftsCount: Yup.number()
    .required("Количество подарков обязательно")
    .min(1, "Минимальное количество подарков 1")
    .positive("Количество подарков должно быть больше 0")
    .integer("Количество подарков должно быть целым числом"),
  daysToTakeGift: Yup.number()
    .required("Количество дней на взятие подарка обязательно")
    .min(1, "Минимальное количество дней на взятие подарка 1")
    .positive("Количество дней на взятие подарка должно быть больше 0")
    .integer("Количество дней на взятие подарка должно быть целым числом"),
  daysToReceiveGift: Yup.number()
    .required("Количество дней на получение подарка обязательно")
    .min(1, "Минимальное количество дней на получение подарка 1")
    .positive("Количество дней на получение подарка должно быть больше 0")
    .integer("Количество дней на получение подарка должно быть целым числом"),
  cardNumbers: Yup.string().required("Номера карт обязательны"),
});

export function getButtonStyles(errors: FormikErrors<CampaignFormValues>) {
  return {
    ...(Object.keys(errors).length > 0 && { opacity: 0.5 }),
  };
}
