import './style.scss';
import App from '../../../index';
import Ajax from '../../controllers/controller.ajax';
import Carousel from '../../controllers/controller.carousel';
import {
    toHTML
} from '../../../common/utils/utils';


class View {
    constructor() {


    }

    init() {
        const self = this;
        const data = new Ajax({
            url: App.controller.getDataURL() + 'wp/v2/clients',
            method: 'get',
            view: self
        });
    }

    setup(data) {
        this.el = `
            <section id="home">
            </section>
        `;

        this.el = toHTML(this.el);
        this.render(data, this.el);
    }

    render(data, el) {
        const main = App.body.querySelector('main');
        const carousel = new Carousel({
            moments: data[0].acf.moments,
            view: self,
            el: el
        });
        main.appendChild(el);
        carousel.init();

    }
}

export default new View();