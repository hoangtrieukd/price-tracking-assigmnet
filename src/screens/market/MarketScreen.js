import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { Star, StarOutline } from '@mui/icons-material';
import { Box } from '@mui/system';
import { ENV } from '../../utils/env';
import marketStyles from './assets/market_screen.module.scss';
import DataGridCommon from '../../common/dataGridCommon/DataGridCommon';
import {
  TabCommon,
  TabContextCommon,
  TabListCommon,
  TabPanelCommon,
} from '../../common/tabCommon';
import { TextFieldCommon } from '../../common/inputCommon';

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
      if (status === 200 && data?.length) {
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
    const coins = coinList.filter((coin) => coin.symbol.includes(query));
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
    {
      field: 'price_change_percentage_24h',
      headerName: '24h %',
      type: 'number',
      width: 90,
    },
    {
      field: 'low_24h',
      headerName: 'Low 24h',
      type: 'number',
      width: 90,
    },
    {
      field: 'total_supply',
      headerName: 'Total Supply',
      type: 'number',
      width: 150,
    },
    {
      field: 'market_cap',
      headerName: 'Market Cap',
      type: 'number',
      width: 150,
    },
    {
      field: 'circulating_supply',
      headerName: 'Circulating Supply',
      type: 'number',
      width: 150,
    },
    {
      field: 'total_volume',
      headerName: 'Total Volume',
      type: 'number',
      width: 150,
    },
  ];

  const favoriteTab = () => {
    if (watchList.length) {
      return (
        <div style={{ height: 600, width: '100%' }}>
          <DataGridCommon rows={watchList} columns={columns} />
        </div>
      );
    }

    return <div>No watchlist</div>;
  };

  return (
    <div className={marketStyles.market_screen_wrapper}>
      <TextFieldCommon
        variant='outlined'
        placeholder='Search'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        style={{ alignSelf: 'flex-end', margin: 5 }}
      />

      <Box sx={{ width: '100%' }}>
        <TabContextCommon value={tabIndex}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabListCommon
              onChange={(event, newIndex) => setTabIndex(newIndex)}
              aria-label='market tab'
            >
              <TabCommon label='All Cryptos' value='1' />
              <TabCommon label='Favorites' value='2' />
            </TabListCommon>
          </Box>
          <TabPanelCommon value='1'>
            <div style={{ height: 600, width: '100%' }}>
              <DataGridCommon rows={filterCoinList()} columns={columns} />
            </div>
          </TabPanelCommon>
          <TabPanelCommon value='2'>{favoriteTab()}</TabPanelCommon>
        </TabContextCommon>
      </Box>
    </div>
  );
}
