var fortune = require('./fortune')

exports.home = (req,res) => res.render('home')

exports.about = (req,res) => res.render('about',{fortune:fortune.getFortune()})

exports.blocks = (req,res) => res.render('blocks',{layout:'bloco'})

exports.notFound = (req,res) => res.render('404')

exports.serverError =(err,req,res,next) => res.render('500')

