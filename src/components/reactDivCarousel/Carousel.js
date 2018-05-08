import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ResizeHelper from './resizeHelper/ResizeHelper';
import CarouselListing from './carouselListing/CarouselListing';
import styles from './Carousel.scss';
import {
  disableScroll,
  enableScroll,
  getCurrentBreakPointIndex,
  getImageFlexBase,
  getIndexInBound,
  getMaxNbrOfItemsInView,
  slidesMoved,
} from './_shared/carouselUtils/carouselUtils';
import IndexIndicator from './indexIndicator/IndexIndicator';
import NavigationArrows from './navigationArrows/NavigationArrows';

class Carousel extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      breakpointIndex: 0,
      clickDownXPos: 0,
      clickDownYPos: 0,
      dragging: false,
      elementWidth: 0,
      index: 0,
      isScrolling: false,
      xPos: 0,
    };

    this.setListRef = (element) => { this.listRef = element; };
    this.handleDotClick = this.handleDotClick.bind(this);

    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);

    this.slideToNext = this.slideToNext.bind(this);
    this.slideToPrevious = this.slideToPrevious.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    this.updateCarousel();
  }

  componentDidUpdate(prevProps, prevState) {
    /* Since the size is calculated before the component is rendered we need to make an extra check
        if the breakpoint index have just changed, since this results in a major size difference.
        To test, toggle mobile then desktop, then use index indicator to move between slides */
    if (prevState.breakpointIndex !== this.state.breakpointIndex) {
      this.updateCarousel();
    }
  }

  updateCarousel() {
    if (!this.listRef) {
      return;
    }

    const element = this.listRef.children[0];

    this.setState({
      breakpointIndex: getCurrentBreakPointIndex(this.props.breakPointSettings),
      elementWidth: (element ? element.offsetWidth : 0),
      index: getIndexInBound(this.state.index, this.getProp('nbrOfSlidesInView'), this.props.children.length),
    });
  }

  slideToNext() {
    // Get next index
    const lastDotIndex = this.state.index + this.getProp('nbrOfSlidesInView') - 1;
    const nextIndex = (lastDotIndex >= this.props.children.length - 1) ? 0 : (this.state.index + 1);

    this.setState({
      index: nextIndex,
    });
  }

  slideToPrevious() {
    // Get previous index
    const previousIndex = (this.state.index <= 0)
      ? this.props.children.length - this.getProp('nbrOfSlidesInView')
      : this.state.index - 1;

    this.setState({
      index: previousIndex,
    });
  }

  // Returns correct prop according to screen size
  getProp(prop) {
    const breakpointIndex = this.state.breakpointIndex;

    return this.props.breakPointSettings[breakpointIndex][prop];
  }

  showArrows() {
    return !this.getProp('hideArrows') && (this.props.children.length > this.getProp('nbrOfSlidesInView'));
  }

  handleDotClick(index) {
    this.setState({
      index: getIndexInBound(index, this.getProp('nbrOfSlidesInView'), this.props.children.length),
    });
  }

  onTouchStart(e) {
    const xPos = e.changedTouches[0].pageX;
    const yPos = e.changedTouches[0].pageY;
    if (this.listRef.contains(e.target)) {
      this.setState({
        clickDownXPos: xPos,
        clickDownYPos: yPos,
        dragging: true,
      });
    }
  }

  onTouchMove(e) {
    if (!this.state.isScrolling) {
      const xPos = e.changedTouches[0].pageX;
      const yPos = e.changedTouches[0].pageY;
      const amountMoved = this.state.clickDownXPos - xPos;
      const amountScrolled = this.state.clickDownYPos - yPos;

      if (this.state.xPos === 0 &&
                Math.abs(amountMoved) < 5 &&
                Math.abs(amountMoved) < Math.abs(amountScrolled)) {
        this.setState({
          isScrolling: true,
        });
        enableScroll();
      }
      else {
        if (this.state.xPos === 0) {
          disableScroll();
        }
        this.setState({
          xPos: amountMoved,
        });
      }
    }

  }

  onTouchEnd(e) {
    if (this.state.isScrolling) {
      this.setState({
        isScrolling: false,
        dragging: false,
      });
    }
    else if (this.listRef.contains(e.target)) {
      const xPos = e.changedTouches[0].pageX;
      const newXPos = this.state.index * this.state.elementWidth + this.state.clickDownXPos - xPos;

      const newIndex = this.state.index + slidesMoved(newXPos, this.state.elementWidth, this.state.index);

      this.setState({
        dragging: false,
        index: getIndexInBound(newIndex, this.getProp('nbrOfSlidesInView'), this.props.children.length),
        xPos: 0,
      });
      enableScroll();
    }
  }

  onResize() {
    this.updateCarousel();
  }

  getListStyle() {
    const elementWidth = this.state.elementWidth;
    const xScroll = elementWidth * this.state.index;

    return {
      transform: `translate3d(${-xScroll - this.state.xPos}px, 0, 0)`,
      transition: this.state.dragging ? '' : 'transform 200ms',
      minHeight: '100%',
    };
  }

  render() {
    const {
      className,
      children,
      lazyLoad,
      breakPointSettings,
    } = this.props;

    return (
      <div className={className} style={{ minHeight: '100%' }}>
        <ResizeHelper onResize={this.onResize} />
        <div
          className={styles.slider}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.state.dragging ? this.onTouchMove : null}
          onTouchEnd={this.onTouchEnd}
          onTouchCancel={this.state.dragging ? this.onTouchEnd : null}
        >
          <CarouselListing
            listStyle={this.getListStyle()}
            maxNbrOfItemsInView={getMaxNbrOfItemsInView(breakPointSettings)}
            itemStyle={{ flex: getImageFlexBase(this.getProp('nbrOfSlidesInView')) }}
            inputRef={this.setListRef}
            items={children}
            lazyLoad={lazyLoad}
          />
          {
            this.showArrows() &&
              <NavigationArrows
                slideToNext={this.slideToNext}
                slideToPrevious={this.slideToPrevious}
              />
          }
          {
            !this.getProp('hideDots') &&
              <IndexIndicator
                items={children}
                nbrOfSlidesInView={this.getProp('nbrOfSlidesInView')}
                currentIndex={this.state.index}
                indexClick={this.handleDotClick}
              />
          }
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  className: PropTypes.string,
  lazyLoad: PropTypes.bool,
  breakPointSettings: PropTypes.array,
};

export default Carousel;
