import './app.scss';
import {
    toHTML
} from '../../common/utils/utils';
import App from '../../index';

class AppView {
    constructor() {}

    init() {
        console.log('initApp');
        this.setup();
    }

    setup() {
        const header = this.setHeader();
        const sidebar = this.setSidebar();
        const footer = this.setFooter();
        const main = this.setMain();

        this.render(header, sidebar, footer, main);
    }

    setHeader() {
        let markup = `
            <header>
                <a class="header-logo" id="logo">milladelpino</a>
                <div class="intro">
                    <p>Medlab is an educational app for the Museum of Science and Industry in Chicago. It lets students play the part of a medical professional, diagnosing diseases, prescribing treatment, and monitoring results. </p>
                </div>
            </header>
        `;

        return toHTML(markup);

    }
    setContact() {
        let markup = `
        <div class="contact info active">
    
            <div class="contact-content info-content">
                <h2>Contact</h2>
                <div class="contact-context_area">
                    <p>Each marriage, photo session or portrait is different for us, we are interested in knowing you and projecting maximum dedication in each of the photos we take for you.</p>
                </div>
            </div>
            <div class="contact-bg"></div>

        </div>
        `;

        return toHTML(markup);

    }

    setAbout() {
        let markup = `
        <div class="about info">
            <div class="about-content info-content">
                <h2>About</h2>
                <div class="about-context_area">
                    <p>Our work is documentary, we capture moments in their natural state, we believe that emotion can not be feigned and that it is a privilege to be able to put together a visual story of the people who trust us to record the most important events of their lives.</p>
                    <p>Each marriage, photo session or portrait is different for us, we are interested in knowing you and projecting maximum dedication in each of the photos we take for you.</p>
                </div>
            </div>

            <div class="about-bg"></div>
        </div>
        `;

        return toHTML(markup);

    }

    setCTAs() {
        let markup = `
        <div class="sidebar-cta">
            <a href="#/gallery" class="gallery-cta">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="23px" height="22px" viewBox="0 0 23 22">
                        <path fill="#ffffff" stroke="none" d="
                        M 13.5 9.55
                        L 9.8 9.55 9.8 13.25 13.5 13.25 13.5 9.55
                        M 3.7 22.85
                        L 3.7 19.15 0 19.15 0 22.85 3.7 22.85
                        M 9.8 19.15
                        L 9.8 22.85 13.5 22.85 13.5 19.15 9.8 19.15
                        M 3.7 0
                        L 0 0 0 3.7 3.7 3.7 3.7 0
                        M 3.7 9.55
                        L 0 9.55 0 13.25 3.7 13.25 3.7 9.55
                        M 13.5 3.7
                        L 13.5 0 9.8 0 9.8 3.7 13.5 3.7
                        M 23.35 13.25
                        L 23.35 9.55 19.65 9.55 19.65 13.25 23.35 13.25
                        M 23.35 22.85
                        L 23.35 19.15 19.65 19.15 19.65 22.85 23.35 22.85
                        M 23.35 3.7
                        L 23.35 0 19.65 0 19.65 3.7 23.35 3.7 Z"></path>
                </svg>
        
            </a>
            <a href="#/contact" class="contact-cta">
                <h3>Contact</h3>
            </a>
            <a href="#/about" class="about-cta">
                <h3>About</h3>
            </a>
        </div>
        `;

        return toHTML(markup);

    }
    setSidebar() {
        const self = this;
        let markup = `
        <aside class="sidebar">
            <div class="sidebar-content">
            </div>
        </aside>
        `;

        markup = toHTML(markup);

        markup.querySelector('.sidebar-content').appendChild(self.setContact());
        markup.querySelector('.sidebar-content').appendChild(self.setAbout());
        markup.appendChild(self.setCTAs());


        return markup;


    }

    setMomentsNav() {
        let markup = `
        <nav class="moments-nav">
            <ul>
                <li><a href="#">Reception</a></li>
                <li><a href="#">Preparation</a></li>
                <li><a href="#">Ceremony</a></li>
                <li><a href="#">Party</a></li>
            </ul>
        </nav>
        `;

        return toHTML(markup);

    }

    setMomentsShare() {
        let markup = `         
        <div class="moments-share">
            <h5>share this moment</h5>
            <div class="moments-share_links">
                <div> 
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="250px" height="226px" viewBox="0 0 250 226">
                        <g transform="matrix( 0.8719940185546875, 0, 0, 0.8719940185546875, -114.7,-61.1) ">
                            <path fill="#000000" stroke="none" d="
    M 333.85 124.35
    L 333.85 88.35
    Q 330.05 87.85 322.45 87.35 312.55 86.75 302.8 86.75 279.2 86.75 265.35 100.45 251 114.65 251 140
    L 251 169.7 216.2 169.7 216.2 209.95 251 209.95 251 313.3 292.6 313.3 292.6 209.95 327.25 209.95 332.45 169.7 292.6 169.7 292.6 143.95
    Q 292.6 134.2 296.3 129.8 300.85 124.35 312.55 124.35
    L 333.85 124.35 Z"></path>
                        </g>
                    </svg>
                </div>
                <div> 
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="250px" height="226px" viewBox="0 0 250 226">
                        <g transform="matrix( 0.8719940185546875, 0, 0, 0.8719940185546875, -437.35,-50.9) ">
                            <path fill="#000000" stroke="none" d="
    M 713.8 91.1
    Q 703.95 86.75 693.05 86.75 671.8 86.75 656.8 101.75 641.75 116.8 641.75 138 641.75 144.1 643.1 149.7 611.65 148.15 583.75 133.75 556.65 119.8 537.4 96.15 530.45 107.95 530.45 121.9 530.45 135.05 536.7 146.5 542.75 157.55 553.25 164.6 540.9 164.25 530 158.2
    L 530 158.85
    Q 530 177.35 541.8 191.55 553.4 205.55 571.15 209.15 564.4 210.95 557.65 210.95 552.9 210.95 548 210 552.95 225.45 566 235.3 579.25 245.3 595.9 245.65 582.5 256.15 566.5 261.8 549.95 267.6 532.2 267.6 526.2 267.6 520 266.9 537.35 278 556.95 283.85 577.25 289.9 598.6 289.9 632.55 289.9 661.2 276.65 687.45 264.5 706.95 242.35 725.15 221.75 735 195.4 744.55 169.9 744.55 144 744.55 140.65 744.4 137.35 759.5 126.4 770 110.8 755.95 117 740.5 118.85 748.5 114.05 754.35 106.8 760.2 99.4 763.05 90.5 747.7 99.55 730.5 102.95 723.35 95.3 713.8 91.1 Z"></path>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
        `;

        return toHTML(markup);

    }

    setFooter() {
        const self = this;
        let markup = `
        <footer class="footer">
        </footer>
        `;

        markup = toHTML(markup);
        markup.appendChild(self.setMomentsNav());
        markup.appendChild(self.setMomentsShare());

        return markup;

    }

    setMain() {
        let markup = `
        <main>
        </main>
        `;

        return toHTML(markup);

    }

    render(header, sidebar, footer, main) {
        App.body.appendChild(header);
        App.body.appendChild(sidebar);
        App.body.appendChild(footer);
        App.body.appendChild(main);
    }
}


export default new AppView();