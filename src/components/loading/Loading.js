import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {
  return (
    <Backdrop open={true} style={{ color: 'white', zIndex: 1000 }}>
      <CircularProgress color='secondary' />
    </Backdrop>
  );
};

export default Loading;
