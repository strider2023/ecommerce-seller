import React from 'react';
import { useRouter } from 'next/router'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AppTableHead from './AppTableHead';
import Link from 'next/link';
import { Avatar, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Toolbar, Typography } from '@mui/material';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default function AppTable(props) {
    const router = useRouter();
    const [order, setOrder] = React.useState(props.defaultOrder);
    const [orderBy, setOrderBy] = React.useState(props.defaultOrderColumn);
    const [page, setPage] = React.useState(props.defaultPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(props.defaultRowsPerPage);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClick = (event, newPage) => {
        event.preventDefault();
        if(props.onClickURL.trim().length > 0) {
            router.push(props.onClickURL + newPage);
        }
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.tableData.length - page * rowsPerPage);

    const handleRowText = (item, value) => {
        switch (item.type) {
            case 'IMAGE':
                return <Avatar alt="Preview Image" src={value} sx={{ width: 56, height: 56 }} />;
            case 'DATE':
                return new Date(Number(value)).toLocaleString();
            case 'BUTTON':
                return <IconButton onClick={(e) => item.onButtonClick(e, value)}>
                    {item.icon}
                </IconButton>;
            default:
                return value;
        }
    }

    return (
        <div>
            <Paper>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {props.title}
                    </Typography>
                    {props.showCreate &&
                        <Link href={props.createURL}>
                            <IconButton>
                                <AddRoundedIcon />
                            </IconButton>
                        </Link>
                    }
                </Toolbar>
                <TableContainer>
                    <Table aria-labelledby="tableTitle" aria-label="enhanced table">
                        <AppTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            headCells={props.headCells}
                        />
                        <TableBody>
                            {stableSort(props.tableData, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover
                                            onClick={props.overridenClick ? (event) => props.overridenClick(event, row) : (event) => handleClick(event, row[props.primaryRowKey])}
                                            tabIndex={-1}
                                            key={row[props.primaryRowKey]}
                                            style={{ cursor: 'pointer' }}>
                                            {
                                                props.headCells.map((item, i) => {
                                                    return (
                                                        <TableCell align="center" key={i}>{
                                                            handleRowText(item, row[item.id])
                                                        }
                                                        </TableCell>);
                                                })
                                            }
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 15]}
                    component="div"
                    count={props.tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}