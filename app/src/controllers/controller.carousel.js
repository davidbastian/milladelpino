import {
    toHTML,
    getRandomArbitrary,
    constrain
} from '../../common/utils/utils';
import {
    TweenMax
} from 'gsap';
import VirtualScroll from 'virtual-scroll';

class Carousel {
    constructor(opt) {
        this.moments = opt.moments;
        this.view = opt.view;
        this.el = opt.el;
    }

    init() {
        console.log('start carousel', this.moments);
        this.setup();
    }

    setup() {
        var images = [];
        this.carousel = `
        <div class="carousel_wrap">
            <div class="carousel-line_wrap">
                    <div class="carousel-line">
                    </div>
            </div>
            <div class="carousel">
                <div class="carousel-dots_wrap">
                    <div class="carousel-dots"></div>
                </div>  
                <div class="carousel-images">
                </div>
            </div>
        </div>
        `;

        this.carousel = toHTML(this.carousel);

        for (let i = 0; i < this.moments.length; i++) {
            const moment = this.moments[i];
            for (let j = 0; j < moment.gallery.length; j++) {
                const image = moment.gallery[j];
                const obj = {
                    url: image.url,
                    moment: moment.title
                };

                images.push(obj);
            }
        }

        this.render(images);
    }

    render(images) {
        const self = this;
        for (let i = 0; i < images.length; i++) {
            const item = images[i];
            let dot = `
                <div class="carousel-dot" style="top:${getRandomArbitrary(0,90)}%">
                    <div class="carousel-dot_wrap">
                        <div class="carousel-dot_inner">
                        </div>
                    </div>
                </div>
            `;
            dot = toHTML(dot);
            self.carousel.querySelector('.carousel-dots').appendChild(dot);

            let image = `
                <div class="carousel-image">
                    <div class="carousel-image_wrap">
                        <div class="carousel-image_inner" style="background-image:url(${item.url})">
                        </div>
                    </div>
                </div>
            `;
            image = toHTML(image);
            self.carousel.querySelector('.carousel-images').appendChild(image);
        }

        this.el.appendChild(self.carousel);

        this.setInteraction();

    }

    setInteraction() {
        const self = this;
        TweenMax.ticker.addEventListener("tick", myFunction);
        let carouselDots = this.carousel.querySelector('.carousel-dots');
        let carouselLine = this.carousel.querySelector('.carousel-line');
        let instance = new VirtualScroll({
            touchMultiplier: 6
        });
        var scrollReady = false;
        var autoScroll = true;
        var area = (carouselDots.offsetWidth - window.innerWidth) * 100 / carouselDots.offsetWidth;
        var direction = -1;
        var x = 0;
        var vx = 0;
        var ax = 0;

        var ease = 0.06;
        var target = 0;


        instance.on(function (e) {
            if (e.deltaY < 0) {
                target * -1;
            } else {
                target * 1;
            }
            target += e.deltaY * 0.005;
            area = (carouselDots.offsetWidth - window.innerWidth) * 100 / carouselDots.offsetWidth;
            target = constrain(target, -area, 0);
        });

        function myFunction(event) {
            let edgeRight = carouselDots.getBoundingClientRect().right - window.innerWidth;
            if (edgeRight > 0) {
                target = target - 0.01;
            }
            x += (target - x) * ease;
            TweenMax.set(carouselDots, {
                force3D: true,
                xPercent: x
            });

            let linePos = (x * -(window.innerWidth - carouselLine.getBoundingClientRect().width)) / -area;
            TweenMax.set(carouselLine, {
                force3D: true,
                x: -linePos
            });
        }


    }

}

export default Carousel;