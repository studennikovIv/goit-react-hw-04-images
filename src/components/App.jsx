import React, { useState, useEffect } from 'react';
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
    if (imgName !== '') {
      setLoader(true);
      API(imgName, page)
        .then(imgArr => {
          setImgInfo(curr => [...curr, ...imgArr.data.hits]);
          setTotalImage(imgArr.data.total);
        })
        .catch(error => console.log(error.massage))
        .finally(() => setLoader(false));
    }
  }, [imgName, page]);

  const searchImages = imgName => {
    setPage(1);
    setImgName(imgName);
    setImgInfo([]);
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
      </section>
      {totalImage > imgInfo.length && <Button onClick={loadMore} />}
      {loader && <Loader />}
    </>
  );
};

export default App;
