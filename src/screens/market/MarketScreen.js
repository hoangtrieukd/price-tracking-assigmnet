import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import _ from 'lodash';
import axios from 'axios';
import { IconButton, Tab, TextField } from '@mui/material';
import { Star, StarOutline } from '@mui/icons-material';
import { Box } from '@mui/system';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ENV } from '../../utils/env';

export default function MarketScreen() {
  const [coinList, setCoinList] = useState([]);
  const [vsCurrency] = useState('usd');
  const [order] = useState('market_cap_desc');
  const [perPage] = useState(100);
  const [sparkline] = useState(false);
  const [query, setQuery] = useState('');
  const [watchList, setWatchList] = useState([]);
  const [tabIndex, setTabIndex] = useState('1');

  const fetchList = useCallback(async () => {
    try {
      const result = await axios.get(
        `${ENV.GECKO_API}/coins/markets?vs_currency=${vsCurrency}&order=${order}&per_page=${perPage}&sparkline=${sparkline}`
      );
      const { status, data } = result;
      if (status === 200) {
        setCoinList(data);
      }
    } catch (e) {
      console.log(e);
    }
  }, [vsCurrency, order, perPage, sparkline]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const filterCoinList = () => {
    const coins = _.filter(coinList, (coin) => coin.symbol.includes(query));
    return coins;
  };

  const onChangeWatchList = (coinSelect) => {
    const coinExistInWatch = watchList.find(
      (coin) => coin.id === coinSelect.id
    );
    if (coinExistInWatch) {
      // remove from watchlist
      setWatchList(watchList.filter((item) => item.id !== coinExistInWatch.id));
    } else {
      // add to watchlist
      setWatchList([...watchList, coinSelect.row]);
    }
  };

  const columns = [
    {
      field: 'symbol',
      headerName: 'Name',
      width: 130,
      renderCell: (params) => <b>{params.value}</b>,
    },
    {
      field: 'name',
      headerName: 'Fullname',
      width: 130,
      renderCell: (params) => {
        const isEnable = watchList.find((item) => item.id === params.id);
        return (
          <div style={{ display: 'flex', textAlign: 'center' }}>
            <b>{params.value}</b>
            <IconButton
              color='primary'
              size='small'
              onClick={() => onChangeWatchList(params)}
            >
              {isEnable ? (
                <Star fontSize='small' />
              ) : (
                <StarOutline fontSize='small' />
              )}
            </IconButton>
          </div>
        );
      },
    },
    {
      field: 'current_price',
      headerName: 'Price',
      type: 'number',
      width: 90,
    },
  ];

  return (
    <div
      style={{
        maxWidth: 1200,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TextField
        variant='outlined'
        placeholder='Search'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        style={{ alignSelf: 'flex-end', margin: 5 }}
      />

      <Box sx={{ width: '100%' }}>
        <TabContext value={tabIndex}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={(event, newIndex) => setTabIndex(newIndex)}
              aria-label='market tab'
            >
              <Tab label='All Cryptos' value='1' />
              <Tab label='Favorites' value='2' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <div style={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={filterCoinList()}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                isRowSelectable={() => false}
              />
            </div>
          </TabPanel>
          <TabPanel value='2'>
            <div style={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={watchList}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                isRowSelectable={() => false}
              />
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
