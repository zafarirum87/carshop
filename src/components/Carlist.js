
import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Addcar from './Addcar';
import Editcar from './Editcar';



export default function Carlist() {
    const [cars, setCars] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);

    useEffect(() => getCarList(), []);

    const getCarList = () => {
        fetch('https://carrestapi.herokuapp.com/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars));
    }

    const [columnDefs] = useState([
        { field: 'brand', sortable: true, filter: true },
        { field: 'model', sortable: true, filter: true },
        { field: 'color', sortable: true, filter: true },
        { field: 'fuel', sortable: true, filter: true, width: 100 },
        { field: 'year', sortable: true, filter: true, width: 100 },
        { field: 'price', sortable: true, filter: true, width: 100 },
        {
            sortable: false, filter: false,
            cellRenderer: params => <Editcar updateCar={updateCar} car={params.data}/>
        },
        {
            sortable: false, filter: false,
            cellRenderer: params =>
                <Button
                    size='small'
                    color='error'
                    onClick={() => deleteCar(params)}
                >
                    Delete
                </Button>
            , width: 120
        }
    ])

    const deleteCar = (params) => {
        if (window.confirm('Are you sure?')) {
            fetch(params.data._links.car.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setOpenAlert(true);
                        getCarList();
                    }
                    else {
                        alert('Something went wrong in deletion');
                    }
                })
                .catch(err => console.error(err))
        }
    }

    const saveCar = (car) =>{
        fetch('https://carrestapi.herokuapp.com/cars',
         {method: 'POST',
          headers: { 'Content-Type':'application/json'},
           body: JSON.stringify(car)})
           .then(res => res => getCarList())
           .catch(err => console.err(err))
    }

    const updateCar = (car, link) =>{
        fetch(link ,
         {method: 'PUT',
          headers: { 'Content-Type':'application/json'},
           body: JSON.stringify(car)})
           .then(res => res => getCarList())
           .catch(err => console.err(err))
    }
        return (
        <div>
            <Addcar saveCar={saveCar}/>
            <div
                className='ag-theme-material'
                style={{ width: '90%', height: 600, margin: 'auto' }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
            <Snackbar
                open={openAlert}
                message="Car deleted successfully"
                autoHideDuration={3000}
                onClose={() => setOpenAlert(false)}
            />
        </div>
    );
}