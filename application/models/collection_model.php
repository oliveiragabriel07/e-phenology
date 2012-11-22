<?php
require_once 'application/models/abstract_model.php';
require_once 'application/models/family_model.php';
require_once 'application/models/genus_model.php';
require_once 'application/models/species_model.php';
require_once 'application/models/individual_model.php';
require_once 'application/dtos/CollectionDTO.php';

Class Collection_model extends Abstract_model {

	public static $tableName = "t_collection";
	
	public static $map = array(
		"id" => "id_collection",
		"individual" => "id_individual",
		"date" => "date",			
		"image" => "image",
		"remark" => "remark",
		"flowerBud" => "flower_bud",
		"anthesis" => "anthesis",
		"ripe" => "ripe",
		"unripe" => "unripe",
		"budding" => "budding",
		"fall" => "fall"
	);
	
	public static function getColumn($field) {
		return Collection_model::$map[$field];
	}
	
	public static function getMap($field) {
		return Collection_model::$tableName . "." . Collection_model::$map[$field];
	}
	
	private $individual;
	private $date;
	private $image;
	private $remark;
	private $flowerBud;
	private $anthesis;
	private $ripe;
	private $unripe;
	private $budding;
	private $fall;
	
	/**
	 * @return the $individual
	 */
	public function getIndividual() {
		return $this->individual;
	}

	/**
	 * @param field_type $individual
	 */
	public function setIndividual($individual) {
		$this->individual = $individual;
	}

	/**
	 * @return the $date
	 */
	public function getDate() {
		return $this->date;
	}

	/**
	 * @param field_type $date
	 */
	public function setDate($date) {
		$this->date = $date;
	}
	
	/**
	 * @return the $value
	 */
	public function getValue() {
		return $this->value;
	}
	
	/**
	 * @param field_type $value
	 */
	public function setValue($value) {
		$this->value= $value;
	}	
	
	/**
	 * @return the $image
	 */
	public function getImage() {
		return $this->image;
	}
	
	/**
	 * @param field_type $image
	 */
	public function setImage($image) {
		$this->image = $image;
	}
	
	/**
	 * @return the $remark
	 */
	public function getRemark() {
		return $this->remark;
	}
	
	/**
	 * @param field_type $remark
	 */
	public function setRemark($remark) {
		$this->remark = $remark;
	}

	/**
	 * @return the flowerBud
	 */
	public function getFlowerBud() {
		return $this->flowerBud;
	}
	
	/**
	 * @param field_type flowerBud
	 */
	public function setFlowerBud($flowerBud) {
		$this->flowerBud = $flowerBud;
	}
	
	/**
	 * @return the anthesis
	 */
	public function getAnthesis() {
		return $this->anthesis;
	}
	
	/**
	 * @param field_type anthesis
	 */
	public function setAnthesis($anthesis) {
		$this->anthesis = $anthesis;
	}
	
	/**
	 * @return the ripe
	 */
	public function getRipe() {
		return $this->ripe;
	}
	
	/**
	 * @param field_type ripe
	 */
	public function setRipe($ripe) {
		$this->ripe= $ripe;
	}
	
	/**
	 * @return the unripe
	 */
	public function getUnripe() {
		return $this->unripe;
	}
	
	/**
	 * @param field_type unripe
	 */
	public function setUnripe($unripe) {
		$this->unripe= $unripe;
	}
	
	/**
	 * @return the budding
	 */
	public function getBudding() {
		return $this->budding;
	}
	
	/**
	 * @param field_type budding
	 */
	public function setBudding($budding) {
		$this->budding = $budding;
	}
	
	/**
	 * @return the fall
	 */
	public function getFall() {
		return $this->fall;
	}
	
	/**
	 * @param field_type fall
	 */
	public function setFall($fall) {
		$this->fall = $fall;
	}	

	/**
	 * (non-PHPdoc)
	 * @see Abstract_model::parseQueryResult()
	 */
	protected function parseQueryResult($result) {
		$this->setId($result->{Collection_model::getColumn("id")});
		$this->setImage($result->{Collection_model::getColumn("image")});
		$this->setDate($result->{Collection_model::getColumn("date")});
		$this->setRemark($result->{Collection_model::getColumn("remark")});
		$this->setFlowerBud($result->{Collection_model::getColumn("flowerBud")});
		$this->setAnthesis($result->{Collection_model::getColumn("anthesis")});
		$this->setRipe($result->{Collection_model::getColumn("ripe")});
		$this->setUnripe($result->{Collection_model::getColumn("unripe")});
		$this->setBudding($result->{Collection_model::getColumn("budding")});
		$this->setFall($result->{Collection_model::getColumn("fall")});
		return $this;
	}

	/**
	 * (non-PHPdoc)
	 * @see Abstract_model::getTableName()
	 */
	protected function getTableName() {
		return Collection_model::$tableName;
	}

	/**
	 * (non-PHPdoc)
	 * @see Abstract_model::getObjectAsArray()
	 */
	public function getObjectAsArray() {
		$data[Collection_model::getColumn("id")] = $this->getId();
		$data[Collection_model::getColumn("individual")] = $this->getIndividual();
		$data[Collection_model::getColumn("date")] = $this->getDate();
		$data[Collection_model::getColumn("image")] = $this->getImage();
		$data[Collection_model::getColumn("remark")] = $this->getRemark();
		$data[Collection_model::getColumn("flowerBud")] = $this->getFlowerBud();
		$data[Collection_model::getColumn("anthesis")] = $this->getAnthesis();
		$data[Collection_model::getColumn("ripe")] = $this->getRipe();
		$data[Collection_model::getColumn("unripe")] = $this->getUnripe();
		$data[Collection_model::getColumn("budding")] = $this->getBudding();
		$data[Collection_model::getColumn("fall")] = $this->getFall();

		return array_filter($data, function($val) {
			return $val != null; 
		});
	}
	
	/**
	 * Gets the object from the db with the specified $id
	 * @param int $id
	 * @return the query result
	 */
	public function get($id) {
		$query = $this->db->select()->from($this->getTableName())->where(Collection_model::getColumn("id"), $id)->get();
		if ($query->num_rows() == 1) {
			$result = $query->row();
			return $this->parseQueryResult($result);
		}
	
	}
	
	public function add() {
		$op = $this->db->insert(Collection_model::$tableName, $this->getObjectAsArray());
		$this->id = $this->db->insert_id();
		
		return  array(
			"success" => $op
		);
	}
	
	public function update() {
		$this->db->where(Collection_model::getMap("id"), $this->getId());
		$op = $this->db->update(Collection_model::$tableName, $this->getObjectAsArray());
		
		return array(
			"success" => $op
		);
	}

	public function search($limit, $start, $sort, $dir) {
		$this->db->start_cache();
		$this->db->select(Collection_model::getMap("id"));
		$this->db->select(Collection_model::getMap("date"));
		$this->db->select(Collection_model::getMap("image"));
		$this->db->select(Collection_model::getMap("remark"));
		$this->db->select(Collection_model::getMap("flowerBud"));
		$this->db->select(Collection_model::getMap("anthesis"));
		$this->db->select(Collection_model::getMap("ripe"));
		$this->db->select(Collection_model::getMap("unripe"));
		$this->db->select(Collection_model::getMap("budding"));
		$this->db->select(Collection_model::getMap("fall"));
		$this->db->select(Individual_model::getMap("id"));
		$this->db->select(Species_model::getMap("id"));
		$this->db->select(Species_model::getMap("scientificName"));
		$this->db->select(Genus_model::getMap("id"));
		$this->db->select(Genus_model::getMap("name"));
		$this->db->select(Family_model::getMap("id"));
		$this->db->select(Family_model::getMap("name"));
		$this->db->from(Collection_model::$tableName);
		$this->db->join(Individual_model::$tableName, Collection_model::getMap("individual") . " = " . Individual_model::getMap("id"));
		$this->db->join(Species_model::$tableName, Individual_model::getMap("species") . " = " . Species_model::getMap("id"));
		$this->db->join(Genus_model::$tableName, Species_model::getMap("genus") . " = " . Genus_model::getMap("id"));
		$this->db->join(Family_model::$tableName, Genus_model::getMap("family") . " = " . Family_model::getMap("id"));
		$this->db->order_by(Collection_model::getMap($sort), $dir);
		$this->db->limit($limit, $start);
		$this->db->stop_cache();
		
		$query = $this->db->get();
		$collectionList = array();
	
		foreach ($query->result() as $row) {
			$family = new Family_model();
			$family->parseQueryResult($row);
			
			$genus = new Genus_model();
			$genus ->parseQueryResult($row);
			$genus->setFamily($family);
			
			$species = new Species_model();
			$species->parseQueryResult($row);
			$species->setGenus($genus);
			
			$individual = new Individual_model();
			$individual ->parseQueryResult($row);
			$individual->setSpecies($species);
			
			$collection = new Collection_model();
			$collection->parseQueryResult($row);
			$collection->setIndividual($individual);
			
			$collectionList[] = CollectionDTO::copy($collection);
		}
		
		$this->db->select("COUNT(*) as total_rows");
		$query = $this->db->get();
		$total = $query->row()->total_rows;
	
		return array(
			'data' => $collectionList,
			'totalRows' => $total
		);
	}
}

?>
