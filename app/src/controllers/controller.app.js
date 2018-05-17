import App from '../../index';

class AppController {
    constructor(){
    }

    getDataURL(){
        return App.model.dataURL;
        
    }

}


export default new AppController();