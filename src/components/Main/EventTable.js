import React, { useState, useEffect} from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Pagination from "@material-ui/lab/Pagination";

const EventTable = ({ events, addSingleEvent }) => {

    const [page, setPage] = useState(1);

    useEffect(() => {
        setPage(1)
    }, [events])


    const useStyles = makeStyles({
        row: {
            backgroundColor: "#16171a",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#131111"
            },
            fontFamily: "Montserrat",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "red",
            },
        },
    });

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.error.light,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.common.white,
            },
            '&:nth-of-type(EVENT)': {
                backgroundColor: theme.palette.common.white,
            },
            "&:hover": {
                backgroundColor: "#d3d3d3",
                cursor: "pointer"
            },
            '&:last-child td, &:last-child th': {
                border: 0,
            },
        },
    }))(TableRow);

    const classes = useStyles();

    function formatDate(date) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return [
            (date.getDate()).toString().padStart(2, '0'),
            (monthNames[date.getMonth()]).toString().padStart(2, '0'),
            date.getFullYear(),
        ].join('-');
    }

    function getTime(num) {
        const time = num.split('T')
        return time[1];
    }

    return (
        <>
            <TableContainer component={Paper} className='centered' style={{ width: "100%", marginTop: "30px" }}>
                {events.length > 0 ?
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Title</StyledTableCell>
                                <StyledTableCell align="center">Type</StyledTableCell>
                                <StyledTableCell align="center">Date</StyledTableCell>
                                <StyledTableCell align="center">Time (24 hr)</StyledTableCell>
                                <StyledTableCell align="center">Id</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events && events.slice((page - 1) * 10, (page - 1) * 10 + 10).map((ev) => (
                                <StyledTableRow key={ev.id} onClick={() => addSingleEvent(ev)}>
                                    <StyledTableCell align="center">{ev.title}</StyledTableCell>
                                    <StyledTableCell align="center">{ev.categories[0].title}</StyledTableCell>
                                    <StyledTableCell align="center">{formatDate(new Date(ev.geometries[0].date))}</StyledTableCell>
                                    <StyledTableCell align="center">{getTime(ev.geometries[0].date)}</StyledTableCell>
                                    <StyledTableCell align="center">{ev.id}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                    :
                    <h1>Data not found</h1>
                }
            </TableContainer >

            <Pagination
                count={+(events?.length / 10).toFixed(0) === 0 ? 1 : +(events?.length / 10).toFixed(0)}
                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
                classes={{ ul: classes.pagination }}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
            />
        </>
    )
}

export default EventTable;