import Home from './components/home/Home';
import LuxonUtils from '@date-io/luxon';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CssBaseline from '@material-ui/core/CssBaseline';

import Appbar from './components/appbar/Appbar';
import Paper from './components/paper/Paper';

function App() {
  return (
    <div>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <CssBaseline />
        <Appbar />
        <Paper>
          <Home />
        </Paper>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default App;
