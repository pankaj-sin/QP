import ChatIcon from '@mui/icons-material/Chat'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { Accordion, AccordionDetails, AccordionSummary, Breadcrumbs, Button, Link, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import LoadingUI from '../../common/LoadingUI'
import { knowledgeListAction } from '../../redux/toolkit/knowledge/list'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { makeStyles } from '@mui/styles';


const breadcrumb = (
    <Stack spacing={2}>
        <Breadcrumbs separator={<NavigateNextIcon sx={{ color: '#fff' }} fontSize="small" />} aria-label="breadcrumb">
            <Link underline="hover" sx={{ color: '#fff' }} color='inherit' href='/'>Home</Link>
            <Link underline="hover" sx={{ color: '#fff' }} color='inherit' href='/support-knowledge'>Support & Knowledge</Link>
        </Breadcrumbs>
    </Stack >
)

export default function List() {

    const useStyles = makeStyles({
        noBorder: {
            border: 'none',
            boxShadow: 'none',
            "&.css-1elwnq4-MuiPaper-root-MuiAccordion-root": {
                boxShadow: 'none'
            },
            "&.css-1elwnq4-MuiPaper-root-MuiAccordion-root:before": {
                position: 'static'
            }
        },

    });

    const classes = useStyles();

    const FAQ = useSelector(state => state.knowledgeList)
    const { data, loading } = FAQ
    const support_knowladges = data?.support_knowladges || []
    const support_email = data?.support_email
    const support_mobile = data?.support_mobile
    // const knowledgeList = useSelector(state => state.knowledgeList)
    // const { data:{knowledgeData},loading:knowledgeLoading } = knowledgeList
    const getProfileSelector = useSelector(state => state.myProfile)
    const { data: publisherData } = getProfileSelector
    const [expandedAccordion, setExpandedAccordion] = useState(null);

    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(knowledgeListAction())
    }, [dispatch])

    const accordionStyle = {
        border: 'none', // Remove border from Accordion
    };

    return (
        <>
            <Helmet>
                <title>PSC | Support & Knowledge</title>
            </Helmet>

            <Stack direction='row' justifyContent='space-between' style={{ marginBottom: "20px" }}>
                <Typography variant='h5' fontFamily='Gantari' color='#1D2524' fontStyle='normal' fontWeight='600' fontSize='24px' lineHeight='33px'>FAQ's</Typography>
                {/* <IconButton onClick={handleRefresh}><CachedIcon /></IconButton> */}
            </Stack>

            {loading
                ? <LoadingUI />
                : support_knowladges?.map((item, indx) => {
                    const isExpanded = expandedAccordion === indx;
                    const handleAccordionChange = (index) => {
                        setExpandedAccordion(isExpanded ? null : index);
                    };
                    return (
                        <>
                            <Accordion key={indx} classes={{
                                root: classes.noBorder, // Apply the noBorder class to remove the border
                            }} expanded={isExpanded} onChange={() => handleAccordionChange(indx)}>
                                <AccordionSummary
                                    // expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{ border: "none" }}
                                    direction='row' 
                                    justifyContent='center'
                                    alignItems='center'
                                >
                                    {isExpanded ? (
                                        <RemoveCircleIcon style={{ fontSize: '38px', color: "#0C6A96" }} />// Icon for the open accordion
                                    ) : (
                                        <AddCircleIcon style={{ fontSize: '38px', color: "#0C6A96" }} /> // Icon for the closed accordion
                                    )}
                                    <Typography color='primary' style={{display:"flex",alignItems:"center",marginLeft:"20px",color:"#1D2524",fontSize:"20px"}}> &nbsp;{item?.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails style={{alignItems:"center",marginLeft:"65px",color:"#1D2524",fontSize:"20px"}}>
                                    {item?.answers?.map((ans, idx) => {
                                        return (
                                            <>
                                                <Stack direction='row' spacing={1}>
                                                    <Typography variant='subtitle2' key={idx}>Ans</Typography>
                                                    <Typography color='primary' variant='subtitle2' key={idx}>{ans}</Typography>
                                                </Stack>
                                            </>
                                        )
                                    })}

                                </AccordionDetails>
                            </Accordion>
                        </>
                    )
                })}
            <Stack direction='row' spacing={2} sx={{ mt: 1 }} style={{marginLeft:"20px"}}>
                {support_email ? <Button variant='outlined' color='success' startIcon={<WhatsAppIcon />} href={`https://wa.me/${publisherData?.m_mobile}/?text=urlencodedtext`}>Contact us by whatsapp</Button> : null}
                {support_mobile ? <Button variant='outlined' startIcon={<ChatIcon />} href={`https://mail.google.com/mail/?view=cm&fs=1&to=${publisherData?.m_email}`} >Contact us by Mail</Button> : null}
            </Stack>
        </>
    )
}
