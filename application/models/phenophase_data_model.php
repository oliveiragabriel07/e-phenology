<?php
require_once 'application/models/abstract_model.php';
require_once 'application/dtos/PhenophaseDataDTO.php';

Class Phenophase_data_model extends Abstract_model {

	const TABLE_NAME = 't_phenophase_data';

	private $phenophaseId;
	private $individualId;
	private $value;
	private $date;
	private $image;

	/**
	 * @return the $phenophaseId
	 */
	public function getPhenophaseId() {
		return $this->phenophaseId;
	}

	/**
	 * @param field_type $phenophaseId
	 */
	public function setPhenophaseId($phenophaseId) {
		$this->phenophaseId = $phenophaseId;
	}

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
	 * (non-PHPdoc)
	 * @see Abstract_model::parseQueryResult()
	 */
	protected function parseQueryResult($result) {
		$this->setId($result->id);
		$this->setPhenophaseId($result->id_phenophase);
		$this->setIndividualId($result->id_individual);
		$this->setValue($result->value);
		$this->setDate($result->date);
		$this->setImage($result->image);
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

	private function copyPhenophaseData($result) {
		$phenDTO = new PhenophaseDataDTO();
		$phenDTO->setId($result->id);
		$phenDTO->setPhenophaseId($result->id_phenophase);
		$phenDTO->setIndividualId($result->id_individual);
		$phenDTO->setValue($result->value);
		$phenDTO->setDate($result->date);
		$phenDTO->setImage($result->image);
		return $phenDTO;
	}
	
// 	public function getList($limit, $start, $sort, $dir) {
// 		$this->db->from($this->getTableName());
// 		$this->db->order_by($sort, $dir);
// 		$this->db->limit($limit, $start);
		
// 		$phenophaseDataList = array();
// 		$query = $this->db->get();
		
// 		foreach ($query->result() as $row) {
// 			$phenophaseData = $this->copyPhenophaseData($row);
// 			$phenophaseDataList[] = $phenophaseData;
// 		}
		
// 		return $phenophaseDataList;		
// 	}
	
	public function getListWithIndividual($limit, $start, $sort, $dir) {
		$table = $this->getTableName();
	
		$this->db->select("
				data.id,
				data.date,
				data.value,
				data.image,
				i.id as id_individual,
				p.name as phenophase,
				s.scientific_name as species,
				g.name as genus,
				f.name as family");
		$this->db->from("$table as data");
		$this->db->join('t_phenophase as p', 'data.id_phenophase = p.id');
		$this->db->join('t_individual as i', 'data.id_individual = i.id');
		$this->db->join('t_species as s', 'i.id_species = s.id');
		$this->db->join('t_genus as g', 's.id_genus = g.id');
		$this->db->join('t_family as f', 'g.id_family = f.id');
		$this->db->order_by($sort, $dir);
		$this->db->limit($limit, $start);
	
		$phenophaseDataList = array();
		$query = $this->db->get();
	
		foreach ($query->result() as $row) {
			$phenophaseDataList[] = PhenophaseDataDTO::copy($row);
		}
	
		return $phenophaseDataList;
	}
}

?>