import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@mui/material';

function TabCommon(props) {
  const { label, value } = props;

  return <Tab label={label} value={value} {...props} />;
}

TabCommon.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

export default TabCommon;
