import React, { useCallback, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import _ from 'lodash';
import axios from 'axios';
import { IconButton, TextField } from '@mui/material';
import { Star, StarOutline } from '@mui/icons-material';
import { ENV } from '../../utils/env';

export default function MarketScreen() {
  const [coinList, setCoinList] = useState([]);
  const [vsCurrency] = useState('usd');
  const [order] = useState('market_cap_desc');
  const [perPage] = useState(100);
  const [sparkline] = useState(false);
  const [query, setQuery] = useState('');
  const [watchList, setWatchList] = useState([]);

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
      renderCell: (params) => {
        const isEnable = watchList.find((item) => item.id === params.id);
        return (
          <div style={{ display: 'flex', textAlign: 'center' }}>
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
            {params.value}
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
    <div>
      <TextField
        variant='outlined'
        placeholder='Search'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filterCoinList()}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          isRowSelectable={() => false}
        />
      </div>
    </div>
  );
}
