// import css from './Modal.module.css';
// import PropTypes from 'prop-types';
// import { Component } from 'react';

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }
//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.modalShow();
//     }
//   };
//   render() {
//     const { largeImageURL, modalShow } = this.props;
//     return (
//       <div
//         className={css.Overlay}
//         onClick={e => {
//           if (e.target.localName !== 'img') {
//             modalShow();
//           }
//         }}
//       >
//         <div className={css.Modal}>
//           <img src={largeImageURL} alt="" />
//         </div>
//       </div>
//     );
//   }
// }

// export default Modal;

// Modal.propTypes = {
//   largeImageURL: PropTypes.string.isRequired,
//   modalShow: PropTypes.func.isRequired,
// };

import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';

const Modal = ({ modalShow, closeModal, largeImageURL }) => {
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

export default Modal;
