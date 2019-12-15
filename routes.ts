import http from 'http';
import url from 'url';
import ShipmentUpdate from "./controller";

const routesModule = http.createServer((req, res) => {
    const shipemntObject = new ShipmentUpdate();
    if (req && req.url) {
        const reqUrl = url.parse(req.url, true);
        // POST Endpoint
        if (reqUrl.pathname == '/multiple' && req.method === 'POST') {
            shipemntObject.multipleRequestApi(req, res);
        } else {
            shipemntObject.invalidUrl(req, res);
        }
    }
});

export default routesModule;