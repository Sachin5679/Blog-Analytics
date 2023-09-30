const express = require('express');
const axios = require('axios');
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
        res.json(response.data)
    } catch(err) {
        res.status(500).json({error: "Error"});
    }
})

app.listen(port, () => console.log(`Listening on localhost:${port}`))