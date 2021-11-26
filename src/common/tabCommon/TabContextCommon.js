import React from 'react';
import PropTypes from 'prop-types';
import { TabContext } from '@mui/lab';

function TabContextCommon(props) {
  const { value } = props;
  return <TabContext value={value} {...props} />;
}

TabContextCommon.propTypes = {
  value: PropTypes.string,
};

export default TabContextCommon;
