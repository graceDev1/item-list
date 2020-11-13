const api_keys = new Map();
api_keys.set('123456', true)

function authorization(req,res,next){
    const apiKey = req.get('x-api-key')
    if(!apiKey) return res.status(401).json({msg:'no api key, page blocked'})
    next()
}

module.exports = authorization;