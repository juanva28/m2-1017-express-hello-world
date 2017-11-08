const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout', __dirname + '/views/layout/main-layout');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

let a = (req,res,next) =>{
  console.log("EL MIDDLEWARE DE MARC");
  next();
}

app.use(a)

app.use(express.static('public'));



app.get('/',(req,res)=>{
  res.render('home');
});

const getImagenes = (personaje) => {
  let imagesBart = [
    "https://assets.fxnetworks.com/cms/prod/2016/12/simpsonsworld_social_og_bart_1200x1200.jpg",
    "http://www.nombresparaperros.club/imagenes/1/original/5661473458711-Bart-Simpson.jpg",
    "http://2.bp.blogspot.com/-XKkwwaNcQp0/UHlgkuq5E7I/AAAAAAAABTI/fAtYElMP9T8/s640/Panda+Tope.jpg"
  ];
  let imagesHomer = [
    "http://360es.com/es/wp-content/uploads/2015/01/Homer-Simpson-un-ejemplo-de-emprendedor.jpeg",
    "http://cdn.skim.gs/images/homer-simpson-doughnuts/what-homer-simpson-taught-us-about-doughnuts",
    "https://pbs.twimg.com/profile_images/818630169728454656/_F0UzZKc.jpg"
  ]

  return (personaje == 'Bart') ? imagesBart : imagesHomer;
}

app.get('/simpsons',(req,res)=>{
  console.log("la query es: ");
  console.log(req.query);
  res.render('simpsons', {
    title: "EL GET",
    images:getImagenes(req.query.personaje)
  });
});


app.post('/simpsons',(req,res) => {
  console.log("el body es: ");
  console.log(req.body);
  res.render('simpsons', {
    title: "EL POST",
    images:getImagenes(req.body.personaje)
  });
});

app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
