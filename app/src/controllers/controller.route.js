import AppView from '../views/view.app.js';
import HomeView from '../views/home/view.js';
import SingleView from '../views/single/view.js';


class RouteController {
    constructor() {
     
    }
    init(){
        this.addEvents();
    }

    addEvents() {
        window.addEventListener("load", this.setAppView.bind(this));
        window.addEventListener("hashchange", this.updateUrl.bind(this));
        window.addEventListener("load", this.updateUrl.bind(this));
       
    }
    setAppView(){
        AppView.init();
    }

    updateUrl(event) {
        this.url = location.hash.slice(1) || "/";
       // App.model.currentURL = this.url;
        this.checkParams(this.url);
      }


    checkParams(params) {
       console.log(params,'params');
        if (params === "/") {
          //  history.replaceState(undefined, undefined, "#");
            HomeView.init(params);
        } else {
          // SingleView.init(params);
        }
    }
}

const c = new RouteController();

export default c;