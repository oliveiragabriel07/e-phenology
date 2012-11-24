<?php
require_once 'application/models/abstract_model.php';

Class Individual_model extends Abstract_model {
	
	public static $tableName = 't_individual';
	
	public static $map = array(
		"id" => "id_individual",
		"species" => "id_species"
	);
	
	private $species;
	
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