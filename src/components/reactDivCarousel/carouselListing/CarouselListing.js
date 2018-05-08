import React from 'react';
import PropTypes from 'prop-types';
import CarouselItem from './CarouselItem/CarouselItem';
import styles from './CarouselListing.scss';

function CarouselListing ({ items, itemStyle, lazyLoad, maxNbrOfItemsInView, inputRef, listStyle }) {
  return (
    <div
      ref={inputRef}
      style={listStyle}
      className={items.size < maxNbrOfItemsInView ? styles.listTooFew : styles.list}
    >
      {
        items.map( (item, index) => {
          let shouldLazyLoad = false;
          if (lazyLoad) {
            shouldLazyLoad = maxNbrOfItemsInView <= index;
          }

          return (
            <CarouselItem
              key={index}
              style={itemStyle}
              lazyLoad={shouldLazyLoad}
              item={item}
            />
          );
        })
      }
    </div>
  );
}

CarouselListing.propTypes = {
  inputRef: PropTypes.func,
  items: PropTypes.array.isRequired,
  lazyLoad: PropTypes.bool,
  listStyle: PropTypes.object,
  maxNbrOfItemsInView: PropTypes.number.isRequired,
  itemStyle: PropTypes.object.isRequired,
};

export default CarouselListing;
