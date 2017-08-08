function BbsSpa(){
	this.initialized = false;
	this.debug = true;
	this.routes = [];
	this.routeIcon = 'fa fa-home';
	this._dbug('bbs spa instantiated');
}

BbsSpa.prototype.init = function(){		
	this._attachBehavior();
	self.initialized = true;
	this._dbug('** bbs spa init ' + self.initialized + ' **');
}

BbsSpa.prototype.toggleTerm = function(){
	$('#fTelnetContainer').toggle();
	if($('#fTelnetContainer').is(':visible')) {
		ftClient.Connect();
	} 
}

BbsSpa.prototype.toggleNav = function(){
	$('#navbar').hasClass('in') ? $('#navbar').removeClass('in') : $('#navbar').addClass('in');
}

BbsSpa.prototype._renderLinkInDiv = function(link){
	let target = '#render-div'; let self = this;
	this._hideBlockingElements();
	$(target).addClass('spinner');
	let activeMenuItem = this._setIconFromRouteGetLiClass(link);
	$(target).load(link,function(){
		self.routes.push(link);
		self._removeDupeElements(target);
		self._swapInRouteIcon();
		self._addActiveClassToMenuItem(activeMenuItem);
		$(target).removeClass('spinner');
		self._dbug(JSON.stringify(self.routes));
	});	
}

BbsSpa.prototype._attachBehavior = function(){
	this._hijackLinks();
	this._fTelnetAutoconnectOn();
	this._fixBrokenClasses();
}

BbsSpa.prototype._hijackLinks = function(){
	let self = this;
	$('a').click(function(e){
		var route = $(this).attr("href");
		if(route[0] != '#' && (route[0] == '.' || route[0] == '/')){
			e.preventDefault();
			self._dbug('-- re-rendering page ' + route + ' --');
			self._renderLinkInDiv(route);
		}
	})
}

BbsSpa.prototype._fTelnetAutoconnectOn = function(){
	$('#fTelnetContainer').click(function(){
			ftClient.Connect();
		});
}

BbsSpa.prototype._fixBrokenClasses = function(){
	$('#sidebar').removeClass('col-xs-6 col-sm-3');
	$('#sidebar').removeClass('col-xs-6 col-sm-3');
}

BbsSpa.prototype._removeDupeElements = function(target){
	if($('.navbar').length > 1){
		$('.navbar')[0].remove();
	}
	$('#render-div .sidebar-stuff').remove();
	$('#render-div footer').remove();
	this._dbug('-- trimmed excess elements --');
}

BbsSpa.prototype._hideBlockingElements = function(){
	$('#fTelnetContainer').hide();
	if($('#navbar').hasClass('in')) this.toggleNav();
}

BbsSpa.prototype._dbug = function(message){
	if(this.debug == true) {
		console.log(message);
	} 
}

BbsSpa.prototype._swapInRouteIcon = function(){
	$('#navbar-fa-icon-main').removeClass();
	$('#navbar-fa-icon-main').addClass(this.routeIcon);
	this._dbug('swap in route icon ' + this.routeIcon);
}

BbsSpa.prototype._removeActiveClassesFromMenuItems = function(){
	$('.navbar li').removeClass('active-menu-item');
}

BbsSpa.prototype._setIconFromRouteGetLiClass = function(route){
	if(route.indexOf('mail') > -1 ) {
		this._removeActiveClassesFromMenuItems();
		this.routeIcon = 'fa fa-envelope';
		return '.mail-menu-item';
	}
	if(route.indexOf('forum') > -1 ){
		this._removeActiveClassesFromMenuItems();
		this.routeIcon ='fa fa-comments';
		return '.001-forum-ssjs';
	} 
	if(route.indexOf('files') > -1 ) {
		this._removeActiveClassesFromMenuItems();
		this.routeIcon ='fa fa-file';
		return '.002-files-xjs'
	}
	if(route.indexOf('games') > -1 ){
		this._removeActiveClassesFromMenuItems();
		this.routeIcon ='fa fa-gamepad';
		return '.003-games-xjs';
	} 
	if(route.indexOf('userlist') > -1 ){
		this._removeActiveClassesFromMenuItems();
		this.routeIcon = 'fa fa-users';
		return '.001-userlist-xjs';
	} 
	if(route.indexOf('register') > -1 ){
		this._removeActiveClassesFromMenuItems();
		this.routeIcon = 'fa fa-user-plus';
		return '.navbar-nav li:nth-child(2)';
	} 
}

BbsSpa.prototype._addActiveClassToMenuItem = function(targetClass){
	$(targetClass).addClass('active-menu-item');

}

