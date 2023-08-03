import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Breadcrumbs, Button, Card, Chip, Grid, IconButton, Link, Menu, MenuItem, Paper, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import { Stack } from '@mui/system'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add';
import { createSearchParams, Link as LinkRRD, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { appListAction } from '../../redux/toolkit/apps/list'
import RestoreIcon from '@mui/icons-material/Restore'
import EditIcon from '@mui/icons-material/Edit'
import NoDataFound from '../../common/NoDataFound'
import LoadingUI from '../../common/LoadingUI'
import Avatar from '@mui/material/Avatar';
import { liveMissionListAction } from '../../redux/toolkit/liveMission/list'
import axios from "../../config/authAxios"
import { useStyles } from '../../theme/theme'






// import EditIcon from '@mui/icons-material/Edit'


function List() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [publisher_id, setPublisher_id] = useState()
    const [pageSize, setPageSize] = useState(25);
    // const [limit, setLimit] = useState(25);
    const [pagination, setPagination] = useState({ page: 0, limit: 10 })
    const [ativeFilter, setActiveFilter] = useState(false)
    const classes=useStyles()

    // const appLists = useSelector(state => state.liveMissionList)
    // const { status, data,total, loading: listLoading } = appLists
    const [pageState, setPageState] = useState({
        isLoading: false,
        data: [],
        total: 0,
        page: 0,
        pageSize: 10
      })
    
    console.log("data,-->", pageState.data)


    // const [pageState,setPageState]=useState({page:0,pageSize:5})

    // const appLists=useSelector(state=>state.userList)
    // const {status,data,loading:listLoading,total}=appLists
    // console.log("_------>",data)
    let total1=''
    useEffect(() => {
        const fetchData = async () => {
          console.log('ON')
          setPageState(old => ({ ...old, isLoading: true }))
          const response = await axios.get(`/api/missions/live/${pageState.page}/${pageState.pageSize}`)
          console.log(response)
          const data = await response.data
          console.log("data59-->",data.total)
          total1 = data.total
          setPageState(old => ({ ...old, isLoading: false, data: data.data,total:data.total }))
        }
        fetchData()
        // dispatch(liveMissionListAction({ page: pageState.page, limit: pageState.pageSize }))

      }, [pageState.page, pageState.pageSize])

      const handlePageChange=()=>{
        console.log("handlePageChange");
      }
    const appColumns = [
        {
            field: 's_no',
            headerName: 'S. No.',
            filterable: false,
            flex: 1,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
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
            
        },
        {
            field: 'icon',
            headerName: 'ICON',
            flex: 1,
            minWidth: 150,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return (
                    <img width="50px" style={{borderRadius:"50%"}} src={params?.row?.icon}/>              
                )
            },
            
        },
        {
            field: 'title',
            headerName: 'TITLE',
            flex: 1,
            minWidth: 170,
            headerClassName: 'super-app-theme--header',
            
        },
        
        // {
        //     field: 'link_qns',
        //     headerName: 'LINK QUESTION',
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
            
        },
        
        
        
        {
            field: 'status',
            headerName: 'STATUS',
            renderCell: (params) => {
                return (
                    <>
                        {params?.row?.status == 'live'
                            ? <Chip color={'primary'} label='Live' />
                            : <Chip color={'error'} label='Paused' />
                        }


                    </>
                )
            },
            flex: 1,
            minWidth: 150,
            headerClassName: 'super-app-theme--header',
            hide: ativeFilter
        },
        {
            field: 'live_date',
            headerName: 'LIVE DATE',
            flex: 1,
            minWidth: 150,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return (
                    <>
                        {params?.row?.live_date?.split("T")?.[0]
                            ? params?.row?.live_date?.split("T")?.[0]
                            : null
                        }
                    </>
                )
            },
        },
        {
            field: 'live_time',
            headerName: 'LIVE TIME',
            flex: 1,
            minWidth: 150,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return (
                    <>
                        {params?.row?.live_date?.split("T")?.[1]?.split(".")?.[0]
                            ? params?.row?.live_date?.split("T")?.[1]?.split(".")?.[0]
                            : null
                        }
                    </>
                )
            },
        },
        {
            field: 'end_date',
            headerName: 'END DATE',
            flex: 1,
            minWidth: 150,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return (
                    <>
                        {
                            params?.row?.end_date?.split("T")?.[0]
                                ? params?.row?.end_date?.split("T")?.[0]
                                : null
                        }
                    </>
                )
            },
        },
        {
            field: 'end_time',
            headerName: 'END DATE',
            flex: 1,
            minWidth: 150,
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => {
                return (
                    <>
                        {
                            params?.row?.end_date?.split("T")?.[1]?.split(".")?.[0]
                                ? params?.row?.end_date?.split("T")?.[1]?.split(".")?.[0]
                                : null
                        }
                    </>
                )
            },
        },
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

    return (
        <>
            <Typography sx={{ my: 1 }} variant='h6'>Live Mission List</Typography>

            <Paper sx={{
                bgcolor: '#fff',
                '& .super-app-theme--header': {
                    bgcolor: '#E7F7FF',
                    color: '#344054',
                  
                    fontFamily: "Gantari",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "18px",
        
                    letterSpacing: "0.08em",
                    textTransform: "uppercase"
                },

            }} elevation={0}>
                {/* <DataGrid
                            // className={classes.root}
                            getRowHeight={() => 'auto'}
                            sx={{ border: 0 }}
                            autoHeight
                            rows={data}
                            columns={appColumns}
                            getRowId= {(row) => row._id}
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

                        /> */}

                <DataGrid
                    // className={classes.root}
                    sx={{
                        border: 0,
                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: "#E7F7FF"
                            // color: "red"
                          }
                    }}
                    autoHeight
                    columns={appColumns}
                    getRowId= {(row) => row._id}
                    rows={pageState.data}
                    rowCount={pageState.total}
                    loading={pageState.isLoading? <LoadingUI /> : false}
                    rowsPerPageOptions={[5,10,15,20]}
                    pagination
                    paginationModel={setPageState}
                    page={pageState.page}
                    pageSize={pageState.pageSize}
                    paginationMode="server"
                    onPageChange={(newPage) => { 
                        setPageState(old => ({ ...old, page: newPage}))
                    }}
                    onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
                    handlePageChange={handlePageChange}
                />
            </Paper>


        </>
    )
}

export default List