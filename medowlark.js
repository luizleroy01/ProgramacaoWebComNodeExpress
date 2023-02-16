
//servidor e handlebars com o uso de view engines

const express = require('express')
const fortune = require('./lib/fortune.js')

const app = express()
const port = process.env.PORT || 3000

const bodyParser = require('body-parser')

//módulo para processamento muultiparte de formulários
const multiparty = require('multiparty')

//para fazer o parsing dos corpos JSON
app.use(bodyParser.json())


//faz a requisição dos módulos dedicados ao handlebars e cria a página
// que servirá como layout padrão

var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });

var handler = require('./lib/handlers.js')

//consigurando o uso do body-parser para manipulação do corpo de requisição de
//um formulário via post
app.use(bodyParser.urlencoded({extended:true}))

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
   res.render('about',{fortune: fortune.getFortune()})
});

//para a página com formulário
app.get('/signup',handler.signup)

//para a página com formulário newsletter
app.get('/newsletter',handler.newsletter)

app.get('/contests/vacation-photo',function(req,res){
    var now = new Date();
    res.render('contests/vacation-photo',{
    year: now.getFullYear(),month: now.getMonth()
    });
})

app.post('/contests/vacation-photo/:year/:month', function(req, res){
    const form = new multiparty.Form()
    form.parse(req,(err,fields,files) => {
        if(err){
            return res.status(500).send({error: err.message});
        } 
        console.log('received fields:')
        console.log(fields);
        console.log('received files:');
        console.log(files);
        res.redirect(303, '/thankyou');
    })
    });

//para o processamento da primeira versão de signup
/*
app.post('/process', function(req, res){
    console.log('Form (from querystring): ' + req.query.form);
    console.log('CSRF token (from hidden form field): ' + req.body._csrf);
    console.log('Name (from visible form field): ' + req.body.name);
    console.log('Email (from visible form field): ' + req.body.email);
    res.redirect(303, '/thankyou');
   
});
*/
app.post('/process', function(req, res){
    if(req.xhr || req.accepts('json,html')==='json'){
        // if there were an error, we would send { error: 'error description' }
        res.send({ success: true });
    } else {
        // if there were an error, we would redirect to an error page
        res.redirect(303, '/thank-you');
    }
});

//renderiza a página de agradecimento após ocorrido o redirecionamento   
app.get('/thankyou',handler.thankyou);

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