export const configuration = {
    credentials: (process.env.NODE_ENV == 'production' ? 'same-origin' : 'include'),
    headers: {
        'Accept': 'application/vnd.docker.distribution.manifest.v2+json'
    }
};