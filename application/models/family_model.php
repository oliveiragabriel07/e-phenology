<?php
Class Family_model extends Abstract_model {
	
	public static $tableName = 't_family';
	
	public static $map = array(
		"id" => "id_family",
		"name" => "family_name"
	);
	
	private $name;
	
	public static function getColumn($field) {
		return Family_model::$map[$field];
	}
	
	public static function getMap($field) {
		return Family_model::$tableName . "." . Family_model::$map[$field];
	}
	
	public function getName() {
		return $this->name;
	}
	
	public function setName($name) {
		$this->name = $name;
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
		$this->setId($result->{Family_model::getColumn("id")});
		$this->setName($result->{Family_model::getColumn("name")});
		return $this;
	}
	
	/**
	 * (non-PHPdoc)
	 * @see Abstract_model::getTableName()
	 */
	protected function getTableName() {
		return Family_model::$tableName;
	}	
}
?>