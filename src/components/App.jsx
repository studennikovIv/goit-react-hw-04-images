// import React, { Component } from 'react';
// import Searchbar from './Searchbar/Searchbar';
// import ImageGallery from './ImageGallery/ImageGallery';
// import Modal from './Modal/Modal';
// import Button from './Button/Button';
// import Loader from './Loader/Loader';
// import css from './App.module.css';

// import API from './API/API';

// class App extends Component {
//   state = {
//     imgName: '',
//     imgInfo: [],
//     page: 1,
//     totalImage: 0,
//     modalShow: false,
//     largeImageURL: '',
//     loader: false,
//   };

//   componentDidUpdate(_, prevState) {
//     const { page, imgName, per_page } = this.state;

//     if (
//       (prevState.imgName !== imgName && imgName !== '') ||
//       prevState.page !== page
//     ) {
//       this.setState({ loader: true });
//       API(imgName, page, per_page)
//         .then(imgArr => {
//           this.setState({
//             imgInfo: [...prevState.imgInfo, ...imgArr.data.hits],
//             totalImage: imgArr.data.total,
//           });
//         })
//         .catch(error => console.log(error))
//         .finally(() => this.setState({ loader: false }));
//     }
//   }

//   searchImages = imgName => {
//     this.setState({ imgName, page: 1, imgInfo: [] });
//   };

//   modalShow = e => {
//     this.setState(currState => ({
//       modalShow: false,
//     }));
//   };
//   openModal = (open, largeImageURL) => {
//     this.setState({ modalShow: open, largeImageURL: largeImageURL });
//   };
//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };
//   onKeyPress(e) {
//     console.log(e);
//   }

//   render() {
//     const { totalImage, imgInfo, modalShow, largeImageURL, loader } =
//       this.state;
//     return (
//       <>
//         <section className={css.App}>
//           <Searchbar searchImages={this.searchImages} />
//           <ImageGallery imgInfo={imgInfo} openModal={this.openModal} />

//           {modalShow && (
//             <Modal modalShow={this.modalShow} largeImageURL={largeImageURL} />
//           )}
//         </section>
//         {totalImage > imgInfo.length && <Button onClick={this.loadMore} />}
//         {loader && <Loader />}
//       </>
//     );
//   }
// }

// export default App;

import React, { useState, useEffect, useRef } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from './App.module.css';
import API from './API/API';

const App = () => {
  const [imgName, setImgName] = useState('');
  const [imgInfo, setImgInfo] = useState([]);
  const [page, setPage] = useState(1);
  const [totalImage, setTotalImage] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setImgInfo([]);
    setTotalImage(0);
    setPage(1);
    if (imgName !== '') {
      setLoader(true);
      API(imgName, page)
        .then(imgArr => {
          setImgInfo(imgArr.data.hits);
          setTotalImage(imgArr.data.total);
        })
        .catch(error => console.log(error.massage))
        .finally(() => setLoader(false));
    }
  }, [imgName]);
  useEffect(() => {
    if (page > 1) {
      setLoader(true);
      API(imgName, page)
        .then(imgArr => {
          setImgInfo(curr => [...curr, ...imgArr.data.hits]);
        })
        .catch(error => console.log(error.massage))
        .finally(() => setLoader(false));
    }
  }, [page]);

  const searchImages = imgName => {
    setImgName(imgName);
  };
  const closeModal = e => {
    setModalShow(false);
  };
  const openModal = (open, largeImageURL) => {
    setModalShow(open);
    setLargeImageUrl(largeImageURL);
  };
  const loadMore = () => {
    setPage(currPage => currPage + 1);
  };
  return (
    <>
      <section className={css.App}>
        <Searchbar searchImages={searchImages} />
        <ImageGallery imgInfo={imgInfo} openModal={openModal} />
        {modalShow && (
          <Modal
            modalShow={modalShow}
            closeModal={closeModal}
            largeImageURL={largeImageUrl}
          />
        )}

        {loader && <Loader />}
      </section>
      {totalImage > imgInfo.length && <Button onClick={loadMore} />}
      {loader && <Loader />}
    </>
  );
};

export default App;
