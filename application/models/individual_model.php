<?php
require_once 'application/models/abstract_model.php';

Class Individual_model extends Abstract_model {
	
	public static $tableName = 't_individual';
	
	public static $map = array(
		"id" => "id_individual",
		"species" => "id_species",
		"place" => "id_place",
		"transect" => "transect"			
	);
	
	private $species;
	
	private $place;
	
	private $transect;
	
	public static function getColumn($field) {
		return Individual_model::$map[$field];
	}
	
	public static function getMap($field) {
		return Individual_model::$tableName . "." . Individual_model::$map[$field];
	}

	public function getSpecies() {
		return $this->species;
	}
	
	public function setSpecies($species) {
		$this->species = $species;
	}
	
	/**
	 * @return the place
	 */
	public function getPlace() {
		return $this->place;
	}
	
	/**
	 * @param field_type place
	 */
	public function setPlace($place) {
		$this->place = $place;
	}
	
	/**
	 * @return the transect
	 */
	public function getTransect() {
		return $this->transect;
	}
	
	/**
	 * @param field_type transect
	 */
	public function setTransect($transect) {
		$this->transect = $transect;
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
		$this->setId($result->{Individual_model::getColumn("id")});
		$this->setTransect($result->{Individual_model::getColumn("transect")});
		return $this;
	}
	
	/**
	 * (non-PHPdoc)
	 * @see Abstract_model::getTableName()
	 */
	protected function getTableName() {
		return Individual_model::$tableName;
	}	
}