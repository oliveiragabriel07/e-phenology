<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>e-phenology - Login</title>
	
	<!--  styles -->
	<link rel="stylesheet" type="text/css" href="../web/lib/bootstrap/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="../web/lib/dataTables/css/dt.bootstrap.css" />
<!-- 	<link rel="stylesheet" type="text/css" href="../web/css/style.css" /> -->

	<!-- lib -->
	<script type="text/javascript" src="../web/lib/jquery/jquery.js"></script>
	<script type="text/javascript" src="../web/lib/jquery/jquery.position.js"></script>
	<script type="text/javascript" src="../web/lib/jquery/jquery.validate.js"></script>
	<script type="text/javascript" src="../web/lib/dataTables/js/jquery.dataTables.js"></script>
	<script type="text/javascript" src="../web/lib/dataTables/js/dt.bootstrap.js"></script>
	<script type="text/javascript" src="../web/lib/underscore/underscore.js"></script>
	<script type="text/javascript" src="../web/lib/backbone/backbone.js"></script>
	<script type="text/javascript" src="../web/lib/backbone/backbone-validation.js"></script>
	<script type="text/javascript" src="../web/lib/backbone/backbone-validation-bootstrap.js"></script>
	<script type="text/javascript" src="../web/lib/bootstrap/js/bootstrap.js"></script>
	</style>
	<script type="text/javascript">
		jQuery(function($){
			/* Default class modification */

			$('#example').dataTable({
				sDom: "<'row'l>t<'row'<'span4'i><'span8'p>>",
				sWrapper: 'dataTables_wrapper form-inline',
				sPaginationType: "bootstrap",
				bServerSide: true,
				fnServerData: function(sSource, aoData, fnCallback, oSettings) {
					$.ajax({
						url: '../phenophase/search',
						method: 'GET',
						dataType: 'json',
						success: function(result) {
							debugger;
							fnCallback({
								iTotalRecords: 30,
								iTotalDisplayRecords: 10,
				                 aaData: result
			                 });
						}
					});
				},
				aoColumns: [
	                { "mData": "id", 'sTitle': 'Id' },
	                { "mData": "date", 'sTitle': 'Data' },
	                { "mData": "individualId", 'sTitle': 'Individuo' },
	                { "mData": "phenophaseId", 'sTitle': 'Phenophase' },
	                { "mData": "value", 'sTitle': 'Valor' }
	            ],
				oLanguage: {
					sLengthMenu: '_MENU_ Resultados por pagina',
					sInfo: '_START_ - _END_ de _TOTAL_',
					sInfoEmpty: 'Nenhum resultado encontrado',
					sInfoFiltered: '',
					oPaginate: {
						sNext: 'Proxima',
						sPrevious: 'Anterior'
					}
				}
			});
		});
	</script>
</head>
<body>

<div class="container">
<table cellpadding="0" cellspacing="0" border="0" class="table table-striped" id="example">
</table>
</div>	

</body>
</html>
