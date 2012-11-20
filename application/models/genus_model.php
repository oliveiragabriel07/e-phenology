<?php
require_once 'application/models/abstract_model.php';

Class Genus_model extends Abstract_model {
	
	public static $tableName = 't_genus';
	
	public static $map = array(
		"id" => "id_genus",
		"name" => "genus_name",
		"family" => "id_family"
	);
	
	private $name;
	private $family;
	
	public static function getColumn($field) {
		return Genus_model::$map[$field];
	}
	
	public static function getMap($field) {
		return Genus_model::$tableName . "." . Genus_model::$map[$field];
	}
	
	
	public function getName() {
		return $this->name;
	}
	
	public function setName($name) {
		$this->name = $name;
	}
	
	public function getFamily() {
		return $this->family;
	}
	
	public function setFamily($family) {
		$this->family = $family;
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
		$this->setId($result->{Genus_model::getColumn("id")});
		$this->setName($result->{Genus_model::getColumn("name")});
		return $this;
	}
	
	/**
	 * (non-PHPdoc)
	 * @see Abstract_model::getTableName()
	 */
	protected function getTableName() {
		return Genus_model::$tableName;
	}	
}