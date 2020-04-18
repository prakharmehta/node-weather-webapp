const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//port provided by heroku---->process.env.PORT
const port = process.env.PORT || 3000   

//Define paths fo express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and vies location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Prakhar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Prakhar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help me',
        name: 'Prakhar'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            err: 'You must provide an address'
        })
    }

    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
        if(err){
            return res.send({err});
        }
        forecast(latitude, longitude, (err, forecastData) => {
            if(err){
                return res.send({err});
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })  
            
        }) 
    })

    // res.send({
    //     forecast: 'Rainy',
    //     location: 'Jaipur', 
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: 'Help article not found!',
        name: 'Prakhar',
        title: 'Help me',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: 'Page not found',
        name: 'Prakhar',
        title: '404',
    })
})

app.listen(port, () => console.log(`Server is up on port ${port}`)
 );