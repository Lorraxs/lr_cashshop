import { Box, Image, Text, useMenu, useWindowSize } from 'lr-components';
import React, { useCallback, useMemo } from 'react';
import AppButton from './AppButton';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import ItemOptions from './ItemOptions';
import { clearSelectedOptions } from '../store/items';
import Item from './Item';
import ItemInfo from './ItemInfo';
import { CategoryOption, Item as ItemType } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, GridCellProps } from 'react-virtualized';

const MotionBox = motion(Box);

const Items = React.forwardRef<HTMLDivElement>((props, ref) => {
  const store = useSelector((state: RootState) => state.items);
  const { ratioWidth } = useWindowSize();
  const selectedItem = useSelector(
    (state: RootState) => state.items.selectedItem
  );
  const dispatch = useDispatch<AppDispatch>();
  const menu = useMenu([
    {
      name: 'all',
      label: 'Tất Cả',
      args: {
        icon: 'data:png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAABlUlEQVR4nO3cy07DMBBGYYsFUnlxypaL2gfksgM2sD2o0G1RU43Hdny+B5jJ/IrixLJSiiRJkiRJ0sSAa+AOeOUM/9RZpJM6L8D2kEGp7dhotICi62xLbefeycGD0Vmdt1Jbo8EYpU6Y3gajszphehuMzuqEada4EYNOYtBJDDqJQScx6CSzLf6SJGk6Ua87wA3wBHxS3wfwCGxazVtaNQb25Nu3mre0aAxcAd/k+zr0zp73IhGNMeicoBs+OnZloVOFSm1RjYEN8HBcqGp7B+6nXAxHYdBJDDqJQScx6CQGnWT4xZ+4vY6L9zGmQPwHy+J9jNWjzif44n2M1cOgh3507BIvfxzE7XVcvI/RtVPTlpWi1bwG/cegg3HCehs3YtBJDDrJ8EHjuY60oPfk81xHEs91JJkr6APPdeQFvfFchyRJUnPNXuAbGf6DZRQGncSgkxh0EoOeNeilF8RK64TpbTA6qxOmt8HorE6Y4699uxmMNnWeS23+1vjXbdaPurfn3tn/1Flkuh91S5IkSZIklX79AGoWRvUeCODkAAAAAElFTkSuQmCC',
        options: [],
      },
    },
    ...store.categories,
  ]);
  const filteredItems = useMemo(() => {
    const categoryItems = store.items.filter((item) => {
      return (
        item.category === menu.activeMenu.name || menu.activeMenu.name === 'all'
      );
    });
    if (store.selectedOptions.length === 0) {
      return categoryItems;
    }
    const filteredItems = categoryItems.filter((item) => {
      /* return item.categoryOptions.every((option) => {
        return store.selectedOptions.includes(option);
      }); */
      return store.selectedOptions.every((option) => {
        if (option === 'coin' || option === 'money') {
          if (item.price[option]) {
            return true;
          }
        }
        return item.categoryOptions.includes(option);
      });
    });
    return filteredItems;
  }, [menu.activeMenu.name, store.items, store.selectedOptions]);
  const itemList = useMemo(() => {
    const items: ItemType[][] = [];
    let row: ItemType[] = [];
    if (filteredItems.length === 0) return [];
    if (filteredItems.length < 7) {
      return [filteredItems];
    }
    filteredItems.forEach((item) => {
      if (row.length < 7) {
        row.push(item);
      } else {
        items.push(row);
        row = [];
        row.push(item);
      }
    });
    return items;
  }, [filteredItems]);
  const options = useMemo(() => {
    const defaultOptions: CategoryOption[] = [
      { name: 'coin', label: 'Coin' },
      { name: 'money', label: 'Tiền Ingame' },
    ];
    const options = menu.activeMenu.args?.options || [];
    return [...defaultOptions, ...options];
  }, [menu.activeMenu]);

  const cellRenderer = useCallback(
    ({ columnIndex, rowIndex, style }: GridCellProps) => {
      if (!itemList[rowIndex][columnIndex]) return null;
      return (
        <Item
          key={`${rowIndex}-${columnIndex}`}
          item={itemList[rowIndex][columnIndex]}
          style={style}
        />
      );
    },
    [itemList]
  );

  return (
    <Box
      rWidth={1320}
      rHeight={980}
      rPadding={10}
      boxSizing='border-box'
      rBorderRadius={10}
      position='relative'
      display='flex'
      flexDirection='column'
      rGap={10}
      overflow='hidden'
      ref={ref}
    >
      <Box
        width={'100%'}
        display='flex'
        rHeight={50}
        rGap={10}
        rBorderRadius={10}
      >
        {menu.menuItems.map((item, index) => {
          return (
            <AppButton
              rHeight={50}
              rBorderRadius={10}
              rGap={10}
              active={menu.activeMenu.name === item.name}
              key={item.name}
              onClick={() => {
                dispatch(clearSelectedOptions());
                menu.switchMenu(index);
              }}
            >
              <Image src={item.args?.icon || ''} rWidth={30} rHeight={30} />
              <Text fontFamily='Roboto'>{item.label}</Text>
            </AppButton>
          );
        })}
      </Box>
      <ItemOptions options={options} />
      <Box
        width={'100%'}
        rHeight={830}
        rBorderRadius={10}
        background={'rgba(135, 80, 253, 0.20)'}
        backdropFilter='blur(5px)'
        overflow='hidden'
      >
        {/* <OverlayScrollbarsComponent
          style={{
            width: '100%',
            height: '100%',
          }}
          defer
        >
          <Box display='flex' rGap={10} flexWrap='wrap'>
            <AnimatePresence mode='sync'>
              {filteredItems.map((item) => {
                return (
                  <MotionItem
                    item={item}
                    key={item.name}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.0, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ ease: 'easeInOut' }}
                  />
                );
              })}
            </AnimatePresence>
          </Box>
        </OverlayScrollbarsComponent> */}
        <Grid
          cellRenderer={cellRenderer}
          columnCount={7}
          columnWidth={ratioWidth * 180}
          height={830 * ratioWidth}
          rowCount={itemList.length}
          rowHeight={ratioWidth * 180}
          width={1300 * ratioWidth}
        />
      </Box>
      {/* {selectedItem && (
        <Box
          width={'100%'}
          height={'100%'}
          position='absolute'
          left={0}
          top={0}
          backgroundColor='rgba(23, 13, 44, 0.767)'
          backdropFilter='blur(5px)'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <ItemInfo item={selectedItem} />
        </Box>
      )} */}
      <AnimatePresence>
        {selectedItem && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            width={'100%'}
            height={'100%'}
            position='absolute'
            left={0}
            top={0}
            backgroundColor='rgba(23, 13, 44, 0.767)'
            backdropFilter='blur(5px)'
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <ItemInfo item={selectedItem} />
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
});

export default Items;
