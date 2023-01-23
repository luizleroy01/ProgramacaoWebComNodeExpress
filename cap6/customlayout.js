app.get('/custom-layout', function(req, res){
    res.render('custom-layout', { layout: 'custom' });
    });