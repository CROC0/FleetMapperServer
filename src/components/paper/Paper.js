import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  container: {
    marginTop: '2rem',
  },
}));

const CustomPaper = ({ children }) => {
  const classes = useStyles();
  return (
    <Container maxWidth={'sm'} className={classes.container}>
      <Paper className={classes.paper}>{children}</Paper>
    </Container>
  );
};

export default CustomPaper;
