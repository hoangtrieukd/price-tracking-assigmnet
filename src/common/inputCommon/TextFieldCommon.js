import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

function TextFieldCommon(props) {
  return <TextField {...props} />;
}

TextFieldCommon.propTypes = {
  value: PropTypes.any,
};

export default TextFieldCommon;
