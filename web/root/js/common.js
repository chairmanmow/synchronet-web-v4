// How often to check for unread mail, new telegrams (milliseconds)
var updateInterval = 60000;

function login(evt) {
	if ($('#input-username').val() === '' ||
		$('#input-password').val() === ''
	) {
		return;
	}
	if (typeof evt !== 'undefined') evt.preventDefault();
	$.ajax(
		{	'url' : './api/auth.ssjs',
			'method' : 'POST',
			'data' : {
				username : $('#input-username').val(),
				password : $('#input-password').val()
			}
		}
	).done(
		function (data) {
			if (data.authenticated) {
				window.location.reload(true); //FIXME redirect
			} else {
				$('#login-form').append(
					'<p class="text-danger">Login failed</p>'
				);
			}
		}
	);
}

function logout() {
	$.ajax(
		{	'url' : './api/auth.ssjs',
			'method' : 'GET',
			'data' : {
				'logout' : true
			}
		}
	).done(
		function (data) { if (!data.authenticated) window.location.href = '/'; }  //FIXME redirect
	);
}

function scrollUp() {
	if (window.location.hash === '') return;
	if ($('#navbar').length < 1) return;
	window.scrollBy(0, -document.getElementById('navbar').offsetHeight);
}

function getMailUnreadCount() {
	$.getJSON(
		'./api/forum.ssjs?call=get-mail-unread-count',
		function (data) {
			$('#badge-unread-mail').text(data.count < 1 ? '' : data.count);
			$('#badge-unread-mail-inner').text(
				data.count < 1 ? '' : data.count
			);
		}
	);
}

function sendTelegram(alias) {
	$('#popUpModalTitle').html('Send a telegram to ' + alias);
	$('#popUpModalBody').html(
		'<input type="text" class="form-control" ' +
		'placeholder="My message" name="telegram" id="telegram">'
	);
	$('#popUpModalActionButton').show();
	$('#popUpModalActionButton').click(
		function () {
			$.getJSON(
				'./api/system.ssjs?call=send-telegram&user=' +
				alias + '&telegram=' + $('#telegram').val(),
				function(data) {}
			);
			$('#popUpModal').modal('hide');
		}
	);
	$('#popUpModal').modal('show');
}

function getTelegram() {
	$.getJSON(
		'./api/system.ssjs?call=get-telegram',
		function (data) {
			if (typeof data.telegram === 'undefined' ||
				data.telegram === null
			) {
				return;
			}
			var tg = data.telegram.replace(
				/\1./g, ''
			).replace(
				/\r?\n/g, '<br>'
			);
			$('#popUpModalTitle').html('New telegram(s) received');
			$('#popUpModalBody').append(tg);
			$('#popUpModalActionButton').hide();
			$('#popUpModal').modal('show');
		}
	);
}

window.onload =	function () { 

	$('#button-logout').click(logout);
	$('#button-login').click(login);
	$('#form-login').submit(login);

	$('#popUpModal').on(
		'hidden.bs.modal',
		function (e) {
			$('#popUpModalActionButton').off('click');
			$('#popUpModalTitle').empty();
			$('#popUpModalBody').empty();
		}
	);
	$("#popUpModalCloseButton").click(
		function () {
			$('#popUpModal').modal('hide');
		}
	);

	setTimeout(scrollUp, 25); 
	window.onhashchange = scrollUp;

	getMailUnreadCount();
	setInterval(getMailUnreadCount, updateInterval);

	getTelegram();
	setInterval(getTelegram, updateInterval);

}
