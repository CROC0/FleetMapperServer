import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const StatusButton = ({ data, handleChange, error, disabled }) => {
  return (
    <FormControl component='fieldset' error={error}>
      <FormLabel component='legend'>Status</FormLabel>
      <RadioGroup
        aria-label='Status'
        name='Status'
        value={data.Status}
        onChange={(e) => handleChange(e)}>
        <FormControlLabel
          disabled={disabled}
          value='Approved'
          control={<Radio color='primary' />}
          label='Approved'
        />
        <FormControlLabel
          disabled={disabled}
          value='Unapproved'
          control={<Radio color='primary' />}
          label='Unapproved'
        />
      </RadioGroup>
    </FormControl>
  );
};

export default StatusButton;
