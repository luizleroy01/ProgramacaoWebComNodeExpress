app.get('/no-layout', function(req, res){
    res.render('no-layout', { layout: null });
    });