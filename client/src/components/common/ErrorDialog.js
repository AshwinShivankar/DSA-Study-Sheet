import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

const ErrorDialog = ({ open, onClose, title, message }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title || 'Error'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message || 'An error occurred. Please try again.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog; 