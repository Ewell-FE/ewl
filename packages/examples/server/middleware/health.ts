let health = true;

export function fetchError() {
    health = false;
}

export default function(url) {
    return function(req, res, next) {
        if (req.url === url) {
            if (health) {
                res.status(200).end('success');
            } else {
                res.status(500).end('error');
            }
        } else {
            next();
        }
    };
}
