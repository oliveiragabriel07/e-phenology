<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>e-phenology</title> 
	
	<!--  styles -->
	<link rel="stylesheet" type="text/css" href="../web/lib/bootstrap/css/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="../web/lib/bootstrap/css/bootstrap.control-composite.css" />	
	<link rel="stylesheet" type="text/css" href="../web/lib/fancybox/jquery.fancybox.css" />
	<link rel="stylesheet" type="text/css" href="../web/css/style.css" />
	<link rel="stylesheet" type="text/css" href="../web/css/table.css" />

	<!-- lib -->
	<script type="text/javascript" src="../web/lib/jquery/jquery.js"></script>
	<script type="text/javascript" src="../web/lib/jquery/jquery.position.js"></script>
	<script type="text/javascript" src="../web/lib/jquery/jquery.validate.js"></script>
	<script type="text/javascript" src="../web/lib/underscore/underscore.js"></script>
	<script type="text/javascript" src="../web/lib/backbone/backbone.js"></script>
	<script type="text/javascript" src="../web/lib/backbone/backbone-validation.js"></script>
	<script type="text/javascript" src="../web/lib/backbone/backbone-validation-bootstrap.js"></script>
	<script type="text/javascript" src="../web/lib/bootstrap/js/bootstrap.js"></script>
	<script type="text/javascript" src="../web/lib/fancybox/jquery.fancybox.js"></script>
	<script type="text/javascript" src="../web/lib/highcharts/highcharts.src.js"></script>
	
	<script type="text/javascript" src="../web/lib/Array.js"></script>
	<script type="text/javascript" src="../web/lib/date.js"></script>
	
	<!--  application  -->
	<script type="text/javascript" src="../web/js/app.js"></script>
	<script type="text/javascript" src="../web/js/model/UserModel.js"></script>
	<script type="text/javascript" src="../web/js/model/MetaDataModel.js"></script>
	<script type="text/javascript" src="../web/js/collection/PaginatedCollection.js"></script>
	<script type="text/javascript" src="../web/js/view/Grid.js"></script>
	<script type="text/javascript" src="../web/js/view/Login.js"></script>
	<script type="text/javascript" src="../web/js/view/Header.js"></script>
	<script type="text/javascript" src="../web/js/view/NavigationMenu.js"></script>
	<script type="text/javascript" src="../web/js/view/AbstractPage.js"></script>
	<script type="text/javascript" src="../web/js/view/Home.js"></script>
	<script type="text/javascript" src="../web/js/view/Collection.js"></script>
	<script type="text/javascript" src="../web/js/view/Individual.js"></script>
	<script type="text/javascript" src="../web/js/view/Chart.js"></script>
	<script type="text/javascript" src="../web/js/view/User.js"></script>
	<script type="text/javascript" src="../web/js/view/Agenda.js"></script>
	<script type="text/javascript" src="../web/js/main.js"></script>
	<script type="text/javascript">
		(function($) {
			EP.BootstrapData = <?php echo json_encode($user) ?>
		}(jQuery));
	</script>
	
	<style type="text/css">
		/**
		 * Override Bootstrap styles
		 */
		.nav-list > li > a {
			padding: 6px 15px;
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
			padding-top: 2px;
		}
		
		.main-content {
			background-color: #ffffff;
			margin: 0;
			padding: 10px;
			border: 1px solid #d7d7d7;
			box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.1);
			min-height: 200px !important;
		}
		
		h1 {
			line-height: 50px;
		}
		
		h3 {
			color: #51B11D;
			font-size: 22px;
			border-bottom: 1px solid #ebebeb;
			margin: 0 0 30px;
		}
		
		.header {
			margin-bottom: 20px;
		}
		
		.header .logo,
		.header .logo a {
			display: block;
		}
		
		.header .logo {
			margin: 10px 0;
			float: left;
		}
		
		.header .logo a {
			/*text-indent: -9999px;*/
			overflow: hidden;	
		}
		
		.header .action-bar {
			margin-top: 20px;
		}
		
		.footer {
			margin-top: 20px;
			min-height: 20px;
		}		
		
	</style>
	
	</head>
	<body>
		<div class="header container-fluid"></div>
		<div class="container-fluid">
			<div class="row-fluid">
				<!--Sidebar -->
				<div class="span2 side-menu">
				</div>
				
				<!-- Main Content -->
			    <div class="span10 main-content">
				</div>
			
			</div>
		</div>	
		<div class="footer container-fluid"></div>
	</body>
</html>
