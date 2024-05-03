import { memo, useRef, useState } from "react";
import {
  Formik,
  Form as FormikForm,
  Field,
  ErrorMessage,
  FormikProps,
} from "formik";
import { Button, TextField } from "@material-ui/core";
import Modal from "../Modal/Modal";
import Dialog from "../Dialog/Dialog";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectCampaign,
} from "../../redux/slices";
import styles from "./Form.module.css";

import { Campaign, CampaignFormValues, Gift } from "../../types";
import Gifts from "../Gifts/Gifts";
import { getButtonStyles, validationSchema } from "./Form.utils";
import useGetGifts from "../../api/hooks/useGetGifts";
import useCampaignActions from "../../api/hooks/useCampaignActions";

interface IFormProps {
  isOpen: boolean;
  onClose: () => void;
}

function Form({ isOpen, onClose }: IFormProps) {
  const { selectedCampaign } = useAppSelector((state) => state.campaign);
  const [isConfirmWindowOpened, setIsConfirmWindowOpened] = useState(false);
  const [isGiftModalOpen, setGiftModalOpen] = useState(false);
  const formikRef = useRef<FormikProps<CampaignFormValues>>(null);
  
  const gifts = useGetGifts();
  const { onCreateCampaign, onUpdateCampaign } = useCampaignActions();
  
  const dispatch = useAppDispatch();

  const onCloseConfirmWindow = () => setIsConfirmWindowOpened(false);

  const onSelectGift = (gift: Gift) => {
    if (formikRef.current) {
      formikRef.current.setFieldValue("giftId", gift.id);
      formikRef.current.setFieldTouched("giftId", true);
      setGiftModalOpen(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          innerRef={formikRef}
          initialValues={
            selectedCampaign || {
              name: "",
              description: "",
              giftsCount: 0,
              daysToTakeGift: 0,
              daysToReceiveGift: 0,
              cardNumbers: "",
              giftId: null,
            }
          }
          onSubmit={(values, { setSubmitting }) => {
            selectedCampaign
              ? onUpdateCampaign(values as Campaign)
              : onCreateCampaign(values as Campaign);
            setSubmitting(false);
          }}
          validationSchema={validationSchema}
        >
          {({ isSubmitting, errors, submitForm, values }) => {
            const selectedGift = gifts.find(
              (gift) => gift.id === values.giftId
            );

            return (
              <FormikForm className={styles.form}>
                <Field as={TextField} name="name" label="Название рассылки" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.error}
                />
                <Field
                  as={TextField}
                  name="description"
                  label="Описание акции"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className={styles.error}
                />
                <Button onClick={() => setGiftModalOpen(true)}>
                  Выбрать подарок
                </Button>
                {selectedGift && <div>Выбран подарок: {selectedGift.name}</div>}
                <Field
                  as={TextField}
                  type="number"
                  name="giftsCount"
                  label="Кол-во подарков"
                />
                <ErrorMessage
                  name="giftsCount"
                  component="div"
                  className={styles.error}
                />
                <Field
                  as={TextField}
                  type="number"
                  name="daysToTakeGift"
                  label="Кол-во дней на взятие подарка"
                />
                <ErrorMessage
                  name="daysToTakeGift"
                  component="div"
                  className={styles.error}
                />
                <Field
                  as={TextField}
                  type="number"
                  name="daysToReceiveGift"
                  label="Кол-во дней на получение подарка"
                />
                <ErrorMessage
                  name="daysToReceiveGift"
                  component="div"
                  className={styles.error}
                />
                <Field as={TextField} name="cardNumbers" label="Номера карт" />
                <ErrorMessage
                  name="cardNumbers"
                  component="div"
                  className={styles.error}
                />
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={() => setIsConfirmWindowOpened(true)}
                  style={getButtonStyles(errors)}
                >
                  {selectedCampaign ? "Обновить" : "Создать"}
                </Button>
                <Dialog
                  isOpen={isConfirmWindowOpened}
                  onClose={onCloseConfirmWindow}
                  onConfirm={() => {
                    submitForm();
                    onCloseConfirmWindow();
                    onClose();
                    dispatch(selectCampaign(null));
                  }}
                />
              </FormikForm>
            );
          }}
        </Formik>
      </Modal>
      <Gifts
        isOpen={isGiftModalOpen}
        onClose={() => setGiftModalOpen(false)}
        onSelect={onSelectGift}
        gifts={gifts}
      />
    </>
  );
}
export default memo(Form);
