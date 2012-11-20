<?php
require_once 'application/models/abstract_model.php';

Class Species_model extends Abstract_model {
	
	public static $tableName = 't_species';
	
	public static $map= array(
		"id" => "id_species",
		"scientificName" => "scientific_name",
		"genus" => "id_genus"
	);
	
	private $scientificName;
	private $genus;
	
	public static function getColumn($field) {
		return Species_model::$map[$field];
	}
	
	public static function getMap($field) {
		return Species_model::$tableName . "." . Species_model::$map[$field];
	}
	
	
	public function getScientificName() {
		return $this->scientificName;
	}
	
	public function setScientificName($scientificName) {
		$this->scientificName = $scientificName;
	}
	
	public function getGenus() {
		return $this->genus;
	}
	
	public function setGenus($genus) {
		$this->genus = $genus;
	}	
	
	/**
	 * (non-PHPdoc)
	 * @see Abstract_model::getObjectAsArray()
	 */
	public function getObjectAsArray() {
		return get_object_vars($this);
	}	
	
	/**
	 * (non-PHPdoc)
	 * @see Abstract_model::parseQueryResult()
	 */
	protected function parseQueryResult($result) {
		$this->setId($result->{Species_model::getColumn("id")});
		$this->setScientificName($result->{Species_model::getColumn("scientificName")});
		return $this;
	}
	
	/**
	 * (non-PHPdoc)
	 * @see Abstract_model::getTableName()
	 */
	protected function getTableName() {
		return Species_model::$tableName;
	}	
}