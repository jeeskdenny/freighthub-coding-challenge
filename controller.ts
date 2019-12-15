import { ShipmentSearchIndex, ShipmentUpdateListenerInterface } from './challenge';

class ShipmentUpdate implements ShipmentUpdateListenerInterface {

    obj: any;
    constructor() {
        this.obj = new ShipmentSearchIndex();
    }

    public invalidUrl = (req: any, res: any) => {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ status: false, data: {}, error: { message: "invalid url" } }));
    }

    /*
    * URL : http://localhost:3000/multiple
    * JSON INPUT FORMAT
    {
        "data" : [
            {
                "id": "a",
                "data": "1"
            },
            {
                "id": "b",
                "data": "2"
            },
            {
                "id": "a",
                "data": "3"
            },
            {
                "id": "c",
                "data": "4"
            }
        ]
    }

    */

    public multipleRequestApi = (req: any, res: any) => {
        let body = '';
        res.setHeader('Content-Type', 'application/json');
        req.on('data', (chunk: any) => {
            body += chunk;
        });

        req.on('end', async () => {
            try {
                if (body === "") {
                    throw "empty body";
                } else {
                    let postBody = JSON.parse(body);
                    if (postBody && postBody.data && postBody.data.length > 0) {
                        let updation = await this.updationOfSampleData(postBody.data);
                        Promise.all(updation).then(() => {
                            res.statusCode = 200;
                            res.end(JSON.stringify({ status: true, data: postBody, error: {} }));
                        });
                    } else {
                        throw "invalid data";
                    }
                }
            } catch (e) {
                res.statusCode = 400;
                res.end(JSON.stringify({ status: false, data: {}, error: e }));
            }
        });
    }

    receiveUpdate(id: string, shipmentData: any) {
        this.obj.updateShipment(id, shipmentData);
    }

    asyncFunction(element: any, cb: () => void) {
        setTimeout(() => {
            this.receiveUpdate(element.id, element.data);
            cb();
        }, 100);
    }

    updationOfSampleData(data: any[]) {
        let updates = data.map((element) => {
            return new Promise((resolve) => {
                this.asyncFunction(element, resolve);
            });
        });
        return updates;
    }

}

export default ShipmentUpdate;