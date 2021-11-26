import React from 'react';
import PropTypes from 'prop-types';
import { TabPanel } from '@mui/lab';

function TabPanelCommon(props) {
  const { value } = props;
  return <TabPanel value={value} {...props} />;
}

TabPanelCommon.propTypes = {
  value: PropTypes.string,
};

export default TabPanelCommon;
