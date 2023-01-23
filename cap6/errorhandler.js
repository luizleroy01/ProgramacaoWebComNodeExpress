// this should appear AFTER all of your routes
// note that even if you don't need the "next"
// function, it must be included for Express
// to recognize this as an error handler
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).render('error');
    });