import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
// import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Card,
  CircularProgress,
  Modal,
  TextField,
  Typography,
  Avatar,
  Badge,
} from "@mui/material";
// import {makeStyles } from '@material-ui/core';
import { Box, Stack } from "@mui/system";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import SnackBarUI from "../../common/SnackUI";
import { addPaymentRequestAction } from "../../redux/toolkit/payments/add-payment-request";
import { paymentRequestListAction } from "../../redux/toolkit/payments/payment-request-lists";
import { paymentRequestDetailsAction } from "../../redux/toolkit/payments/payment-request-details";

// schema
const catSchema = yup
  .object()
  .shape({
    amount: yup
      .number()
      .positive()
      .nullable()
      .required("Amount is required.")
      .typeError("Amount must be a positive value"),
  })
  .required();

export default function CreateCategory({ state, setState, paymentId }) {
  console.log("paymentId-->", paymentId);
  // state
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({ resolver: yupResolver(catSchema) });

  const dispatch = useDispatch();
  const createCat = useSelector((state) => state.paymetnDetail);
  const { status, message, data, loading } = createCat;

  const [snack, setSnack] = useState(false);

  // fn

  useEffect(() => {
    if (state) {
      console.log("useEffect-->");
      dispatch(paymentRequestDetailsAction(paymentId));
    }
  }, [paymentId, state]);

  const handleClose = function () {
    setState(false);
  };

  return (
    <>
      <Modal
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
        }}
        sx={{ overflow: "scroll" }}
        open={state}
        onClose={handleClose}
      >
        <Box className="modal_box" >
          <Card sx={{ width: 500, p: 5 }}>
            <Typography variant="h5" sx={{ mb: 5 }} align="center">
              Paymemt Details
            </Typography>
            <Stack spacing={3}>
              {Object.entries(data).map(([key, value]) => (
            
                <div key={key} style={{display:'flex',justifyContent:'space-between'}}>
                  {/* {key.filter(key=>key)} */}
                  <Typography variant="subtitle1">{ key.toUpperCase()}:</Typography>
                  <Typography>{  key === 'invoice' ? <img src={value} width="100" height="100"/>:value} </Typography>
                </div>
              ))}

              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="error" onClick={handleClose}>
                  Close
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Box>
      </Modal>

      <SnackBarUI
        state={snack}
        setState={setSnack}
        status={status}
        message={message}
      />
      <DevTool control={control} />
    </>
  );
}

CreateCategory.propTypes = {
  state: PropTypes.any,
  setState: PropTypes.any,
};
