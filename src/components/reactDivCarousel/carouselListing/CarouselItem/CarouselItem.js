import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './CarouselItem.scss';

class CarouselItem extends PureComponent {
  constructor() {
    super();

    this.state = {
      mounted: false,
    };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    const { style, item, lazyLoad } = this.props;

    if (lazyLoad && !this.state.mounted) {
      return null;
    }

    return (
      <div
        className={styles.item}
        style={style}
      >
        {
          item
        }
      </div>
    );
  }
}

CarouselItem.propTypes = {
  style: PropTypes.object,
  item: PropTypes.object,
  lazyLoad: PropTypes.bool,
};

export default CarouselItem;
