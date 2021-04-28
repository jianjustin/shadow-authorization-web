import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { DataGrid } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    grid: {
      padding: theme.spacing(1),
    },
    buttonGroup: {
        paddingRight: 20
    },
    addButton:{
        margin: 10,
    },
    editButton:{
        margin: 10,
    },
    delButton:{
        margin: 10,
    },
    paper: {
      textAlign: 'right',
      color: theme.palette.text.secondary,
    },
  }));

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

function User(){
  const classes = useStyles();

  return (
    <div>
        <Grid item xs={12} className={classes.grid}>
            <Paper className={classes.paper}>
                <div className={classes.buttonGroup}>
                    <Button variant="contained" className={classes.addButton} startIcon={<AddIcon />} color="primary" size="small">新增</Button>
                    <Button variant="contained" className={classes.editButton} startIcon={<EditIcon />} color="default" size="small">编辑</Button>
                    <Button variant="contained" className={classes.delButton} startIcon={<DeleteIcon />} color="secondary" size="small">删除</Button>
                </div>
            </Paper>
        </Grid>
        <Grid item xs={12} className={classes.grid}>
            <Paper>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                </div>
            </Paper>
        </Grid>
    </div>
  );
}

export default User;