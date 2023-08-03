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
import { postbackLogAction } from '../../redux/toolkit/postback/postbackLog'




// import EditIcon from '@mui/icons-material/Edit'


function List() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [publisher_id,setPublisher_id]=useState()
    const [pageSize, setPageSize] = useState(25);
    const [ativeFilter, setActiveFilter] = useState(false)

    const appLists=useSelector(state=>state.postbackLog)
    const {status,data,loading:listLoading}=appLists
    console.log("data,-->",data)


    useEffect(()=>{
        dispatch(postbackLogAction())
    },[dispatch])

    const AppColumns = [
        {
            field: 's_no',
            headerName: 'S. No.',
            filterable: false,
            flex: 1,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => 
                params?.api?.getRowIndex(params.row._id) + 1
            
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
        {
            field: 'publisher_id',
            headerName: 'Publisher Id',
            flex: 1,
            minWidth: 170,
            headerClassName: 'super-app-theme--header',
            
        },
        {
            field: 'app_name',
            headerName: 'App Name',
            flex: 1,
            minWidth: 170,
            headerClassName: 'super-app-theme--header',
            // renderCell: (params) => {
            //     return (
            //         <Typography>{params?.row?.cat_id?.cat_name}</Typography>
            //     )
            // },
        },
        {
            field: 'reward_amt',
            headerName: 'Reward Amount',
            flex: 1,
            minWidth: 170,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return (
                    <Typography>{JSON.parse(params?.row?.body)?.amount}</Typography>
                )
            },
            
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            minWidth: 150,
            headerClassName: 'super-app-theme--header',
            // renderCell: (params) => {
            //     return (
            //         <Typography>{params?.row?.mission}</Typography>
            //     )
            // },
        },
        {
            field: 'trans_id',
            headerName: 'Trans Id',
            flex: 1,
            minWidth: 200,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return (
                    <Typography>{JSON.parse(params?.row?.body)?.trans_id}</Typography>
                )
            },
        },
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
            field: 'user_id',
            headerName: 'User Id',
            flex: 1,
            minWidth: 250,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return (
                    <Typography>{JSON.parse(params?.row?.body)?.user_id}</Typography>
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
        {
            field: 'created_at',
            headerName: 'Created',
            flex: 1,
            minWidth: 150,
            headerClassName: 'super-app-theme--header',
            // hide: !ativeFilter

        },
    ]

  return (
    <>
             <Typography sx={{ my: 1 }} variant='h6'>PostBack Log</Typography>
                 
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
                            // className={classes.root}
                            getRowHeight={() => 'auto'}
                            sx={{ border: 0,
                                "& .MuiDataGrid-row:hover": {
                                    backgroundColor: "#E7F7FF"
                                    // color: "red"
                                  }
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
                                setPublisher_id(params?.row?._id)
                            }}
                            components={{
                                NoRowsOverlay: () => <NoDataFound />,
                                Toolbar: GridToolbar,
                            }}

                        />
                    </Paper>
    
    
    </>
  )
}

export default List