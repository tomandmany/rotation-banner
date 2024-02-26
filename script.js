document.addEventListener('DOMContentLoaded', () => {
    // timerの"3"はUI上で変更可能にしたい
    const timer = 3 * 1000;
    let slides = document.querySelectorAll('.banner-slide');
    let indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;

    function updateSlidesAndIndicators() {
        slides.forEach((slide, index) => {
            // インジケーターの更新
            if (index === currentSlide) {
                indicators[index].classList.add('active');
            } else {
                indicators[index].classList.remove('active');
            }
        });
    }

    function moveSlide(newIndex) {
        // 中央から左
        slides[currentSlide].style.transform = 'translateX(-100%)';

        // 右から中央
        slides[newIndex].style.transform = 'translateX(0)';
        slides[newIndex].style.zIndex = '3';

        // 左から右
        let nextSlideIndex = (newIndex + 1) % slides.length;
        slides[nextSlideIndex].style.transform = 'translateX(100%)';
        slides[nextSlideIndex].style.zIndex = '2';

        // 左で待機中
        let prevSlideIndex = 0;
        if (currentSlide !== 0) {
            prevSlideIndex = (currentSlide - 1) % slides.length;
        } else {
            prevSlideIndex = slides.length - 1;
        }
        slides[prevSlideIndex].style.zIndex = '1';

        currentSlide = newIndex;
        updateSlidesAndIndicators();
    }

    // インジケーターのイベントリスナーを設定
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            moveSlide(index);
        });
    });

    setInterval(() => {
        moveSlide((currentSlide + 1) % slides.length);
    }, timer);

    updateSlidesAndIndicators();
});