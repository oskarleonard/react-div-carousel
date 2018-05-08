
export function disableScroll() {
  document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
}

export function enableScroll() {
  document.removeEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
}

// MOVING_SLIDES Start

function _getSlidesMoved(amountMoved, elementWidth) {
  const slidesMoved = Math.abs(amountMoved / elementWidth);
  const wholeSlidesMoved = Math.floor(slidesMoved);

  if (slidesMoved % 1 > 0.3) {
    return wholeSlidesMoved + 1;
  }

  return wholeSlidesMoved;
}

function _snapTo(amountMoved, elementWidth) {
  const slidesMoved = _getSlidesMoved(amountMoved, elementWidth);

  if ( amountMoved > 0) {
    return slidesMoved;
  } else {
    return -slidesMoved;
  }
}

export function slidesMoved(newXPos, elementWidth, index) {
  const amountMoved = newXPos - elementWidth * index;

  return _snapTo(amountMoved, elementWidth);
}

// MOVING_SLIDES END

export function getMaxNbrOfItemsInView(breakPointSettings) {
  return breakPointSettings.reduce((max, currentSetting) => {
    const nrOfSlides = currentSetting.nbrOfSlidesInView;

    return (nrOfSlides > max) ? nrOfSlides : max;
  }, 1);
}

// Prevents index from being negative or too big
export function getIndexInBound(index, nbrOfSlidesInView, childrenLength) {
  if (index < 0) {
    return 0;
  } else if (index + nbrOfSlidesInView > childrenLength - 1) {
    return childrenLength - nbrOfSlidesInView;
  } else {
    return index;
  }
}

export function getImageFlexBase(nbrOfSlidesInView) {
  if (nbrOfSlidesInView) {
    const flexBasis = 100 / nbrOfSlidesInView;

    return `0 0 ${flexBasis}%`;
  }
}

export function getCurrentBreakPointIndex(breakPointSettings) {
  let newBreakpointIndex = 0;
  for (let i = 0; i < breakPointSettings.length; i++) {
    if (breakPointSettings[i].breakpoint > window.innerWidth) {
      break;
    }
    newBreakpointIndex = i;
  }

  return newBreakpointIndex;
}
