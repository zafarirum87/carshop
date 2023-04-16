import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Editcar(props) {
    const [open, setOpen] = React.useState(false);
    const [car, setCars] = React.useState({
        brand: '', model: '', color: '', fuel: '', year: '', price: ''
    });

    const handleClickOpen = () => {
        console.log(props.car);
        setCars({brand: props.car.brand, model: props.car.model, color: props.car.color,
             fuel: props.car.fuel, year: props.car.year, price: props.car.price})
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputChanged = (event) => {
     setCars({...car, [event.target.name]: event.target.value});
    }

    const updateCar = () =>{
        props.updateCar(car, props.car._links.car.href );
        handleClose();
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                Edit Car
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Car</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="brand"
                        value= {car.brand}
                        label='brand'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="model"
                        value= {car.model}
                        label='model'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="color"
                        value= {car.color}
                        label='color'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="fuel"
                        value= {car.fuel}
                        label='fuel'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="year"
                        value= {car.year}
                        label='year'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="price"
                        value= {car.price}
                        label='price'
                        onChange={e => inputChanged(e)}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateCar}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}