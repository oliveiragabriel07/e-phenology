<?php
require_once 'application/libraries/REST_Controller.php';

if (!defined('BASEPATH'))
	exit('No direct script access allowed');

class Collection extends REST_Controller {
	function __construct() {
		parent::__construct();

		$this->load->model('User_model', 'user');
		$this->load->model('Collection_model', 'collection');
		if(!$this->user->isLogged()) {
			redirect('login');
		}
	}
	
	function index_get() {
		$this->response($this->collection->get($this->get('id')));
	}
	
	function index_put() {
		// TODO validate data
		$collection = new Collection_model();
		$collection->setId($this->put('id'));
		$collection->setFlowerBud($this->put('flowerBud'));
		$collection->setAnthesis($this->put('anthesis'));
		$collection->setRipe($this->put('ripe'));
		$collection->setUnripe($this->put('unripe'));
		$collection->setBudding($this->put('budding'));
		$this->response($collection->update());
	}	

	function search_get() {
		// TODO validate input params
		// TODO get fielters
		$limit = $this->input->get('length');
		$start = $this->input->get('start');
		$sort = $this->input->get('sortField');
		$dir = $this->input->get('sortDir');
		
		$collectionData = $this->collection->search($limit, $start, $sort, $dir);
		$this->response($collectionData);
	}
}

?>