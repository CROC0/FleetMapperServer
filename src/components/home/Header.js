import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
  },
  selector: {
    width: '70%',
  },
  select: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      fontSize: '90%',
    },
  },
}));

const Header = ({ handleSelectChange, eqmt, loadData, selection, handleModalOpen }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.selector}>
        <FormHelperText id='selector'>Select Archive Record</FormHelperText>
        <Select
          value={selection}
          onChange={(e) => handleSelectChange(e)}
          className={classes.select}
          displayEmpty>
          <MenuItem value={''} disabled>
            Select Record
          </MenuItem>
          {eqmt &&
            eqmt.map((r) => (
              <MenuItem key={r.Id} value={r.Id}>
                <strong>{r.EquipmentName}</strong>:{' '}
                {r.StartedAt && r.StartedAt.toFormat('dd MMM yy')}
                {r.EndedAt && ` - ${r.EndedAt.toFormat('dd MMM yy')}`}
              </MenuItem>
            ))}
        </Select>
      </div>
      <Tooltip title='Add new archive entry'>
        <Button
          variant='outlined'
          color='primary'
          onClick={handleModalOpen}
          className={classes.addButton}>
          <AddCircleIcon />
        </Button>
      </Tooltip>
      <Tooltip title='Reload archive entries'>
        <Button variant='outlined' color='primary' onClick={loadData}>
          <RefreshIcon />
        </Button>
      </Tooltip>
    </div>
  );
};

export default Header;
