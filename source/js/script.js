'use strict'

// Mobile navigation menu
var mainNavToggle = document.querySelector('.page-header__menu-toggle');
var pageHeaderNavigation = document.querySelector('.page-header__navigation');

mainNavToggle.classList.add('page-header__menu-toggle--closed');
pageHeaderNavigation.classList.add('page-header__navigation--closed');

mainNavToggle.addEventListener('click', function(){
  if (mainNavToggle.classList.contains('page-header__menu-toggle--closed')) {
    mainNavToggle.classList.remove('page-header__menu-toggle--closed');
    mainNavToggle.classList.add('page-header__menu-toggle--opened');
    pageHeaderNavigation.classList.remove('page-header__navigation--closed');
  } else {
    mainNavToggle.classList.remove('page-header__menu-toggle--opened');
    mainNavToggle.classList.add('page-header__menu-toggle--closed');
    pageHeaderNavigation.classList.add('page-header__navigation--closed');
  }
});


// Modification data of product

var productsList = [
  {
    name: 'pink',
    color: '#FF7F96',
    photos: [
      'img/item-2-2-min.png',
      'img/item-2-1-min.png'
    ]
  },
  {
    name: 'violett',
    color: '#F7A9F8',
    photos: [
      'img/item-1-2-min.png',
      'img/item-1-1-min.png'
    ]
  },
  {
    name: 'green',
    color: '#3DFFBA',
    photos: [
      'img/item-1-2-min.png',
      'img/item-2-2-min.png'
    ]
  },
];


// Slider and change color

var mainSlider = document.querySelector('#main-slider');
var sliderList = mainSlider.querySelector('.slider__list');
var colorElements = document.querySelectorAll('.color-selector__item');
var sliderButtonPrev = mainSlider.querySelector('.slider__button--prev');
var sliderButtonNext = mainSlider.querySelector('.slider__button--next');
var slides = mainSlider.querySelectorAll('.slider__item');
var currentSlide = 0;



var showNextSlide = function() {
  slides[currentSlide].classList.remove('slider__item--show');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('slider__item--show');
};

var showPrevSlide = function() {
  slides[currentSlide].classList.remove('slider__item--show');
  if (currentSlide > 0) {
    currentSlide = (currentSlide - 1) % slides.length;
  } else {
    currentSlide = slides.length - 1;
  }

  slides[currentSlide].classList.add('slider__item--show');
};

// actions next slide and previous slide
sliderButtonNext.addEventListener('click', function() {
  showNextSlide();
});
sliderButtonPrev.addEventListener('click', function() {
  showPrevSlide();
});

// Delete default slides
var deleteSlidesImages = function() {
  while (sliderList.firstChild) {
    sliderList.firstChild.remove();
  }
};

// Create slides equal to the current color
var slidesElementCreate = function(product) {
  deleteSlidesImages();

  var slideElementTemplate = document.querySelector('#slider-item-template').content.querySelector('.slider__item');

  for (var i = 0; i < product.photos.length; i++) {
    var slideElement = slideElementTemplate.cloneNode(true);
    if (i == 0) {
      slideElement.classList.add('slider__item--show');
    }
    var sliderImage = slideElement.querySelector('.slider__image');
    sliderImage.src = product.photos[i];

    sliderList.appendChild(slideElement);
  }

  slides = mainSlider.querySelectorAll('.slider__item'); // обновляем объекты для кнопок слайдера
  currentSlide = 0;

};

// add colors
var changeColorElements = function(products) {
  for (var i = 0; i < colorElements.length; i++) {
    colorElements[i].className = 'color-selector__item';
    colorElements[i].classList.add('color-selector__item--' + products[i].name);
    colorElements[i].value = products[i].name;
  }
};

changeColorElements(productsList);

// action of color buttons
for (var i = 0; i < colorElements.length; i++) {
  colorElements[i].addEventListener('click', function(){
    var thisElementValue = this.querySelector('input');

    for (var j = 0; j < productsList.length; j++) {
      if (productsList[j].name === thisElementValue.value) {
        slidesElementCreate(productsList[j]);
      }
    }
  });
}


// Product content tabs

var productTabText = document.querySelector('.product-card__content-tab#description-text');
var moreTab = document.querySelector('.product-card__tabs-more');
var moreTabButton = moreTab.querySelector('span');

moreTabButton.addEventListener('click', function (){
  moreTab.setAttribute('style', 'height: 0');
  moreTab.setAttribute('style', 'display: none');
  productTabText.setAttribute('style', 'max-height: 420px');
});


// Subscribe

var subscribeForm = document.querySelector('form.subscribe__form');

subscribeForm.addEventListener('submit', function() {
  window.alert('Спасибо что подписались на нашу рассылку.');
});
