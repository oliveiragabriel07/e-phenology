<?php
require_once 'application/libraries/REST_Controller.php';
require_once 'application/enums/PlaceEnum.php';

if (!defined('BASEPATH'))
	exit('No direct script access allowed');

class Collection extends REST_Controller {
	const FILTER_ANY = "ANY";
	
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
		$collection->setFall($this->post('fall'));
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
		$collection->setFall($this->put('fall'));
		$this->response($collection->update());
	}	

	function search_get() {
		// get query params
		$filters = $this->parseSearchFilters($this->input->get('filters'));
		$limit = $this->input->get('length');
		$start = $this->input->get('start');
		$sort = $this->input->get('sortField');
		$dir = $this->input->get('sortDir');
		
		// TODO validate input params
		
		if ($sort == 'place') {
			$sort = Place_model::getMap('id');
		} else if ($sort == 'individual') {
			$sort = Individual_model::getMap('id');
		} else {
			$sort = Collection_model::getMap($sort);
		}
		
		$collectionData = $this->collection->search($limit, $start, $filters, $sort, $dir);
		$this->response($collectionData);
	}
	
	function parseSearchFilters($in) {
		$filters = array();
		
		// parse filters
		if (isset($in['transect']) && $in['transect'] != Collection::FILTER_ANY) {
			$filters[Individual_model::getMap("transect")] = $in['transect'];
		}
		
		if (isset($in['individual']) && $in['individual'] != Collection::FILTER_ANY) {
			$filters[Individual_model::getMap("id")] = $in['individual'];
		}
		
		if (isset($in['place']) && $in['place'] != Collection::FILTER_ANY) {
			$place = new ReflectionClass('PlaceEnum');
			$filters[Place_model::getMap("id")] = $place->getConstant($in['place']);
		}
		
		if (isset($in['period']) && $in['period'] != Collection::FILTER_ANY) {
			$period = explode(";", $in["period"], 2);
			$filters[Collection_model::getMap("date") . " >="] = $period[0] . ' 00:00:00';
			$filters[Collection_model::getMap("date") . " <"] = $period[1] . ' 00:00:00';
		}	

		return $filters;
	}
}

?>