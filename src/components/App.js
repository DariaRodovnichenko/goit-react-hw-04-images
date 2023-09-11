import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { fetchData, normalizedImg } from './services/api';
import { Loader } from './Loader/Loader';
import { MainContainer } from './App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchImages = async () => {
      const perPage = 12;
      try {
        setIsLoading(true);
        const data = await fetchData(query, page);

        if (data.hits.length === 0) {
          toast.info('Images not found...', {
            position: toast.POSITION.TOP_CENTER,
          });
                 }

        const normalizedImgs = normalizedImg(data.hits);

        setImages(prevImages => [...prevImages, ...normalizedImgs]);
        setIsLoading(false);
        setTotalPages(Math.ceil(data.totalHits / perPage));
        setError(null);
      } catch (error) {
        setError('Oops! Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSubmit = category => {
    setQuery(category);
    setPage(1);
    setImages([]);
    setError(null);
  };

  return (
    <MainContainer>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery images={images} />}
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {images.length > 0 && totalPages !== page && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </MainContainer>
  );
};
