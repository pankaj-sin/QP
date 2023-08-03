import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Breadcrumbs, Button, Card, Chip, Grid, IconButton, Link, Menu, MenuItem, Paper, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import { Stack } from '@mui/system'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add';
import { createSearchParams, Link as LinkRRD, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { appListAction } from '../../redux/toolkit/apps/list'
import RestoreIcon from '@mui/icons-material/Restore'
import EditIcon from '@mui/icons-material/Edit'
import NoDataFound from '../../common/NoDataFound'
import LoadingUI from '../../common/LoadingUI'
import Avatar from '@mui/material/Avatar';
import { userListAction } from '../../redux/toolkit/users/list'




// import EditIcon from '@mui/icons-material/Edit'


function List() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [publisher_id,setPublisher_id]=useState()
    const [pageSize, setPageSize] = useState(25);
    const [ativeFilter, setActiveFilter] = useState(false)
    const [pagination, setPagination] = useState({ page: 0, limit: 25 })

    const [pageState,setPageState]=useState({page:0,pageSize:25})

    const appLists=useSelector(state=>state.userList)
    const {status,data,loading:listLoading,total}=appLists
    console.log("data,Total-->",total)


    useEffect(()=>{
        // console.log("pagination-->",pagination)
        dispatch(userListAction({ page: pageState.page, limit: pageState.pageSize }))
        console.log(pageState.page,pageState.pageSize+"use effect user list")
    },[dispatch,pageState.page,pageState.pageSize])

    const AppColumns = [
        {
            field: 's_no',
            headerName: 'S. No.',
            filterable: false,
            flex: 1,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) =>{ 
                const {page,pageSize}= pageState;
                const serialNumber = (page*pageSize)+
                params?.api?.getRowIndex(params.row._id) + 1
                return serialNumber;
            }
        },
        {
            field: '_id',
            headerName: 'ID',
            flex: 1,
            minWidth: 300,
            headerClassName: 'super-app-theme--header',
            // renderCell: (params) => {
            //     return (
            //         <LinkRRD to={`/mission-detail?${params?.row?._id}`}>
            //             <Typography color='primary'>{params?.row?._id}</Typography>
            //         </LinkRRD>
            //     )
            // },
        },
        // {
        //     field: 'cat_id',
        //     headerName: 'Category Name',
        //     flex: 1,
        //     minWidth: 170,
        //     headerClassName: 'super-app-theme--header',
        //     renderCell: (params) => {
        //         return (
        //             <Typography>{params?.row?.cat_id?.cat_name}</Typography>
        //         )
        //     },
        // },
        {
            field: 'name',
            headerName: 'NAME',
            flex: 1,
            minWidth: 170,
            headerClassName: 'super-app-theme--header',
            
        },
        {
            field: 'email',
            headerName: 'EMAIL',
            flex: 1,
            minWidth: 150,
            headerClassName: 'super-app-theme--header',
            // renderCell: (params) => {
            //     return (
            //         <Typography>{params?.row?.mission}</Typography>
            //     )
            // },
        },
        // {
        //     field: 'app_logo',
        //     headerName: 'App logo',
        //     flex: 1,
        //     minWidth: 200,
        //     headerClassName: 'super-app-theme--header',
        //     renderCell: (params) => {
        //         return (
        //       <Avatar alt="App logo" src={params?.row?.app_logo}/>

        //         )
        //     },
        // },
        // {
        //     field: 'link_qns',
        //     headerName: 'Link Question',
        //     flex: 1,
        //     minWidth: 150,
        //     headerClassName: 'super-app-theme--header',
        //     renderCell: (params) => {
        //         return (
        //             <Typography>{params?.row?.link_qns?.length}</Typography>
        //         )
        //     },
        // },
        {
            field: 'reward',
            headerName: 'REWARD AMOUNT',
            flex: 1,
            minWidth: 150,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return (
                    <Typography>{params?.row?.reward}</Typography>
                )
            },
        },
        {
            field: 'mission_attempts',
            headerName: 'MISSION ATTEMPTS',
            flex: 1,
            minWidth: 150,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return (
                    <Typography>{params?.row?.mission_attempts}</Typography>
                )
            },
        },
        {
            field: 'mission_complete',
            headerName: 'MISSION COMPLETE',
            flex: 1,
            minWidth: 150,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return (
                    <Typography>{params?.row?.mission_complete}</Typography>
                )
            },
        },
        {
            field: 'platform',
            headerName: 'PLATFORM',
            flex: 1,
            minWidth: 150,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return (
                    <Typography>{params?.row?.platform}</Typography>
                )
            },
        },
        // {
        //     field: 'reward_type',
        //     headerName: 'Reward Type',
        //     flex: 1,
        //     minWidth: 150,
        //     headerClassName: 'super-app-theme--header',
        //     renderCell: (params) => {
        //         return (
        //             <Typography>{params?.row?.reward_type}</Typography>
        //         )
        //     },
        // },
        // {
        //     field: 'reward.secondary_reward',
        //     headerName: 'Secondary Reward Amount',
        //     flex: 1,
        //     minWidth: 200,
        //     headerClassName: 'super-app-theme--header',
        //     renderCell: (params) => {
        //         return (
        //             <Typography>{params?.row?.secondary_reward}</Typography>
        //         )
        //     },

        // },
        // {
        //     field: 'card_bg_color',
        //     headerName: 'Card Background Color',
        //     renderCell: (params) => {
        //         return (
        //             <Stack direction={'row'} spacing={1} alignItems='center'>
        //                 <Box sx={{ width: 40, height: 20, bgcolor: params?.row?.card_bg_color?.[0] }}></Box>
        //                 <Box sx={{ width: 40, height: 20, bgcolor: params?.row?.card_bg_color?.[1] }}></Box>
        //             </Stack>
        //         )
        //     },
        //     flex: 1,
        //     minWidth: 200,
        //     headerClassName: 'super-app-theme--header',
        //     hide: ativeFilter
        // },
        // {
        //     field: 'status',
        //     headerName: 'Edit Category',
        //     renderCell: (params) => {
        //         return (
        //             <>
        //                 {params?.row?.status == 'live'
        //                     ? <Chip color={'primary'} label='Live' />
        //                     : <Chip color={'error'} label='Paused' />
        //                 }


        //             </>
        //         )
        //     },
        //     flex: 1,
        //     minWidth: 150,
        //     headerClassName: 'super-app-theme--header',
        //     hide: ativeFilter
        // },
        // {
        //     field: 'live_date',
        //     headerName: 'Live Date',
        //     flex: 1,
        //     minWidth: 150,
        //     headerClassName: 'super-app-theme--header',
        //     renderCell: (params) => {
        //         return (
        //             <>
        //                 {params?.row?.live_date?.split("T")?.[0]
        //                     ? params?.row?.live_date?.split("T")?.[0]
        //                     : null
        //                 }
        //             </>
        //         )
        //     },
        // },
        // {
        //     field: 'live_time',
        //     headerName: 'Live Time',
        //     flex: 1,
        //     minWidth: 150,
        //     headerClassName: 'super-app-theme--header',
        //     renderCell: (params) => {
        //         return (
        //             <>
        //                 {params?.row?.live_date?.split("T")?.[1]?.split(".")?.[0]
        //                     ? params?.row?.live_date?.split("T")?.[1]?.split(".")?.[0]
        //                     : null
        //                 }
        //             </>
        //         )
        //     },
        // },
        // {
        //     field: 'end_date',
        //     headerName: 'End Date',
        //     flex: 1,
        //     minWidth: 150,
        //     headerClassName: 'super-app-theme--header',
        //     renderCell: (params) => {
        //         return (
        //             <>
        //                 {
        //                     params?.row?.end_date?.split("T")?.[0]
        //                         ? params?.row?.end_date?.split("T")?.[0]
        //                         : null
        //                 }
        //             </>
        //         )
        //     },
        // },
        // {
        //     field: 'end_time',
        //     headerName: 'End Date',
        //     flex: 1,
        //     minWidth: 150,
        //     headerClassName: 'super-app-theme--header',
        //     renderCell: (params) => {
        //         return (
        //             <>
        //                 {
        //                     params?.row?.end_date?.split("T")?.[1]?.split(".")?.[0]
        //                         ? params?.row?.end_date?.split("T")?.[1]?.split(".")?.[0]
        //                         : null
        //                 }
        //             </>
        //         )
        //     },
        // },
        // {
        //     field: 'edit', headerName: 'Edit Category',
        //     renderCell: (params) => {
        //         return (
        //             <IconButton
        //                 onClick={() => {
        //                     navigate({
        //                         pathname: `/apps/update-app`,
        //                         search: createSearchParams({
        //                             app_id: params?.row?._id
        //                         }).toString()
        //                     })
        //                 }
        //                 } >
        //                 <EditIcon color='primary' />
        //             </IconButton >
        //         )
        //     },
        //     flex: 1,
        //     minWidth: 150,
        //     headerClassName: 'super-app-theme--header',
        //     hide: ativeFilter
        // },
        // {
        //     field: 'delete', headerName: 'Delete Category', renderCell: (params) => {
        //         return (
        //             <IconButton
        //                 onClick={() => {
        //                     setDelMission(true)
        //                     setmission_id(params?.row?._id)
        //                 }}>
        //                 <DeleteIcon color='error' /></IconButton>
        //         )
        //     },
        //     flex: 1,
        //     minWidth: 150,
        //     headerClassName: 'super-app-theme--header',
        //     hide: ativeFilter || (!can_delete && super_admin != 'super_admin')

        // },
        // {
        //     field: 'revert',
        //     headerName: 'Revert Mission',
        //     renderCell: () => {
        //         return (
        //             <IconButton
        //                 onClick={() => {
        //                     setRestoreCat(true);
        //                 }}><RestoreIcon color='success' /></IconButton>
        //         )
        //     },
        //     flex: 1,
        //     minWidth: 150,
        //     headerClassName: 'super-app-theme--header',
        //     hide: !ativeFilter

        // },
    ]

    // const handlePageChange = (params) => {
    //     setPagination((prevState) => ({
    //       ...prevState,
    //       page: params.page,
    //     }));
    //   };
    
    //   const handlePageSizeChange = (params) => {
    //     setPagination((prevState) => ({
    //       ...prevState,
    //       page: 1,
    //       pageSize: params.pageSize,
    //     }));
    //   };

  return (
    <>
             <Typography sx={{ my: 1 }} variant='h6'>User List</Typography>
                 
                <Paper sx={{
                        bgcolor: '#fff',
                        '& .super-app-theme--header': {
                            bgcolor: '#E7F7FF',
                            color: "#344054",
                            fontFamily: "Gantari",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "12px",
                            lineHeight: "18px",
                
                            letterSpacing: "0.08em",
                            textTransform: "uppercase"
                        },

                    }} elevation={0}>
                        <DataGrid
                        sx={{
                            border: 0,
                            "& .MuiDataGrid-row:hover": {
                                backgroundColor: "#E7F7FF"
                                // color: "red"
                              }
                        }}
                            // className={classes.root}
                            getRowHeight={({  densityFactor }) => {
                                return 70 * densityFactor;
                            }}
                            autoHeight
                            rows={data}
                            columns={AppColumns}
                            getRowId={(row) => row._id}
                            disableSelectionOnClick
                            experimentalFeatures={{ newEditingApi: true }}
                            pagination
                            // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            // onPageChange={handlePageChange}
                            // onPageSizeChange={handlePageSizeChange}
                            rowsPerPageOptions={[25,50,75,100]}
                            
                            
                            
                            disableColumnSelector
                            loading={listLoading ? <LoadingUI /> : false}
                            onCellClick={(params) => {
                                setPublisher_id(params?.row?._id)
                            }}
                            components={{
                                NoRowsOverlay: () => <NoDataFound />,
                                Toolbar: GridToolbar,
                            }}
                            rowCount={total}
                            // Provide a rowCount prop to let the data grid know how many pages there are
                            
                            paginationModel={setPageState}
                            page={pageState.page}
                            pageSize={pageState.pageSize}
                            paginationMode="server"
                            onPageChange={(newPage) => {
                                setPageState(old => ({ ...old, page: newPage}))
                                }}
                            onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}

                        />
                    </Paper>
    
    
    </>
  )
}

export default List