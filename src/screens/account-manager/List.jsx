import CachedIcon from '@mui/icons-material/Cached'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Box, Breadcrumbs, Card, CircularProgress, Grid, IconButton, Link, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { default as React } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { myProfileAction } from '../../redux/toolkit/profile/my-profile'
import CardContent from '@mui/material/CardContent';
// import { getProfileAction } from '../../redux/profile/getPublisherProfile'

// import BodyWaperUI from '../../ui/BodyWaperUI'
// import NavbarUI from '../../ui/NavbarUI'
// import SidebarUI from '../../ui/SidebarUI'

const breadcrumb = (
    <Stack spacing={2} >
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" sx={{ color: '#fff' }} />} aria-label="breadcrumb">
            <Link underline="hover" sx={{ color: '#fff' }} color='inherit' href='/account-manager-details'>Account Manager Details</Link>
        </Breadcrumbs>
    </Stack>
)

export default function AccountManegerDetails() {
    const dispatch = useDispatch()
    // state
    const getProfileSelector = useSelector(state => state.myProfile)
    const { data, loading } = getProfileSelector


    const handleRefresh = () => {
        dispatch(myProfileAction())
    }

    return (
        <>
            <Helmet>
                <title>PSC | Support & Knowledge</title>
            </Helmet>



            <Stack direction='row' justifyContent='space-between' >
                <Typography variant='h5' fontFamily='Gantari' color='#1D2524' fontStyle='normal' fontWeight='600' fontSize='24px' lineHeight='33px'>Account Manager Details</Typography>
                {/* <IconButton onClick={handleRefresh}><CachedIcon /></IconButton> */}
            </Stack>
            <Grid container xs={12}  >
                <Grid xs={12} item>
                    <Box style={{ marginRight: "100px" }} sx={{ my: 2 }}>
                        {loading
                            ? <CircularProgress />
                            : <Stack xs={12} direction='row' justifyContent='space-between' >
                                <Stack sx={{ mt: 1}}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>

                                    <Typography variant='h6' fontFamily='Inter' color='#667085' fontStyle='normal' fontWeight='400' fontSize='20px' lineHeight='24px'>Manager Name</Typography>
                                    <Typography variant='h5' sx={{ fontWeight: 600 }} fontFamily='Inter' color='#344054' fontStyle='normal' fontWeight='600' fontSize='24px' lineHeight='29px'>{data?.m_name || "--"}</Typography>
                                        </CardContent>

                                    </Card>
                                </Stack>
                                <Stack sx={{ mt: 1}}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                    <Typography variant='h6' fontFamily='Inter' color='#667085' fontStyle='normal' fontWeight='400' fontSize='20px' lineHeight='24px'>Email Address</Typography>
                                    <Typography variant='h5' sx={{ fontWeight: 600 }} fontFamily='Inter' color='#344054' fontStyle='normal' fontWeight='600' fontSize='24px' lineHeight='29px'>{data?.m_email || "--"}</Typography>

                                        </CardContent>

                                    </Card>
                                </Stack>
                                <Stack sx={{ mt: 1}}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                    <Typography variant='h6' fontFamily='Inter' color='#667085' fontStyle='normal' fontWeight='400' fontSize='20px' lineHeight='24px'>Contact Number</Typography>
                                    <Typography variant='h5' sx={{ fontWeight: 600 }} fontFamily='Inter' color='#344054' fontStyle='normal' fontWeight='600' fontSize='24px' lineHeight='29px'>{data?.m_mobile || "--"}</Typography>

                                        </CardContent>

                                    </Card>
                                </Stack>
                            </Stack>
                        }
                        {!data && <h5 style={{ color: "red", fontSize: "20px", lineHeight: "30px" }}>“Not Account Manager is assigned to you , in case of any query please contact us<br /> through our “Support and knowledge” section”</h5>}
                    </Box>
                </Grid>
            </Grid>

        </>
    )
}
