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
            <div class="carousel-front">
            </div>
            <div class="carousel-images_wrap">
            </div>
            <div class="carousel">
                <div class="carousel-dots_wrap">
                    <div class="carousel-dots"></div>
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
        let isActive;
        let amount = 360 / images.length;
        for (let i = 0; i < images.length; i++) {
            const item = images[i];


            if (i === 0) {
                isActive = 'active';
            } else {
                isActive = '';
            }
            let dot = `
                <div class="carousel-dot" style="top:${getRandomArbitrary(0,90)}%; width:${amount}vw">
                    <div class="carousel-dot_wrap">
                        <div class="carousel-dot_inner">
                        </div>
                    </div>
                </div>
            `;
            dot = toHTML(dot);
            self.carousel.querySelector('.carousel-dots').appendChild(dot);

            let image = `
                <div class="carousel-image ${isActive}" style="background-image:url(${item.url})"></div>
            `;

            let imageOLD = `
                <div class="carousel-image">
                    <div class="carousel-image_wrap">
                        <div class="carousel-image_inner" style="background-image:url(${item.url})">
                        </div>
                    </div>
                </div>
            `;

            image = toHTML(image);

            self.carousel.querySelector('.carousel-images_wrap').appendChild(image);

        }

        // self.carousel.querySelector('.carousel-images_wrap').style.backgroundImage = "url(" + images[0].url + ")";

        this.el.appendChild(self.carousel);

        this.setInteraction(images);

    }

    setInteraction(images) {
        const self = this;

        let carouselDots = this.carousel.querySelector('.carousel-dots');
        let carouselLine = this.carousel.querySelector('.carousel-line');
        let carouselImages = this.carousel.querySelectorAll('.carousel-image');


        let instance = new VirtualScroll({
            touchMultiplier: 6
        });
        let scrollReady = false;
        let autoScroll = true;
        let area = (carouselDots.offsetWidth - window.innerWidth) * 100 / carouselDots.offsetWidth;
        let x = 0;
        let ease = 0.06;
        let target = 0;

        instance.on(function (e) {
            if (e.deltaY < 0) {
                target * -1;
            } else {
                target * 1;
            }
            target += e.deltaY * 0.005;
            area = (carouselDots.offsetWidth - window.innerWidth) * 100 / carouselDots.offsetWidth;
            target = constrain(target, -area, 0);

            /*clearTimeout(hola);
            TweenMax.set(self.carousel.querySelector('.carousel-images_wrap'),{

                opacity:0.1

            });
            var hola = setTimeout(function() {
                TweenMax.to(self.carousel.querySelector('.carousel-images_wrap'),1,{
                        opacity:0.8,
                        ease:'Expo.easeInOut'
                });

            }, 1200);*/


        });

        TweenMax.ticker.addEventListener("tick", myFunction);

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

            self.checkCollision(carouselDots.querySelectorAll('.carousel-dot'), carouselLine, images, carouselImages);
        }
    }

    checkCollision(dots, line, images, carouselImages) {
        const self = this;
        const linePos = line.getBoundingClientRect().right - 5;

        //  console.log(dots.length);

        for (let i = 0; i < dots.length; i++) {
            const dot = dots[i];
            const dotPosLeft = dot.getBoundingClientRect().left;
            const dotPosRight = dot.getBoundingClientRect().right;
            const dotWidth = dot.getBoundingClientRect().width;
            const average = dotWidth - (dotWidth + (dotPosLeft - linePos));
            const percent = (average * 100) / dotWidth;
            let opacity = 0;
            let op;
            let scale = 1;
            let rotate = 0;

            if ((percent > 0) && (percent < 100)) {
              //  console.log(percent, i);
                scale = 1 + (percent * 0.0015);
                rotate = (percent * 0.005);
                carouselImages[i].style.transform = "scale(" + scale + ") rotate(" + rotate + "deg)";

                if (percent < 20) {
                    op = (percent * 100) / 20;
                } else if (percent >= 20 && percent < 75) {
                    op = 100;
                } else {
                    op = ((100 - percent) * 100) / 25;
                }

                if ((op >= 0) && (op < 100)) {
                    carouselImages[i].style.backgroundImage = "url(" + images[i].url + ")";
                    opacity = op * 0.01;
                }
                if (op < 0) {
                    opacity = 0;

                }
                if (op >= 100) {
                    opacity = 1;
                }


                carouselImages[i].style.opacity = opacity;


            }else {
                carouselImages[i].style.transform = "scale(" + 1+ ") rotate(" + 0 + "deg)";
                carouselImages[i].style.opacity = 0;

            }

            /* if (percent < 40) {
                op = (percent * 100) / 40;
            } else if (percent >= 40 && percent < 65) {
                op = 100;
            } else {
                op = ((100 - percent) * 100) / 35;
            }
    
            if ((op >= 0) && (op < 100)) {
                opacity = op * 0.01;
            }
            if (op < 0) {
                opacity = 0;
            }
            if (op >= 100) {
    
                opacity = 1;
            }

            console.log(opacity);
    
            self.carousel.querySelector('.carousel-images_wrap').style.opacity= opacity;*/
        }



    }

    playActive(i) {
        const self = this;
        let carouselFront = this.carousel.querySelector('.carousel-front');

        console.log(i);

        //if (!self.flash) {
        TweenMax.to(carouselFront, 0.5, {
            opacity: 1,
            ease: 'Power2.easeIn',
            onComplete: function () {

            }
        });

        TweenMax.to(carouselFront, 1, {
            opacity: 0,
            delay: 0.5,
            ease: 'Power2.easeOut',
            onComplete: function () {}
        });

        // }



    }
}

export default Carousel;