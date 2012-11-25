<?php
require_once 'application/libraries/REST_Controller.php';

if (!defined('BASEPATH'))
	exit('No direct script access allowed');

class Collection extends REST_Controller {
	function __construct() {
		parent::__construct();

		$this->load->model('User_model', 'user');
		$this->load->model('Collection_model', 'collection');
		$this->load->model('Individual_model', 'individual');
		$this->load->model('Place_model', 'place');
		if(!$this->user->isLogged()) {
			redirect('login');
		}
	}
	
	function index_post() {
		$collection = new Collection_model();
		$collection->setIndividual($this->post('individual'));
		$collection->setDate($this->post('date'));
		$collection->setRemark($this->post('remark'));
		$collection->setFlowerBud($this->post('flowerBud'));
		$collection->setAnthesis($this->post('anthesis'));
		$collection->setRipe($this->post('ripe'));
		$collection->setUnripe($this->post('unripe'));
		$collection->setBudding($this->post('budding'));
		$collection->setFall($this->put('fall'));
		$this->response($collection->add());
	}
	
	function index_get() {
		$collection = new Collection_model();
		$collection->setId($this->get('id'));
		$this->response($collection->get());
		$this->response(array("id" => $this->get('id')));
	}
	
	function index_put() {
		$collection = new Collection_model();
		$collection->setId($this->put('id'));
		$collection->setRemark($this->put('remark'));
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
		$filters = $this->input->get('filters');
		
		if ($sort == 'place') {
			$sort = Place_model::getMap('id');
		} else if ($sort == 'individual') {
			$sort = Individual_model::getMap('id');
		} else {
			$sort = Collection_model::getMap($sort);
		}
		
		$collectionData = $this->collection->search($limit, $start, $sort, $dir);
		$this->response($collectionData);
	}
}

?>