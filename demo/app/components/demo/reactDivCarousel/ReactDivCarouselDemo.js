import React from 'react';
import ReactDivCarousel from '../../../../../src/components/reactDivCarousel/Carousel';

export default function ReactDivCarouselDemo() {

  const BREAK_POINT_SETTINGS = [
    {
      breakpoint: 0,
      nbrOfSlidesInView: 1,
      hideArrows: true,
      hideDots: true,
    },
    {
      breakpoint: 400,
      nbrOfSlidesInView: 2,
    },
    {
      breakpoint: 600,
      nbrOfSlidesInView: 3,
    },
    {
      breakpoint: 800,
      nbrOfSlidesInView: 4,
    },
  ];

  const images = [
    'http://cute-n-tiny.com/wp-content/uploads/2009/10/halloween-cat-costume8-400x400.jpg',
    'http://img2.timeinc.net/health/img/web/2013/03/slides/cat-allergies-400x400.jpg',
    'http://cute-n-tiny.com/wp-content/uploads/2009/10/halloween-cat-costume8-400x400.jpg',
    'https://i.pinimg.com/736x/8b/af/99/8baf99d3cfa3482b1f2af33392d2286d--silly-cats-cute-cats.jpg',
    'http://img2.timeinc.net/health/img/web/2013/03/slides/cat-allergies-400x400.jpg',
  ];

  return (
    <ReactDivCarousel
      lazyLoad={true}
      breakPointSettings={BREAK_POINT_SETTINGS}
    >
      {
        images.map((Item) => {
          return (
            <img src={Item} key={Item} width={200} />
          );
        })
      }
    </ReactDivCarousel>
  );
}
