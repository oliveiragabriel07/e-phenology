<?php
if (!defined('BASEPATH'))
	exit('No direct script access allowed');

class User extends CI_Controller {
	function __construct() {
		parent::__construct();

		$this->load->model('User_model', 'user');
		if(!$this->user->isLogged()) {
			redirect('login');
		}
	}

	function index() {
		$user = $this->user->getUserDetails();
		$data['user'] = $user;
		
		$this->load->view('main_view', $data);
	}
}

?>