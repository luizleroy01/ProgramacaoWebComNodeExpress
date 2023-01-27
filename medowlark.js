//Servidor e rotemento sem o uso do handlebars e view engine
/*const express = require('express')


const app = express()

//sobrepõe a porta 3000 defindo uma variável de ambiente
//Se não acessar a porta 3000 acessa a porta da variável
//PORT

const port = process.env.port || 3000

//incluindo duas novas rotas 
//As rotas para homepege e a página Sobre

app.get('/',(req,res)=>{
    res.type('text/plain')
    res.send('MedowLark Travel')
})

app.get('/About',(req,res)=>{
    res.type('text/plain')
    res.send('About MedowLark Travel')
})

//página 404 personalizada

app.use((req,res)=>{
    res.type('text/plain')
    res.status(404)
    res.send('404 not found')
})

//página 500 personaliozada

app.use((err,req,res,next)=>{
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Server Error')
})

app.listen(port,()=>console.log(
    'Express started on http://localhost:${port};'
    + 'pres Ctrl-C to terminate'
))

*/

//servidor e handlebars com o uso de view engines

const express = require('express')
const fortune = require('./lib/fortune.js')

const app = express()
const port = process.env.PORT || 3000

/*
array de frases que será substituído pelo modulo na pasta lib
const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
    ];
*/

//faz a requisição dos módulos dedicados ao handlebars e cria a página
// que servirá como layout padrão

var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });

var handler = require('./lib/handlers.js')

app.engine('handlebars', handlebars.engine);

//seta as views engine para renderizar as views do site

app.set('view engine','handlebars')

//conteúdo estático através de middleware
app.use(express.static(__dirname +'/public'))


//para renderizar a página principal
app. get('/',handler.home)

//para renderizar a página sobre
//app.get('/About',(req,res)=>res.render('about'))

//nova página about com frases escolhidas aleatoriamente do array fortunes
app.get('/about', function(req, res){
    /*
    utilizada no capítulo 3
    var randomFortune =
    fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune });
    */
   res.render('about',{fortune: fortune.getFortune()})
});

//para a página blocks
app.get('/blocks',handler.blocks)

//página 404 personalizada

app.use((req,res)=>{
    res.status(404)
    res.render('404')
})

//página 500 personaliozada

app.use((err,req,res,next)=>{
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port,()=>console.log(
    'Express started on http://localhost:${port};'
    + 'pres Ctrl-C to terminate'
))