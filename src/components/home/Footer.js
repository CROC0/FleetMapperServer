import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  update: {
    marginLeft: theme.spacing(3),
  },
}));

const Footer = ({ handleDelete, handleUpdate, match }) => {
  const classes = useStyles();
  return (
    <>
      <Button color='secondary' onClick={handleDelete} variant='outlined'>
        Delete
      </Button>
      {!match && (
        <Button
          className={classes.update}
          onClick={handleUpdate}
          variant='outlined'
          color='primary'>
          Update
        </Button>
      )}
    </>
  );
};

export default Footer;
