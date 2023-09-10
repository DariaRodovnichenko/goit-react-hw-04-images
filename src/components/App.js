import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { fetchImages, normalizedImg } from './services/api';
import { Loader } from './Loader/Loader';
import { MainContainer } from './App.styled';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    error: null,
    isLoading: false,
    totalPages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  handleLoadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      // () => {
      //   console.log('Page incremented:', this.state.page);
      // }
    );
  };

  handleSubmit = category => {
    this.setState({
      query: category,
      page: 1,
      images: [],
      error: null,
    });
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    const perPage = 12;
    try {
      this.setState({ isLoading: true });
      const data = await fetchImages(query, page);

      if (data.hits.length === 0) {
        return toast.info('Images not found...', {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      const normalizedImgs = normalizedImg(data.hits);

      this.setState(state => ({
        images: [...state.images, ...normalizedImgs],
        totalPages: Math.ceil(data.totalHits / perPage),
        error: null,
      }));
    } catch (error) {
      this.setState({ error: 'Oops! Something went wrong!' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

    render() {
    const { images, isLoading, error, page, totalPages } = this.state;

    return (
      <MainContainer>
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {isLoading && <Loader />}
        {error && <p>{error.message}</p>}
        {images.length > 0 && totalPages !== page && !isLoading && (
          <LoadMoreBtn onClick={this.handleLoadMore} />
        )}
      </MainContainer>
    );
  }
}
