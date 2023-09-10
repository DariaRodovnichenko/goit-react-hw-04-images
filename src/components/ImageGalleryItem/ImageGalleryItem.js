import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import { GalleryImg, ImgGalleryItem } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
    selectedImage: null,
  };

  toggleModal = image => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
      selectedImage: prevState.isModalOpen ? null : image.largeImageURL,
    }));
  };

  render() {
    const { image } = this.props;
    const { isModalOpen, selectedImage } = this.state;

    return (
      <ImgGalleryItem onClick={() => this.toggleModal(image)}>
        <GalleryImg src={image.webformatURL} alt={image.tags} />
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            closeModal={() => this.toggleModal(image)}
            selectedImage={selectedImage}
            alt={image.tags}
          />
        )}
      </ImgGalleryItem>
    );
  }
}
