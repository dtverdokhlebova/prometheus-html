document.addEventListener('DOMContentLoaded', function () {
  uiRange()
  checkInputFill()
  header()
  benefits()
  infrastructure()
  gallery()
  goodsFilter()
})

function uiRange() {
  const uiRangeList = document.querySelectorAll('.ui-range')
  for (const item of uiRangeList) {
    const itemRange = item.querySelector('.ui-range__slider')
    const minInp = Number.parseInt(item.dataset.min, 10)
    const maxInp = Number.parseInt(item.dataset.max, 10)

    noUiSlider.create(itemRange, {
      start: [minInp, maxInp],
      connect: true,
      range: {
        min: minInp,
        max: maxInp
      }
    })
  }
}

function checkInputFill() {
  const uiInputs = document.querySelectorAll('.ui-input')
  if (uiInputs) {
    for (const element of uiInputs) {
      const input = element.querySelector('input')
      input.value !== '' ? input.classList.add('filled') : input.classList.remove('filled')
      input.addEventListener('input', function () {
        input.value !== '' ? input.classList.add('filled') : input.classList.remove('filled')
      })
    }
  }
}

function header() {
  const headerBlock = document.querySelector('.header')

  const burgerIcon = headerBlock.querySelector('.header__burger')
  burgerIcon.addEventListener('click', function () {
    headerBlock.classList.toggle('header--burger')
    document.documentElement.classList.toggle('no-scroll')
  })

  const shadow = headerBlock.querySelector('.header__shadow')
  shadow.addEventListener('click', function () {
    headerBlock.classList.remove('header--burger')
    document.documentElement.classList.remove('no-scroll')
  })

  for (const link of headerBlock.querySelectorAll('a')) {
    link.addEventListener('click', function () {
      headerBlock.classList.remove('header--burger')
      document.documentElement.classList.remove('no-scroll')
    })
  }
}

function benefits() {
  const benefitsBlock = document.querySelector('.benefits')
  if (benefitsBlock) {
    if (window.innerWidth > 767) {
      window.addEventListener('load', function () {
        for (const text of document.querySelectorAll('.benefits__text-inner')) {
          const textWrapper = text.parentElement

          const textHeightBefore = text.offsetHeight
          textWrapper.classList.add('benefits__text--show')
          const textHeightAfter = text.offsetHeight
          textWrapper.classList.remove('benefits__text--show')

          text.style.height = `${textHeightBefore}px`

          if (textHeightBefore < textHeightAfter) {
            textWrapper.classList.add('benefits__text--more')

            textWrapper.addEventListener('mouseenter', function () {
              textWrapper.classList.add('benefits__text--show')
              textWrapper.classList.remove('benefits__text--more')
              text.style.height = `${textHeightAfter}px`
            })

            textWrapper.addEventListener('mouseleave', function () {
              textWrapper.classList.remove('benefits__text--show')
              textWrapper.classList.add('benefits__text--more')
              text.style.height = `${textHeightBefore}px`
            })
          }
        }
      })
    } else {
      for (const item of document.querySelectorAll('.benefits__item')) {
        item.querySelector('.benefits__name').addEventListener('click', function () {
          item.classList.toggle('benefits__item--open')
          $(item.querySelector('.benefits__text')).slideToggle()
        })
      }
    }
  }
}

function infrastructure() {
  if (document.querySelector('.infrastructure')) {
    const infrastructureSlider = new Swiper('.infrastructure__slider', {
      slidesPerView: 1,
      speed: 500,
      spaceBetween: 25,
      centeredSlides: false,
      slidesOffsetBefore: 0,
      autoHeight: true,
      navigation: {
        nextEl: '.infrastructure__ui-slider-nav .ui-slider-nav__btn--next',
        prevEl: '.infrastructure__ui-slider-nav .ui-slider-nav__btn--prev'
      },
      pagination: {
        el: '.infrastructure__ui-slider-pagination',
        type: 'bullets'
      },
      breakpoints: {
        767: {
          slidesPerView: 'auto'
        },
        1259: {
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 50,
          slidesOffsetBefore: -250
        }
      }
    })
    window.addEventListener('load', function () {
      if (this.window.innerWidth < 767) infrastructureSlider.update()
    })
  }
}

function gallery() {
  if (document.querySelector('.gallery')) {
    const gallerySlider = new Swiper('.gallery__slider', {
      slidesPerView: 1,
      speed: 500,
      spaceBetween: 25,
      navigation: {
        nextEl: '.gallery__ui-slider-nav .ui-slider-nav__btn--next',
        prevEl: '.gallery__ui-slider-nav .ui-slider-nav__btn--prev'
      },
      pagination: {
        el: '.gallery__pagination',
        type: 'fraction',
        formatFractionCurrent(number) {
          return number < 10 ? `0${number}` : number
        },
        formatFractionTotal(number) {
          return number < 10 ? `0${number}` : number
        }
      },
      effect: 'creative',
      creativeEffect: {
        prev: {
          translate: ['-20%', 0, -1]
        },
        next: {
          translate: ['100%', 0, 0]
        }
      }
    })
  }
}

function getPopup(popup, source) {
  const popupSource = source || popup.data('src')
  Fancybox.show(
    [{
      src: popupSource,
      preload: false
    }],
    {
      mainClass: 'popup',
      parentEl: document.querySelector('.wrapper'),
      showClass: 'fancybox-fadeIn',
      hideClass: 'fancybox-fadeOut',
      hideScrollbar: true,
      touch: false,
      autoFocus: true,
      trapFocus: true,
      dragToClose: false
    })
  Fancybox.defaults.ScrollLock = false
  return false
}

function goodsFilter() {
  $('.goods-filter__open').on('click', function () {
    $('html').addClass('ov-hidden')
    $('.goods-filter__wrapper').fadeIn()
  })
  $('.js-goods-filter-close').on('click', function () {
    $('html').removeClass('ov-hidden')
    $('.goods-filter__wrapper').fadeOut()
  })
}
