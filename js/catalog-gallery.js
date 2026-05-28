document.querySelectorAll('[data-catalog-gallery]').forEach((gallery) => {
  const slides = [...gallery.querySelectorAll('.catalog__slide')];
  const dots = [...gallery.querySelectorAll('.catalog__dot')];
  const prev = gallery.querySelector('.catalog__arrow--prev');
  const next = gallery.querySelector('.catalog__arrow--next');
  let index = 0;

  if (slides.length < 2) return;

  const setSlide = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
  };

  prev?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSlide(index - 1);
  });

  next?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSlide(index + 1);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      setSlide(i);
    });
  });

  let touchStartX = 0;
  gallery.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  gallery.addEventListener(
    'touchend',
    (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) < 40) return;
      setSlide(diff < 0 ? index + 1 : index - 1);
    },
    { passive: true }
  );
});
