const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.get('', (req,res)=>{
    res.render('index',{
        title: "Weather App",
        name: "Roi Reinshtein"
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: "About Me",
        name: "Roi Reinshtein"
    })
})
app.get('/help', (req,res)=>{
    res.render('help',{
        title: "Help",
        name: "Roi Reinshtein"
    })
})

app.use(express.static(path.join(__dirname,'../public')))
app.get('/Weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if (error){
            return res.send({error})
        }

        forecast(latitude,longitude, (error, forecastData)=>{
            if (error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    res.send({
        products: []
    })

})

app.get('/help/*', (req,res)=>{
    res.render('404_page',{
        title: '404',
        name: 'Roi Reinshtein',
        message: 'Help Article Not Found'
    })
})

app.get('*', (req,res)=>{
    res.render('404_page',{
        title: '404',
        name: 'Roi Reinshtein',
        message: 'Page Not Found'
    })
})
app.listen(3000,()=>{
    console.log('Server Started on Port 3000')
})