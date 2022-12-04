// import React, { Component } from 'react';
// import css from './Searchbar.module.css';
// import PropTypes from 'prop-types';

// class Searchbar extends Component {
//   state = {
//     imgName: '',
//   };

//   filterChange = event => {
//     const { value } = event.currentTarget;
//     this.setState({ imgName: value });
//   };

//   submitForm = e => {
//     const { imgName } = this.state;
//     e.preventDefault();
//     this.props.searchImages(imgName);
//   };

//   render() {
//     return (
//       <header className={css.Searchbar}>
//         <form className={css.SearchForm} onSubmit={this.submitForm}>
//           <button type="submit" className={css.SearchFormButton}>
//             <span className={css.SearchFormButtonLabel}>Search</span>
//           </button>

//           <input
//             onChange={this.filterChange}
//             className={css.SearchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }

// export default Searchbar;
// Searchbar.propTypes = {
//   searchImages: PropTypes.func.isRequired,
// };
import React, { useState } from 'react';
import css from './Searchbar.module.css';

const Searchbar = ({ searchImages }) => {
  const [imgName, setImgName] = useState('');

  const filterChange = event => {
    const { value } = event.currentTarget;
    setImgName(value);
  };
  const submitForm = e => {
    e.preventDefault();
    searchImages(imgName);
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={submitForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={filterChange}
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
