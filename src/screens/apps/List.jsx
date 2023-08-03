import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
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
import Switch from "@mui/material/Switch";
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
import DeleteApp from "./DeleteApp";
import ActivateApp from "./ActivateApp";
import DeleteIcon from "@mui/icons-material/Delete";
import { appActivateAction } from "../../redux/toolkit/apps/active";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

// import EditIcon from '@mui/icons-material/Edit'

function List() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [publisher_id, setPublisher_id] = useState();
  const [pageSize, setPageSize] = useState(25);
  const [ativeFilter, setActiveFilter] = useState(false);
  const [deleteApp, setDeleteApp] = useState(false);
  const [activateApp, setActivateApp] = useState(false);
  const [appId, setAppId] = useState();
  const [is_deleted, setIs_deleted] = useState();
  const [catMenu, setCatMenu] = useState(false);
  const [anchorCatMenu, setAnchorCatMenu] = useState();

  const appLists = useSelector((state) => state.appLists);
  const { status, data, loading: listLoading } = appLists;
  console.log("data,-->", data);

  // const handleChange=()=>{
  //     dispatch(appActivateAction())
  // }

  function myFunction(PID) {
    // Get the text field
    let ID = "copy_url_" + PID;
    console.log("ID-->", ID);
    var copyText = document.getElementById(ID);
    // console.log("copyText",copyText.innerText)
    // Select the text field
    // copyText.select();
    // copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.innerText);

    // Alert the copied text
    // alert("Copied the text: " + copyText.value);
  }

  useEffect(() => {
    dispatch(appListAction({is_deleted:false}));
  }, [dispatch]);

  const AppColumns = [
    {
      field: "s_no",
      headerName: "S. NO.",
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
      // renderCell: (params) => {
      //     return (
      //         // <LinkRRD to={`/mission-detail?${params?.row?._id}`}>
      //         //     <Typography color='primary'>{params?.row?._id}</Typography>
      //         // </LinkRRD>
      //         <Typography color='primary'>{params?.row?._id}</Typography>

      //     )
      // },
    },

    {
      field: "app_name",
      headerName: "APP NAME",
      flex: 1,
      minWidth: 170,
      headerClassName: "super-app-theme--header",
    },

    {
      field: "app_logo",
      headerName: "APP LOGO",
      flex: 1,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return <Avatar alt="App logo" src={params?.row?.app_logo} />;
      },
    },
    {
      field: "app_color",
      headerName: "APP THEME",
      flex: 1,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          // <Avatar alt="App logo" src={params?.row?.app_logo} />
          <>
            {params?.row?.app_color == "1" && (
              <div
                style={{ width: "20px", height: "20px", background: "#22819B" }}
              >
                {" "}
              </div>
            )}
            {params?.row?.app_color == "2" && (
              <div
                style={{ width: "20px", height: "20px", background: "#FFCB9B" }}
              >
                {" "}
              </div>
            )}
            {params?.row?.app_color == "3" && (
              <div
                style={{ width: "20px", height: "20px", background: "#BEDEBE" }}
              >
                {" "}
              </div>
            )}
          </>
        );
      },
    },
    {
      field: "platform",
      headerName: "PLATFORM",
      flex: 1,
      minWidth: 200,
      headerClassName: "super-app-theme--header",
    },
    // {
    //     field: 'is_active',
    //     headerName: 'Active',
    //     flex: 1,
    //     minWidth: 200,
    //     headerClassName: 'super-app-theme--header',
    //     renderCell: (params) => {
    //         return (

    //                 <Button variant="contained"  onClick={() => {
    //                     setActivateApp(true)
    //                     setAppId(params?.row?._id)
    //                 }}>{params?.row?.is_active=="false"?"Activate":"Deactivate"}</Button>

    //         //   <Switch
    //         //     checked={row?.is_active}
    //         //     onChange={()=>{
    //         //         dispatch(appActivateAction({id:row?._id,is_active:!row?.is_active}))
    //         //     }}
    //         //     inputProps={{ 'aria-label': 'controlled' }}
    //         //   />
    //         );
    //       },
    // },

    {
      field: "edit",
      headerName: "EDIT APP",
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              navigate({
                pathname: `/apps/update-app`,
                search: createSearchParams({
                  app_id: params?.row?._id,
                }).toString(),
              });
            }}
          >
            <EditIcon color="primary" />
          </IconButton>
        );
      },
      flex: 1,
      minWidth: 150,
      headerClassName: "super-app-theme--header",
      hide: ativeFilter,
    },
    {
      field: "delete",
      headerName: "Delete App",
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              setDeleteApp(true);
              setIs_deleted(true);
              setAppId(params?.row?._id);
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        );
      },
      flex: 1,
      minWidth: 150,
      headerClassName: "super-app-theme--header",
      // hide: ativeFilter || (!can_delete && super_admin != 'super_admin')
    },

    {
      field: "integration url",
      headerName: "Integration URL",
      renderCell: (params) => {
        return (
          <>
            <div>
              <p
                id={"copy_url_" + params?.api?.getRowIndex(params.row._id)}
                style={{ width: "200px",  }}
              >
                `{process.env.REACT_APP_API_ENDPOINT}?platform=
                {params?.row?.platform}&publisher_id={params?.row?.publisher_id}
                &app_id={params?.row?._id}&user_id=""`
              </p>
              {console.log(
                "copy_url-----",
                "copy_url_" + params?.api?.getRowIndex(params.row._id)
              )}
              <Button
                variant="text"
                onClick={() => {
                  myFunction(params?.api?.getRowIndex(params.row._id));
                }}
              >
                Copy
              </Button>
            </div>
          </>
        );
      },
      minWidth: 250,
      headerClassName: "super-app-theme--header",
      hide: ativeFilter,
        field: 'integration url', headerName: 'Integration URL',
        renderCell: (params) => {
            return (
                <>
                <div>

                   <p id={"copy_url_"+params?.api?.getRowIndex(params.row._id)} style={{width:"200px",overflowX: "hidden",scrollX:"hidden"}}>`{process.env.REACT_APP_API_ENDPOINT}?platform={params?.row?.platform}&publisher_id={params?.row?.publisher_id}&app_id={params?.row?._id}&user_id=""`</p>
                   {/* {console.log("copy_url-----","copy_url_"+params?.api?.getRowIndex(params.row._id))} */}
                    <Button variant="text" onClick={()=>{myFunction(params?.api?.getRowIndex(params.row._id))}}>Copy</Button>
                </div>
                    </>

            )
        },
        minWidth: 250,
        headerClassName: 'super-app-theme--header',
        hide: ativeFilter
    },
  ];

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
        {/* <Button variant="outlined" startIcon={<FilterListIcon />} onClick={() => { setIsFilterArea(!isFilterArea) }}>
                        filter by date
                    </Button> */}

        {
          <IconButton
            onClick={(event) => {
              setCatMenu(true);
              setAnchorCatMenu(event.currentTarget);
            }}
          >
            <FilterAltIcon color="#071D45" />
          </IconButton>
        }

        <Menu
          open={catMenu}
          onClose={() => setCatMenu(false)}
          anchorEl={anchorCatMenu}
        >
          <MenuItem
            selected={ativeFilter}
            onClick={() => {
              setCatMenu(false);
              dispatch(appListAction({ is_deleted: true }));
              setActiveFilter(true);
            }}
          >
            Deleted
          </MenuItem>
          <MenuItem
            selected={!ativeFilter}
            onClick={() => {
              setCatMenu(false);
              dispatch(appListAction({ is_deleted: false }));
              setActiveFilter(false);
            }}
          >
            Non Deleted
          </MenuItem>
        </Menu>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            navigate("/apps/create-app");
          }}
        >
          create App
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
          rowsPerPageOptions={[25, 50, 100]}
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

      <DeleteApp
        appId={appId}
        state={deleteApp}
        is_deleted={is_deleted}
        setState={setDeleteApp}
      />
      <ActivateApp
        appId={appId}
        state={activateApp}
        setState={setActivateApp}
      />
    </>
  );
}

export default List;
