import { Box } from 'lr-components';
import React from 'react';
import { CategoryOption } from '../types';
import CheckBox from './CheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { addSelectedOptions, removeSelectedOptions } from '../store/items';

interface Props {
  options: CategoryOption[];
}

function ItemOptions(props: Props) {
  const { options } = props;
  const selectedOptions = useSelector(
    (state: RootState) => state.items.selectedOptions
  );
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box
      width={'100%'}
      display='flex'
      rGap={10}
      flexWrap='wrap'
      rHeight={60}
      rBorderRadius={10}
      background={'rgba(135, 80, 253, 0.20)'}
      backdropFilter='blur(5px)'
    >
      {options.map((option, index) => {
        return (
          <CheckBox
            key={index.toString()}
            active={selectedOptions.includes(option.name)}
            label={option.label}
            name={option.name}
            onClick={() => {
              if (selectedOptions.includes(option.name)) {
                dispatch(removeSelectedOptions(option.name));
              } else {
                dispatch(addSelectedOptions(option.name));
              }
            }}
          />
        );
      })}
    </Box>
  );
}

export default ItemOptions;
