export default function(service) {
    return function(req, res, next) {
        let data = {}
        for(let name in service){
            data[name] = Object.keys(service[name])
        }
        res.json(data);
    };
}