import { useState, useEffect, Fragment } from 'react';
import { DateTime } from 'luxon';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import isMatch from '../../utils/isMatch';
import Loading from '../loading/Loading';
import Header from './Header';
import Footer from './Footer';
import AddForm from './AddForm';
import StatusButton from './StatusButton';
import DateTimeInput from '../datetime/DateTime';

import actions from '../../actions';

const Home = () => {
  const initialState = {
    EquipmentName: '',
    StartedAt: null,
    EndedAt: null,
    Status: '',
    Comments: '',
    Id: '',
  };

  const [state, setState] = useState();
  const [selection, setSelection] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(initialState);
  const [match, setMatch] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const { data } = await actions.getAction();
    setState(
      data.rows.map((r) => {
        return {
          ...r,
          StartedAt: r.StartedAt ? DateTime.fromSQL(r.StartedAt) : null,
          EndedAt: r.EndedAt ? DateTime.fromSQL(r.EndedAt) : null,
        };
      })
    );
    if (data.rows && selection) {
      const res = data.rows.filter((s) => s.Id == selection)[0];
      if (res) {
        const StartedAt = res.StartedAt ? DateTime.fromSQL(res.StartedAt) : null;
        const EndedAt = res.EndedAt ? DateTime.fromSQL(res.EndedAt) : null;

        setData({
          ...res,
          StartedAt,
          EndedAt,
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const isMatchResult = isMatch(state, data);
    setMatch(isMatchResult);
  }, [data, state]);

  const handleSelectChange = (e) => {
    const selection = e.target.value;

    const res = state.filter((s) => s.Id == selection)[0];

    if (res) {
      const StartedAt = res.StartedAt ? DateTime.fromISO(res.StartedAt) : null;
      const EndedAt = res.EndedAt ? DateTime.fromISO(res.EndedAt) : null;

      setData({
        ...res,
        StartedAt,
        EndedAt,
      });
    } else {
      setData(initialState);
    }
    setSelection(selection);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    setLoading(true);

    await actions.updateAction(data);

    setState((prev) =>
      prev.map((s) => {
        console.log({ s });
        if (s.Id == selection) {
          console.log({ data });
          return data;
        }
        return s;
      })
    );
    setLoading(false);
  };

  const handleDelete = async (e) => {
    setLoading(true);
    try {
      await actions.deleteAction(data);
      setState((prev) => prev.filter((p) => p.Id != selection));
      setSelection(null);
      setData(initialState);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    setLoading(true);
    setModalOpen(false);

    try {
      if (data.StartedAt) data.StartedAt = data.StartedAt.toString();
      if (data.EndedAt) data.EndedAt = data.EndedAt.toString();

      await actions.saveAction(data);
      const res = await actions.getOneAction(data.EquipmentName);

      const id = res.data.rows.reduce((acc, row) => {
        return Math.max(acc, row.Id);
      }, 0);

      data.Id = id;

      setSelection(id);

      loadData();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <div>
      {loading && <Loading />}

      <Header
        selection={selection}
        eqmt={state}
        handleSelectChange={handleSelectChange}
        loadData={loadData}
        handleModalOpen={handleModalOpen}
      />

      {data && (
        <Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <DateTimeInput
                data={data.StartedAt}
                handleChange={handleChange}
                label='Archive Start Time'
                name='StartedAt'
                disabled={!data.Id}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateTimeInput
                data={data.EndedAt}
                handleChange={handleChange}
                label='Archive End Time'
                name='EndedAt'
                disabled={!data.Id}
              />
            </Grid>
            <Grid item xs={12}>
              <StatusButton handleChange={handleChange} data={data} disabled={!data.Id} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='Comments'
                value={data.Comments}
                onChange={(e) => handleChange(e)}
                fullWidth
                multiline
                label='Comments'
                disabled={!data.Id}
              />
            </Grid>
            <Grid item xs={12}>
              {data.Id && (
                <Footer handleDelete={handleDelete} handleUpdate={handleUpdate} match={match} />
              )}
            </Grid>
          </Grid>
        </Fragment>
      )}
      {modalOpen && (
        <AddForm
          modalOpen={modalOpen}
          handleModalClose={handleModalClose}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};

export default Home;
