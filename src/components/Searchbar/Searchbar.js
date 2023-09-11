import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
  SearchFormLabel,
  SearchbarWrapper,
} from './Searchbar.styled';

export const Searchbar = props => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = evt => {
    setInputValue(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (!inputValue.trim()) {
      toast.info('Please enter a search query.');
      return;
    }

    if (inputValue === props.searchQuery) {
      toast.info(`"${inputValue}" search already completed.`);
      return;
    }

    props.onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <SearchbarWrapper>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <SearchFormLabel>Search</SearchFormLabel>
        </SearchFormBtn>
        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search for images..."
        />
      </SearchForm>
    </SearchbarWrapper>
  );
};
