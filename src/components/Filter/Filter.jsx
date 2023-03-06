import PropTypes from 'prop-types';
import { Label } from './Filter.stuled';

const Filter = ({ value, onChangeInput }) => {
  return (
    <Label>
      Find contacts by name:
      <input type="text" value={value} onChange={onChangeInput} />
    </Label>
  );
};

export { Filter };

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
};
