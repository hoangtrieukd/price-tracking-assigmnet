import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';

function DataGridCommon(props) {
  const {
    rows,
    columns,
    pageSize,
    rowsPerPageOptions,
    isRowSelectable,
    ...restProps
  } = props;

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      rowsPerPageOptions={rowsPerPageOptions}
      isRowSelectable={isRowSelectable}
      {...restProps}
    />
  );
}

DataGridCommon.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  pageSize: PropTypes.number,
  rowsPerPageOptions: PropTypes.array,
  isRowSelectable: PropTypes.func,
};

DataGridCommon.defaultProps = {
  pageSize: 10,
  rowsPerPageOptions: [10],
  isRowSelectable: () => false,
};

export default DataGridCommon;
