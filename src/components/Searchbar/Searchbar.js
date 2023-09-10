import { Component } from 'react';
import { toast } from 'react-toastify';
import { SearchForm, SearchFormBtn, SearchFormInput, SearchFormLabel, SearchbarWrapper } from './Searchbar.styled';


export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleInputChange = evt => {
    this.setState({ inputValue: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { inputValue } = this.state;

    if (!inputValue.trim()) {
      toast.info('Please enter a search query.');
      return;
    }

    if (inputValue === this.props.searchQuery) {
      toast.info(`"${inputValue}" search already completed.`);
      return;
    }

    this.props.onSubmit(inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <SearchbarWrapper>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <SearchFormLabel>Search</SearchFormLabel>
          </SearchFormBtn>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            placeholder="Search for images..."
          />
        </SearchForm>
      </SearchbarWrapper>
    );
  }
}
