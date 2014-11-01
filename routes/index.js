var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'mysql-5.priorweb.be',
	user: 'johanHuysmans',
	password: 'rabarber',
	database: 'roderidder'

});

connection.connect(function(err) {
	if(err) {
		console.error('Error connecing: ' + err.stack);
		return;
	}

	console.log('Connected as id '+ connection.threadId);
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/roderidder', function(req, res) {
	res.render('roderidder');
});

router.get('/roderidder/api/titles', function(req, res) {
	connection.query('SELECT * FROM rr_titles', function(err,rows,fields){
		if(err)
			console.log(err);

		res.json(rows);
	});
});

router.get('/roderidder/api/whishlist', function(req, res) {
  connection.query('SELECT * FROM rr_titles WHERE zwInCollectie IS NULL AND kleurInCollectie IS NULL AND nr < 150', function(err,rows,fields){
    if(err)
      console.log(err);

    res.json(rows);
  });
});

router.get('/roderidder/api/dubbel', function(req, res) {
  connection.query('SELECT * FROM rr_titles WHERE comment LIKE "%dubbel%"', function(err,rows,fields){
    if(err)
      console.log(err);

    res.json(rows);
  });
});


router.get('/roderidder/api/numberOfPages', function(req, res){
  var titlesPerPage = req.query.titlesPerPage || 10;

  connection.query('SELECT count(*) AS totTitles FROM rr_titles', function(err,rows,fields){
  	var numberOfPages = Math.ceil(rows[0].totTitles / titlesPerPage);
  	res.json(numberOfPages);
  });
});

router.get('/roderidder/api/titles/pages', function(req, res){
  var titlesPerPage = req.query.titlesPerPage || 10;
  var pageNumber = req.query.pageNumber || 1;

  var startIndex = (pageNumber - 1) * titlesPerPage;

  connection.query('SELECT count(*) AS totTitles FROM rr_titles', function(err,rows,fields){
  	var totalTitles = rows[0];
  	connection.query('SELECT * FROM rr_titles LIMIT ' + startIndex +',' + titlesPerPage, function(err2,rows2,fields2){
  		res.json(rows2);
  	});
  });
});


module.exports = router;
