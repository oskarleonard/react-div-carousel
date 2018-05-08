import React  from 'react';
import PropTypes from 'prop-types';
import styles from './NavigationArrows.scss';

function NavigationArrows({ slideToNext, slideToPrevious }) {

  return (
    <React.Fragment>
      <div
        className={styles.arrowLeft}
        onClick={slideToPrevious}
      >
        <span className={`${styles.iconArrow}`}>
          {'<'}
        </span>
      </div>
      <div
        className={styles.arrowRight}
        onClick={slideToNext}
      >
        <span className={`${styles.iconArrow}`}>
          {'>'}
        </span>
      </div>
    </React.Fragment>
  );
}

NavigationArrows.propTypes = {
  slideToPrevious: PropTypes.func,
  slideToNext: PropTypes.func
};

export default NavigationArrows;
