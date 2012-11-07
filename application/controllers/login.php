<?php
if (!defined('BASEPATH'))
	exit('No direct script access allowed');

class Login extends CI_Controller {
	function __construct() {
		parent::__construct();

		$this->load->model('User_model', 'user');
	}

	function index() {
		if ($this->user->isLogged()) {
			redirect('user');
		} else {
			$this->load->view('login_view');
		}
	}
	
	function teste() {
		echo "teste";
	}

	/**
	 * Check credentials and start session
	 */
	function doLogin() {
		$username = $this->input->post('username');
		$password = $this->input->post('password');

		if ($this->user->validate($username, $password)) {
			$data = array(
				'success' => true
			);
		} else {
			$data = array(
				'success' => false,
				'message' => 'Usuario ou senha incorretos.'
			);
		}

		echo json_encode($data);
	}

	function logout() {
		$this->user->endSession();
		redirect('login');
	}
}

?>