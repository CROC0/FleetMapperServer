import { DateTimePicker } from '@material-ui/pickers';

const DateTime = ({ label, handleChange, name, data, error, disabled }) => {
  return (
    <DateTimePicker
      fullWidth
      value={data}
      onChange={(value) => handleChange({ target: { value, name } })}
      animateYearScrolling
      format='dd LLL yyyy T a'
      showTodayButton
      ampm={true}
      label={label}
      error={error}
      disabled={disabled}
    />
  );
};

export default DateTime;
