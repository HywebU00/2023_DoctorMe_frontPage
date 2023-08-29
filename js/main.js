// -----------------------------------------------------------------------
// -----  置頂go to top   -------------------------------------------------
// -----------------------------------------------------------------------

function scrollToTop(obj) {
  const el = obj.name || null; // --- 控制的對象

  function scrollTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  if (el !== null) {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      scrollTop();
    });

    // --- 鍵盤點擊置頂按鈕
    el.addEventListener('keydown', (e) => {
      e.preventDefault();
      scrollTop();
      // --- window.scrollY 等於零的時候 執行 focus
      window.addEventListener('scroll', focusTopBtn);

      function focusTopBtn() {
        if (window.scrollY === 0) {
          setTimeout(() => {
            document.querySelector('a.goCenter').focus();
            window.removeEventListener('scroll', focusTopBtn);
          }, 500);
        }
      }
    });

    // --- 按鈕出現的函式
    window.addEventListener('scroll', () => {
      const top = window.scrollY;
      if (top > 200) {
        el.style.display = 'block';
        el.style['opacity'] = '1';
        el.style['transform'] = 'scale(1)';
        el.style['transition'] = 'all 0.5s';
      } else {
        el.style['opacity'] = '0';
        el.style['transform'] = 'scale(0)';
        el.style['transition'] = 'all 0.5s';
        BtnStyleNone();
      }
      // --- 如果 opacity為 0 則 display none
      function BtnStyleNone() {
        setTimeout(() => {
          const btn = document.querySelector('.scrollToTop');
          const btnOpacity = parseInt(btn.style.opacity);
          if (btnOpacity === 0) {
            btn.style.display = 'none';
          }
        }, 200);
      }
    });
  }
}

scrollToTop({
  name: document.querySelector('.scrollToTop'), // --- 監聽的對象
});
const mobileBtn = document.querySelector('.mobileBtn');
const mobileContenet = document.querySelector('.mobileContenet');
let active;
mobileBtn.addEventListener('click', function () {
  active = mobileContenet.classList.contains('active');
  active ? mobileContenet.classList.remove('active') : mobileContenet.classList.add('active');
});
const resizeObserver = new ResizeObserver((e) => {
  let width = e[0].contentRect.width;
  active = mobileContenet.classList.contains('active');
  if (width > 786 && active) {
    mobileContenet.classList.remove('active');
  }
});
resizeObserver.observe(mobileContenet);
