// body-parser middleware must be linked in
app.post('/process-contact', function(req, res){
    console.log('Received contact from ' + req.body.name +
    ' <' + req.body.email + '>');
    // save to database....
    res.redirect(303, '/thank-you');
    });