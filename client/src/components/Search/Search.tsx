import { memo } from 'react'
import { TextField  } from '@material-ui/core'

interface ISearchProps {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
}

function Search({ searchValue, setSearchValue }: ISearchProps) {
  return (
    <TextField
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      type='search'
      label='Поиск'
      variant='outlined'
      size='small'
    />
  )
}

export default memo(Search);
