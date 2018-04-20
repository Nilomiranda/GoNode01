const express = require('express'); // fazendo a requisicao do express
const nunjucks = require('nunjucks'); // fazendo a requisicao do nunjucks
const path = require('path'); // fazendo a requisicao da bilbioteca path
const bodyParser = require('body-parser'); // fazendo a requisicao a bilbioteca body-parser
const moment = require('moment');

const app = express(); // criando nosso app com o expressjs

app.set('view engine', 'njk'); // configurando a template engine => nunjucks
app.set('views', path.join(__dirname, 'views')); // configurando o caminho das views da aplicacao

app.use(bodyParser.urlencoded({ extended: false }));

// configuracao do nunjucks
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

// definindo a rota principal
app.get('/', (req, res) => {
  res.render('main');
});


app.get('/major', (req, res) => {
  const { name, age } = req.query;
  if (name === undefined || age === undefined) {
    res.redirect('/');
  } else {
    res.render('major', { name, age });
  }
});

app.get('/minor', (req, res) => {
  const { name, age } = req.query;
  if (name === undefined || age === undefined) {
    res.redirect('/');
  } else {
    res.render('minor', { name, age });
  }
});


// rota que checa a informacao enviada pelo usuario
app.post('/check', (req, res) => {
  const { name, bornDate } = req.body;
  const age = moment().diff(moment(bornDate, 'DD/MM/YYYY'), 'years');
  if (age > 18) {
    res.redirect(`/major?name=${name}&age=${age}`);
  } else {
    res.redirect(`/minor?name=${name}&age=${age}`);
  }
});

app.listen(3000);
