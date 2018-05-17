class Ajax {

    constructor(opt) {
        this.url = opt.url;
        this.method = opt.method;
        this.view = opt.view;
        this.init(opt.method, opt.url, opt.view);
    }

    init(method, url, view) {
        const self = this;
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                 //   console.log("xhr done successfully");
                    let resp = JSON.parse(xhr.responseText);
                    view.setup(resp);
                } else {
                    // console.log("xhr failed");
                }
            } else {
                // console.log("xhr processing going on");
            }
        }
        //  console.log("request sent succesfully");
    }

}

export default Ajax;