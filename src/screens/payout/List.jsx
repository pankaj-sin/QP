import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  CardActionArea,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import {
  createSearchParams,
  Link as LinkRRD,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { appListAction } from "../../redux/toolkit/apps/list";
import RestoreIcon from "@mui/icons-material/Restore";
import EditIcon from "@mui/icons-material/Edit";
import NoDataFound from "../../common/NoDataFound";
import LoadingUI from "../../common/LoadingUI";
import Avatar from "@mui/material/Avatar";
import { paymentRequestListAction } from "../../redux/toolkit/payments/payment-request-lists";
import PaymentRequest from "./PaymentRequest";
import PaymentDetails from "./PaymentDetails";
import { bankListAction } from "../../redux/toolkit/accountDetail.jsx/banklist";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DoneIcon from "@mui/icons-material/Done";
import BlockIcon from "@mui/icons-material/Block";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

// import EditIcon from '@mui/icons-material/Edit'

function List() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [publisher_id, setPublisher_id] = useState();
  const [pageSize, setPageSize] = useState(5);
  const [ativeFilter, setActiveFilter] = useState(false);
  const [createPay, setCreatePay] = useState(false);
  const [payDetail, setPayDetail] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  const paymentList = useSelector((state) => state.paymentList);
  const { status, data, loading: listLoading } = paymentList;
  const bankList = useSelector((state) => state.listBank);
  const { status: bankStatus, data: bankData, loading: bankLoading } = bankList;

  const myProfile = useSelector((state) => state.myProfile);
  const {
    status: profileStatus,
    data: profileData,
    loading: profileLoading,
  } = myProfile;
  

  useEffect(() => {
    dispatch(paymentRequestListAction({ page: 0, limit: 100 }));
    dispatch(bankListAction());
  }, [dispatch]);

  const AppColumns = [
    {
      field: "s_no",
      headerName: "S. No.",
      filterable: false,
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => params?.api?.getRowIndex(params.row._id) + 1,
    },
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      minWidth: 300,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <Typography
            color="primary"
            onClick={() => {
              setPaymentId(params?.row?._id);
              setPayDetail(true);
            }}
          >
            {params?.row?._id}
          </Typography>
        );
      },
    },
    {
      field: "amount",
      headerName: "AMOUNT",
      flex: 1,
      minWidth: 170,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "STATUS",
      flex: 1,
      minWidth: 170,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "invoice",
      headerName: "INVOICE",
      flex: 1,
      minWidth: 170,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <>
            {params?.row?.invoice ? (
              <img src={params?.row?.invoice} width="50px" alt="invoice" />
            ):'N/A'}
            <br />
            {params?.row?.invoice && (
              <DownloadForOfflineIcon
                onClick={() => {
                  window.open(params?.row?.invoice);
                }}
              />
            )}
          </>
        );
      },
    },
    {
      field: "created_at",
      headerName: "CREATED AT",
      flex: 1,
      minWidth: 170,
      headerClassName: "super-app-theme--header",
    },
  ];

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ marginBottom: "20px" }}
      >
        <Button variant="outlined" color="primary">
          Available Amount : {profileData.available_earned_amount +" INR"}
        </Button>
        <Button variant="outlined" color="primary">
          Total Earned Amount : {profileData.total_earned_amount +" INR"}
        </Button>
      </Stack>
      <Paper
        sx={{
          bgcolor: "#fff",
          "& .super-app-theme--header": {
            bgcolor: "#E7F7FF",
            color: "#344054",
            fontFamily: "Gantari",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "18px",

            letterSpacing: "0.08em",
            textTransform: "uppercase",
          },
        }}
        elevation={0}
      >
        <DataGrid
          // className={classes.root}
          getRowHeight={() => "auto"}
          sx={{
            border: 0,
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#E7F7FF",
              // color: "red"
            },
          }}
          autoHeight
          rows={data}
          columns={AppColumns}
          getRowId={(row) => row._id}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          pagination
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 15]}
          disableColumnSelector
          loading={listLoading ? <LoadingUI /> : false}
          onCellClick={(params) => {
            setPublisher_id(params?.row?._id);
          }}
          components={{
            NoRowsOverlay: () => <NoDataFound />,
            Toolbar: GridToolbar,
          }}
        />
      </Paper>
          {console.log(bankData.length)}
      <Grid container sx={{ mt: 2 }} columnGap={2}>
        <Grid items xs={3}>
          <Card>
           
            <CardActionArea
              sx={{ p: 2 }}
              onClick={() => {
                navigate("/add-account");
              }}
              disabled={bankData?.length>0}
            >
              <Stack alignItems="center" justifyContent={"space-between"}>
                <Typography variant="subtitle1" color="primary">
                  Add Bank Details
                </Typography>
                <IconButton >
                  <AddIcon fontSize="large" />
                </IconButton>
              </Stack>
            </CardActionArea>
            
          </Card>
        </Grid>

        <Grid items xs={3}>
          <Card>
            <CardActionArea sx={{ p: 2 }}>
              <Stack alignItems="center" justifyContent={"space-between"}>
                <Typography variant="subtitle1" color="primary">
                  Request Withdraw Amount
                </Typography>
                <IconButton>
                  <AddIcon
                    fontSize="large"
                    onClick={() => setCreatePay(true)}
                  />
                </IconButton>
              </Stack>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      {/* <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-end',border:'2px solid black'}}> */}

      {/* </Box> */}
      <Card sx={{ p: 2, mt: 2 }}>
        <Typography sx={{ my: 2 }} variant="h6" color="primary">
          Payment Method
        </Typography>
        {bankData?.map((items, index) => {
          return (
            <Box key={index} sx={{ mt: 1 }}>
              <Stack>
                <Stack
                  direction={"row"}
                  alignItems="center"
                  justifyContent={"space-between"}
                >
                  <Stack direction={"row"} alignItems="center">
                    <AccountBalanceIcon fontSize="large" />
                    <Stack>
                      <Typography sx={{ ml: 2 }} variant="subtitle2">
                        Bank transfer
                      </Typography>
                      {bankLoading ? (
                        <LoadingUI />
                      ) : (
                        <Typography sx={{ ml: 2 }} color="primary" variant="h6">
                          {items?.branch}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>

                  <Box>
                    <IconButton
                      sx={{
                        fontSize: 40,
                        color: "#1976d2",
                        width: "1em",
                        height: "1em",

                        transition:
                          "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                        fontSize: "1.5rem",
                        color: "#1976d2",
                      }}
                    >
                      {/* {console.log(bankData.is_verified,"verified")} */}
                      {items.is_verified==1&&<TaskAltRoundedIcon sx={{color:'#00FF00'}} />}
                      {items.is_verified==0&&<CancelOutlinedIcon sx={{color:'#FF0000'}} />}
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        navigate({
                          pathname: `/update-account`,
                          search: createSearchParams({
                            bank_id: items?._id,
                          }).toString(),
                        });
                      }}
                    >
                      <EditIcon color="primary" />
                    </IconButton>

                    {/* {items?.is_deleted ?
                                                <IconButton onClick={() => {
                                                    setRemoveRestoreBankDetails(true)
                                                    bank_id = items?._id
                                                    is_deleted = false
                                                }} >
                                                    <BlockIcon color='error' />
                                                </IconButton> :
                                                <IconButton onClick={() => {
                                                    setRemoveRestoreBankDetails(true)
                                                    bank_id = items?._id
                                                    is_deleted = true
                                                }} >
                                                    <DoneIcon color='primary' />
                                                </IconButton>} */}
                  </Box>
                </Stack>
              </Stack>
            </Box>
          );
        })}
      </Card>

      <PaymentRequest state={createPay} setState={setCreatePay} />
      <PaymentDetails
        paymentId={paymentId}
        state={payDetail}
        setState={setPayDetail}
      />
    </>
  );
}

export default List;
