<?php
if (!defined('BASEPATH'))
	exit('No direct script access allowed');

class Phenophase extends CI_Controller {
	function __construct() {
		parent::__construct();

		$this->load->model('User_model', 'user');
		$this->load->model('Phenophase_data_model', 'phenophase');
		if(!$this->user->isLogged()) {
			redirect('login');
		}
	}

	function index() {
		$this->load->view('table_view');
	}
	
	function search() {
		// validate input
		
		$phenophaseData = $this->phenophase->getList(10, 0, "date", "desc");
		echo json_encode($phenophaseData);
	}
}

?>