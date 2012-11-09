<!DOCTYPE html>
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
	<script type="text/javascript" src="../web/lib/backbone/backbone-validation-bootstrap.js"></script>
	<script type="text/javascript" src="../web/lib/bootstrap/js/bootstrap.js"></script>
	<script type="text/javascript" src="../web/js/app.js"></script>
	<script type="text/javascript" src="../web/js/model/UserModel.js"></script>
	<script type="text/javascript" src="../web/js/view/Login.js"></script>
	<script type="text/javascript" src="../web/js/view/NavigationMenu.js"></script>
	<script type="text/javascript">
		jQuery(function($) {
			EP.app = new EP.AppRouter();
			Backbone.history.start();
		});
	</script>
	
	<style type="text/css">
		/**
		 * Override Bootstrap styles
		 */
		 
		.nav-list > li > a {
			padding: 5px 15px;
			border-radius: 3px 0 0 3px;
		}
		
		[class^="icon-"], [class*=" icon-"] {
			opacity: 0.5;
		}
		
		[class^="icon-"].icon-white, [class*=" icon-"].icon-white {
			opacity: 1;
		}
		
		.header {
			min-height: 50px;
		}
		
		.container-fluid {
			padding: 0 30px;
		}
		
		.side-menu {
			padding-top: 10px;
		}
		
		.main-content {
			background-color: #ffffff;
			margin: 0;
			padding: 10px;
			border-radius: 5px;
			border: 1px solid #d7d7d7;
			box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.1);
		}
		
		h3 {
			color: #51B11D;
			border-bottom: 1px solid #ebebeb;
			padding-bottom: 10px;
			margin: 0 0 20px;
		}
		
	</style>
	
	</head>
	<body>
		<div class="header"></div>
		<div class="container-fluid">
			<div class="row-fluid">
				<!--Sidebar -->
				<div class="span3 side-menu">
				</div>
			
				<!--Body -->
			    <div class="span9 main-content">
			    	<h3>Inicio</h3>
				</div>
			</div>
		</div>	
	</body>
</html>
