<?php
require_once 'application/models/abstract_model.php';
require_once 'application/dtos/CollectionDTO.php';

Class Collection_model extends Abstract_model {

	const TABLE_NAME = 't_collection';

	private $individualId;
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
	 * @return the $individualId
	 */
	public function getIndividualId() {
		return $this->individualId;
	}

	/**
	 * @param field_type $individualId
	 */
	public function setIndividualId($individualId) {
		$this->individualId = $individualId;
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
		$this->setId($result->id);
		$this->setIndividualId($result->id_individual);
		$this->setDate($result->date);
		$this->setImage($result->image);
		$this->setRemark($result->remark);
		$this->setFlowerBud($result->flower_bud);
		$this->setAnthesis($result->anthesis);
		$this->setRipe($result->ripe);
		$this->setUnripe($result->unripe);
		$this->setBudding($result->budding);
		$this->setFall($result->fall);
		return $this;
	}

	/**
	 * (non-PHPdoc)
	 * @see Abstract_model::getTableName()
	 */
	protected function getTableName() {
		return self::TABLE_NAME;
	}

	/**
	 * (non-PHPdoc)
	 * @see Abstract_model::getObjectAsArray()
	 */
	protected function getObjectAsArray() {
		return get_object_vars($this);
	}

	private function copyCollection($result) {
		$dto = new CollectionDTO();
		$dto->setId($result->id);
		$dto->setIndividualId($result->id_individual);
		$dto->setImage($result->image);
		$dto->setDate($result->date);
		$dto->setFlowerBud($result->flower_bud);
		$dto->setAnthesis($result->anthesis);
		$dto->setRipe($result->ripe);
		$dto->setUnripe($result->unripe);
		$dto->setBudding($result->budding);
		$dto->setFall($result->fall);		
		return $dto;
	}
	
// 	public function getList($limit, $start, $sort, $dir) {
// 		$this->db->from($this->getTableName());
// 		$this->db->order_by($sort, $dir);
// 		$this->db->limit($limit, $start);
		
// 		$collectionList = array();
// 		$query = $this->db->get();
		
// 		foreach ($query->result() as $row) {
// 			$collectionList[] =  $this->copyCollection($row);
// 		}
		
// 		return $collectionList;		
// 	}
	
	public function getListWithIndividual($limit, $start, $sort, $dir) {
		$table = $this->getTableName();
	
		$this->db->start_cache();
		$this->db->select("
				d.id,
				d.date,
				d.image,
				d.remark,
				d.flower_bud,
				d.anthesis,
				d.ripe,
				d.unripe,
				d.budding,
				d.fall,
				i.id as id_individual,
				s.scientific_name as species,
				g.name as genus,
				f.name as family");		
		$this->db->from("$table as d");
		$this->db->join('t_individual as i', 'd.id_individual = i.id');
		$this->db->join('t_species as s', 'i.id_species = s.id');
		$this->db->join('t_genus as g', 's.id_genus = g.id');
		$this->db->join('t_family as f', 'g.id_family = f.id');
		$this->db->order_by($sort, $dir);
		$this->db->limit($limit, $start);
		$this->db->stop_cache();
		
		$collectionList = array();
		$query = $this->db->get();
	
		foreach ($query->result() as $row) {
			$collectionList[] = CollectionDTO::copy($row);
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