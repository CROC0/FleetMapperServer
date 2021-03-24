import { useState } from 'react';

import { Button, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import DateTimeInput from '../datetime/DateTime';
import StatusButton from './StatusButton';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    width: '100%',
    padding: theme.spacing(5),
    margin: theme.spacing(5),
  },
  button: {
    marginRight: theme.spacing(3),
    minWidth: 85,
  },
}));

const AddForm = ({ modalOpen, handleModalClose, handleSave }) => {
  const classes = useStyles();

  const initialState = {
    EquipmentName: '',
    StartedAt: null,
    EndedAt: null,
    Status: '',
    Comments: '',
  };

  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [errorState, setErrorState] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newState = { ...state, [name]: value };

    const errors = validateForm(newState);

    setErrors(errors);

    setState(newState);
  };

  const handleClose = (e) => {
    //TODO: Add dirty form check
    if (e.target.id === 'wrapper') {
      handleModalClose();
    }
  };

  const handleSubmit = (e) => {
    setErrorState(true);
    const [isValid, errors] = validateForm(state);
    console.log({ isValid }, { errors });
    if (isValid) {
      handleSave(state);
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    let isValid = true;
    for (const [key, value] of Object.entries(data)) {
      if (!value) {
        errors[key] = `${key} is a required field`;
        isValid = false;
      }
    }
    return [isValid, errors];
  };

  return (
    <Modal open={modalOpen} onClose={handleClose}>
      <Container>
        <div className={classes.wrapper} onClick={(e) => handleClose(e)} id='wrapper'>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Typography variant='h5'>Add New Archive Record</Typography>
              <Grid item xs={12}>
                <TextField
                  value={state.EquipmentName}
                  onChange={handleChange}
                  name='EquipmentName'
                  label='Equipment Name'
                  error={!!errors.EquipmentName && errorState}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DateTimeInput
                  data={state.StartedAt}
                  handleChange={handleChange}
                  label='Archive Start Time'
                  name='StartedAt'
                  error={!!errors.StartedAt && errorState}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DateTimeInput
                  data={state.EndedAt}
                  handleChange={handleChange}
                  label='Archive End Time'
                  name='EndedAt'
                  error={!!errors.EndedAt && errorState}
                />
              </Grid>
              <Grid item xs={12}>
                <StatusButton
                  handleChange={handleChange}
                  data={state}
                  error={!!errors.Status && errorState}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name='Comments'
                  value={state.Comments}
                  onChange={(e) => handleChange(e)}
                  fullWidth
                  multiline
                  label='Comments'
                  error={!!errors.Comments && errorState}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  color='primary'
                  variant='outlined'
                  className={classes.button}
                  onClick={handleSubmit}>
                  Save
                </Button>
                <Button
                  color='secondary'
                  variant='outlined'
                  className={classes.button}
                  onClick={handleModalClose}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Container>
    </Modal>
  );
};

export default AddForm;
