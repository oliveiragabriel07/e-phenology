<?php
Class Place_model extends Abstract_model {
	
	public static $tableName = 't_place';
	
	public static $map = array(
		"id" => "id_place",
		"name" => "name"
	);
	
	private $name;
	
	public static function getColumn($field) {
		return Place_model::$map[$field];
	}
	
	public static function getMap($field) {
		return Place_model::$tableName . "." . Place_model::$map[$field];
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
		$this->setId($result->{Place_model::getColumn("id")});
		$this->setName($result->{Place_model::getColumn("name")});
		return $this;
	}
	
	/**
	 * (non-PHPdoc)
	 * @see Abstract_model::getTableName()
	 */
	protected function getTableName() {
		return Place_model::$tableName;
	}	
}
?>