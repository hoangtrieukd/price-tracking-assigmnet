import React from 'react';
import PropTypes from 'prop-types';
import { TabList } from '@mui/lab';

function TabListCommon(props) {
  return <TabList {...props} />;
}

TabListCommon.propTypes = {
  onChange: PropTypes.func,
};

export default TabListCommon;
