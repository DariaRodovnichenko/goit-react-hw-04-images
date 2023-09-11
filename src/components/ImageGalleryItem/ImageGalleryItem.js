import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { GalleryImg, ImgGalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedImage, setSelectedImage] = useState(null);

  const toggleModal = () => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
    // setSelectedImage(prevSelectedImage =>
    //   prevIsModalOpen ? null : image.largeImageURL
    // );
  };

  return (
    <ImgGalleryItem onClick={toggleModal}>
      <GalleryImg src={image.webformatURL} alt={image.tags} />
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          closeModal={toggleModal}
          selectedImage={image.largeImageURL}
          alt={image.tags}
        />
      )}
    </ImgGalleryItem>
  );
};
