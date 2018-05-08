import React  from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './IndexIndicator.scss';

function IndexIndicator({ items, currentIndex, nbrOfSlidesInView, indexClick }) {

  function getDotClassName(index) {
    const dotActiveCondition = index >= currentIndex &&
      index < currentIndex + nbrOfSlidesInView;

    return classNames({
      [styles.dotActive]: dotActiveCondition,
      [styles.dot]: !dotActiveCondition,
    });
  }

  return (
    <div className={styles.dots}>
      {
        items.map((kid, index) => {
          return (
            <div
              className={getDotClassName(index)}
              onClick={() => indexClick(index)}
              key={index}
            />
          );
        })
      }
    </div>
  );
}

IndexIndicator.propTypes = {
  items: PropTypes.array.isRequired,
  nbrOfSlidesInView: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  indexClick: PropTypes.func
};

export default IndexIndicator;
