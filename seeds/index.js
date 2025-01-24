
const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6759d33ecc1eeae653ea6982',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: '   Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere ducimus deserunt nisi dolor illum ullam quas in placeat. Asperiores, ad accusantium ipsam voluptas officia perspiciatis voluptatum id omnis reprehenderit voluptate.',
            price,
            geometry: { 
                type: 'Point',
                coordinates: [ cities[random1000].longitude, 
                cities[random1000].latitude
             ]
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/dc9awzjgo/image/upload/v1734801185/YelpCamp/y3i1tto1hv2tj1mkrdbr.jpg',
                  filename: 'YelpCamp/y3i1tto1hv2tj1mkrdbr',

                },
                {
                  url: 'https://res.cloudinary.com/dc9awzjgo/image/upload/v1734801185/YelpCamp/w66xk1xfdkmgqutnicic.jpg',
                  filename: 'YelpCamp/w66xk1xfdkmgqutnicic',

                }
              ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})