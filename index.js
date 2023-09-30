const express = require('express');
const axios = require('axios');
const _ = require('lodash');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/blog-stats', async(req, res) => {
    try{
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                'x-hasura-admin-secret': process.env.ADMIN_SECRET
            }
        });
        const blogs = response.data.blogs;
        const count = _.size(blogs);
        const longestTitle = _.maxBy(blogs, (blog) => blog.title.length);
        const privacyExists = _.filter(blogs, (blog) => blog.title && _.includes(blog.title.toLowerCase(), 'privacy'))
        const privacyCount = privacyExists.length;
        const uniqueTitles = _.uniqBy(blogs, 'title');
        res.json({
            count,
            longestTitle,
            privacyCount,
            uniqueTitles,
        })
        
    } catch(err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
})

app.listen(port, () => console.log(`Listening on localhost:${port}`))