import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Modal = ({ closeModal, largeImageURL }) => {
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className={css.Overlay}
      onClick={e => {
        if (e.target.localName !== 'img') {
          closeModal();
          window.removeEventListener('keydown', handleKeyDown);
        }
      }}
    >
      <div className={css.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
export default Modal;
