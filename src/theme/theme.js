import { createTheme } from "@mui/material";
import { makeStyles } from '@mui/styles';

export const theme = createTheme(
    {
        typography: {
            allVariants: {
                fontFamily: `'Be Vietnam Pro', sans-serif`
            },
        },
        palette: {
            primary: { main: '#071D45' },
            error: { main: '#A70100' },
        },
        shape: {
            borderRadius: 10,
        },
    }
);



export const useStyles = makeStyles({

    root: {
        "& .MuiDataGrid-renderingZone": {
            maxHeight: "none !important",
            background: '#E7F7FF',

        },
        "& .MuiDataGrid-cell": {
            lineHeight: "unset !important",
            maxHeight: "none !important",
            whiteSpace: "normal",
            background: '#fff',

        },
        "& .MuiDataGrid-row": {
            maxHeight: "none !important",
            background: '#E7F7FF',

        },  
        "& .MuiDataGrid-row:hover": {
            background: "#E7F7FF !important"
          },
        "&.MuiDataGrid-columnsContainer": {
            background: '#fff',
        },
        '& .super-app-theme--header': {
            backgroundColor: '#E7F7FF !important',
            color: '#000 !important',
        }, 
        
    }
});
