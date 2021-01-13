import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CityModalFrom from './CityModalForm';

export default function CityModal({ userid, setCitiesCallback }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <AddIcon />
            </IconButton>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <CityModalFrom userid={userid} handleClose={handleClose} setCitiesCallback={setCitiesCallback} />
            </Dialog>
        </div>
    );

}