const express = require('express');
const path = require('path');
const hbs = require('hbs');


const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');


const port = process.env.PORT || 3000






const app = express();


//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPaths = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebar engine and view location and register partials
app.set('view engine', 'hbs')
app.set('views', viewPaths)
hbs.registerPartials(partialsPath)




app.use(express.static(publicDirectoryPath))


app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather',
        des:"Use this site to get your weather.",
        name: 'Anas'
    })
})



app.get('/about',(req, res)=>{
    res.render('about',{
        title: "About Me",
        name: "Anas"

    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: "Help",
        des: "I will be very happy to help you..."

    })
})




app.get('/weather', (req,res)=>{
    if (!req.query.address){
        res.send({
            error:"you must provide some address."
        })
    }else{


        geocode(req.query.address,(error, {latitude, longitude, place}={})=>{
            if (error){
                res.send({error})
            }else{
                forecast(latitude,longitude,(error, data)=>{
                    if (error){
                        res.send({
                            error
                        })
                    }else{
                        res.send({
                            forecast:data,
                            place,
                            address:req.query.address

                        })
                    }
                })
            }
        })


    }

})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"Error",

        message:'Help article not found',
        name:'Anas'

    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:"Error",
        message:"Page not found",
        name:'Anas'
    })
})




app.listen(port, ()=>{
    console.log("Server is up on port " + port)
})





