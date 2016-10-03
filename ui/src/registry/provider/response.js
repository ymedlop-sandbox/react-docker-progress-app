
export function prepare(res) {
    return new Promise((resolve, reject) => {
        const response = {
            body: null,
            status: res.status,
            headers: res.headers
        };

        res.json().then(json => {
            response.body = json;
            resolve(response);
        }).catch(error => {
            response.body = 'Non-json response';
            resolve(response);
        });
    });
}

export function execute(response, dispatch, method, success, error) {
    
    if(response.status < 200 || response.status > 299) {
        // TODO: Error system
        //return dispatch(error(method, response));
    }
    
    return dispatch(success(response.body, response.headers));
}

export default {
    prepare,
    execute
};
