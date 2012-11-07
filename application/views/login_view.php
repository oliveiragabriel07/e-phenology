<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>e-phenology - Login</title>
	
	<!--  styles -->
	<link rel="stylesheet" type="text/css" href="../web/css/style.css" />
	<link rel="stylesheet" type="text/css" href="../web/lib/bootstrap/css/bootstrap.css" />	

	<!-- lib -->
	<script type="text/javascript" src="../web/lib/jquery/jquery.js"></script>
	<script type="text/javascript" src="../web/lib/jquery/jquery.position.js"></script>
	<script type="text/javascript" src="../web/lib/jquery/jquery.validate.js"></script>
	<script type="text/javascript" src="../web/lib/underscore/underscore.js"></script>
	<script type="text/javascript" src="../web/lib/backbone/backbone.js"></script>
	<script type="text/javascript" src="../web/lib/backbone/backbone-validation.js"></script>
	<script type="text/javascript" src="../web/lib/bootstrap/js/bootstrap.js"></script>
	<script type="text/javascript" src="../web/js/app.js"></script>
	<script type="text/javascript" src="../web/js/model/UserModel.js"></script>
	<script type="text/javascript" src="../web/js/view/Login.js"></script>
	
	<script type="text/javascript">
		jQuery(function() {
			new EP.view.LoginView();
		});
	</script>
	
	<style type="text/css">
		body {
			/* Firefox */
			display:-moz-box;
			-moz-box-orient:vertical;
			-moz-box-pack:center;
			-moz-box-align:center;
			
			/* Safari and Chrome */
			display:-webkit-box;
			-webkit-box-orient:vertical;
			-webkit-box-pack:center;
			-webkit-box-align:center;
			
			/* W3C */
			display:box;
			box-orient:vertical;
			box-pack:center;
			box-align:center;
		}
		
		h1 {
			margin-bottom: 20px;
		}
		
		.login-panel {
			display: inline-block;
			background-color: white;
			padding: 25px;
			border: 1px solid #D2D2D2;
			border-radius: 2px;
			box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
			
		}
	</style>
</head>

<body>
	<div class="center">
	
		<h1 class="logo-login">e-phenology</h1>
		
		<div class="login-panel">
			<div class="control-group">
				<label for="username">E-mail</label>
				<div class="controls">
					<input type="text" id="username" name="username" />
				</div>
			</div>
			<div class="control-group">
				<label for="password">Senha</label>
				<div class="controls">
					<input type="password" id="password" name="password" />
				</div>
			</div>
			
			<button id="signInBtn"class="btn btn-primary" style="float: right;">Entrar</button>
		</div>
	</div>
</body>
</html>
