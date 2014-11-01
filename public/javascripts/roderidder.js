$(document).ready(function() {

	function rrModel() {
		var self = this;
		self.titel = ko.observable('Roodje');
		self.titles = ko.observableArray([]);
		self.pageNumber = ko.observable(1);
		self.maxPageNr = ko.observable(1);

		self.updateNavTabs = function(whichOne) {
			$('ul.nav-tabs li.active').removeClass('active');
  	  $('#'+whichOne).addClass('active');
		};

		self.loadMaxPageNr = function() {
			return $.ajax({
    	  url: '/roderidder/api/numberOfPages',
    		type: 'get'
    	}).promise();
		};

		self.loadTitles = function() {
      return $.ajax({
    	  url: '/roderidder/api/titles/pages?pageNumber='+self.pageNumber(),
    		type: 'get'
    	}).promise();
    };

    self.updateTitles = function() {
    	self.updateNavTabs('collectieTab');
    	

    	self.loadMaxPageNr().then(function(data) {
    		self.maxPageNr(data);
    	});

    	self.loadTitles().then(function(data) {
			  self.titles(data);
		  });	
    };

    self.loadWhishlist = function() {
      return $.ajax({
    	  url: '/roderidder/api/whishlist',
    		type: 'get'
    	}).promise();
    };

    self.updateWhishlist = function() {
    	self.updateNavTabs('whishlistTab');
    	self.pageNumber(1);
    	self.maxPageNr(1);
    	self.loadWhishlist().then(function(data) {
			  self.titles(data);
		  });	
    };

    self.updateDubbel = function() {
    	self.updateNavTabs('dubbelTab');
    	self.pageNumber(1);
    	self.maxPageNr(1);
    	self.loadDubbel().then(function(data) {
			  self.titles(data);
		  });	
    };

    self.loadDubbel = function() {
      return $.ajax({
    	  url: '/roderidder/api/dubbel',
    		type: 'get'
    	}).promise();
    };

    



		self.increasePage = function() {
			self.pageNumber(self.pageNumber() + 1);
		};

		self.decreasePage = function() {
			self.pageNumber(self.pageNumber() - 1);
		};

		self.pageNumber.subscribe(function(newVal) {
			self.updateTitles();
		});

		self.updateTitles();
	}
	ko.applyBindings(new rrModel());
});