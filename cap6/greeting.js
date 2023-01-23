exports.greeting = (req,res) => res.render('about', {
    message: 'welcome',
    style: req.query.style,
    userid: req.cookie.userid,
    username: req.session.username,
    })