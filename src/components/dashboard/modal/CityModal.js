import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import CityModalForm from './CityModalForm';
import CityModalFrom from './CityModalForm';

export default function CityModal({ userid }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <div>
            <Button onClick={handleOpen}>
                +
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <CityModalFrom userid={userid}/>
            </Dialog>
        </div>
    );

}