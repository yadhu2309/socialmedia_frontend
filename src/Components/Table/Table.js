import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


import { AuthContext } from '../../utils/AuthContext';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


// interface Column {
//   id: 'name' | 'code' | 'population' | 'size' | 'density';
//   label: string;
//   minWidth?: number;
//   align?: 'right';
//   format?: (value: number) => string;
// }

// const columns: readonly Column[] = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toFixed(2),
//   },
// ];

// interface Data {
//   name: string;
//   code: string;
//   population: number;
//   size: number;
//   density: number;
// }

// function createData(
//   name: string,
//   code: string,
//   population: number,
//   size: number,
// ): Data {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];

export default function StickyHeadTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let{detail,mentor,setDetail,mentorDetails,requests,requestDetails,setRequestDetails,setRequests,user}=React.useContext(AuthContext)

//   const handleChangePage = () => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (even) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

  return (
    <>
    {/* {console.log('request det',requestDetails)} */}
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))} */}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows
              
              .map((row,index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}
                  onClick={()=>{props.actions(index);
                handleOpen()}}>
                   
                        <TableCell>
                        {row.username}
                        </TableCell>
                   
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.title==='requests'?'Request Details':'Mentor Details'}
        </Typography>
        {props.title==='requests'?
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
{/*           
          {console.log('requestDetails',requestDetails)} */}
          
          Name:{requestDetails.name}{requestDetails.id}<br/>
          Username:{requestDetails.username}<br/>
          Phone:{requestDetails.phone}<br/>
          Email:{requestDetails.email}<br/>
         Address:{requestDetails.address}<br/>
        Enterprise:{requestDetails.company_name}<br/>
        Enterprise_Email:{requestDetails.email_company}<br/>
       

      </Typography>:
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {console.log(mentorDetails)}
 Name:{mentorDetails.first_name} {mentorDetails.last_name}<br/>
        Username:{mentorDetails.username}<br/>
        Phone:{mentorDetails.phone}<br/>
        Email:{mentorDetails.email}<br/>
       Address:{detail.address},{detail.country},{detail.state}


          
          
        </Typography>
        }
        <button onClick={handleClose}>Close</button>
        <button onClick={()=>{handleClose();props.action()}}>Approve</button>
      </Box>
    </Modal>
</>);
}