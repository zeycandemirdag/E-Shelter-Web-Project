import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography,
} from '@mui/material';

function MedicalHistoryDialog({ open, onClose, medicalHistory }) {
  if (!medicalHistory) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Medical History</DialogTitle>
      <DialogContent>
        <Typography>Medication: {medicalHistory.medication}</Typography>
        <Typography>Height: {medicalHistory.height}</Typography>
        <Typography>Weight: {medicalHistory.weight}</Typography>
        <Typography>Medical Condition: {medicalHistory.medicalCondition}</Typography>
        <Typography>Note: {medicalHistory.note}</Typography>
        {medicalHistory.veterinary && (
          <>
            <Typography>Clinic Name: {medicalHistory.veterinary.clinicName}</Typography>
            <Typography>Vet Name: {medicalHistory.veterinary.vetName} {medicalHistory.veterinary.vetSurname}</Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MedicalHistoryDialog;
