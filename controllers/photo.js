const fetch = require('node-fetch');
const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';

const handlePhoto = () => (req, res) => {
    const { sol, camera } = req.body;
    let url = new URL('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos');
    let params = { api_key: apiKey, sol: sol, camera: camera };
    Object.keys(params).forEach(key => { if (null !== params[key]) { url.searchParams.append(key, params[key]) } })
    fetch(url)
    .then(data => data.json())
    .then(data => {
        photos = data.photos.map(photo => {
            return photo['img_src'].replace(/^http:\/\//i, 'https://');
        });
        res.json(photos);
    })
    .catch(err => res.status(400).json('api call failed'));
}

module.exports = { handlePhoto };
