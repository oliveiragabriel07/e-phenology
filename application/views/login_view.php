<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>e-phenology - Login</title>
	
	<!--  styles -->
	<link rel="stylesheet" type="text/css" href="../web/lib/bootstrap/css/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="../web/css/style.css" />
	<link rel="stylesheet" type="text/css" href="../web/css/login.css" />

	<!-- lib -->
	<script type="text/javascript" src="../web/lib/jquery/jquery.js"></script>
	<script type="text/javascript" src="../web/lib/jquery/jquery.position.js"></script>
	<script type="text/javascript" src="../web/lib/jquery/jquery.validate.js"></script>
	<script type="text/javascript" src="../web/lib/underscore/underscore.js"></script>
	<script type="text/javascript" src="../web/lib/backbone/backbone.js"></script>
	<script type="text/javascript" src="../web/lib/backbone/backbone-validation.js"></script>
	<script type="text/javascript" src="../web/lib/backbone/backbone-validation-bootstrap.js"></script>
	<script type="text/javascript" src="../web/lib/bootstrap/js/bootstrap.js"></script>
	<script type="text/javascript" src="../web/js/app.js"></script>
	<script type="text/javascript" src="../web/js/model/UserModel.js"></script>
	<script type="text/javascript" src="../web/js/view/Login.js"></script>
	
	<script type="text/javascript">
		jQuery(function() {
			new EP.view.LoginView();
		});
	</script>
	
</head>

<body>
	<div class="center">
	
		<div class="login-panel">
			<h1 class="logo-login"><img src="web/img/logo_e-phenology.png" /></h1>
			<form>
				<fieldset>
					<div class="control-group">
						<label for="username">E-mail</label>
						<div class="controls">
							<input class="input-block-level" type="text" id="username" name="username" />
						</div>
					</div>
					<div class="control-group">
						<label for="password">Senha</label>
						<div class="controls">
							<input class="input-block-level" type="password" id="password" name="password" />
						</div>
					</div>
				</fieldset>
				
				<div id="error-box" class="alert alert-error" style="display: none">
				  <button type="button" class="close" data-dismiss="alert">&times;</button>
				  <span class="message">Usuario ou senha invalidos</span>
				</div>
				
				<button type="submit" id="signInBtn"class="btn btn-primary" style="float: right;">Entrar</button>
			</form>
		</div>
	</div>
</body>
</html>
