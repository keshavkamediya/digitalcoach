const { Router } = require('express')
const router = Router();
require('dotenv').config();

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.News_Api_key);


router.get('/', (req, res) => {
    newsapi.v2.everything({
        q: 'trading',
        // sources: 'bbc-news,the-verge',
        // domains: 'bbc.co.uk, techcrunch.com',
        // from: '2023-12-16',
        // to: '2023-12-16',
        language: 'en',
        // sortBy: 'relevancy',
        // page: 2
    }).then(response => {
        res.send(response)
    });

})

module.exports = router