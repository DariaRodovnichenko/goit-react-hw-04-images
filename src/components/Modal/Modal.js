import { useState, useEffect } from 'react';
import { CustomModal } from './Modal.styled';

CustomModal.setAppElement('#root');

export const Modal = ({ isOpen, closeModal, selectedImage, alt }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  const handleCloseModal = () => {
    setModalIsOpen(false);
    closeModal();
  };

  return (
    <CustomModal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Image Modal"
      shouldCloseOnOverlayClick={true}
    >
      <img src={selectedImage} alt={alt} />
    </CustomModal>
  );
};
