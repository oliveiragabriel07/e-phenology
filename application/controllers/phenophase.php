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
		// TODO validate input params
		$limit = $this->input->get('length');
		$start = $this->input->get('start');
		$sort = $this->input->get('sortField');
		$dir = $this->input->get('sortDir');
		
		$phenophaseData = $this->phenophase->getListWithIndividual($limit, $start, $sort, $dir);
		echo json_encode($phenophaseData);
	}
}

?>