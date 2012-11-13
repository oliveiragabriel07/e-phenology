<?php 
Class UserDTO {
	public $id;
	
	public $name;
	
	public $username;
	
	public $status;
	
	function getId() {
		return $this->id;
	}
	
	function setId($id) {
		$this->id = $id;
	}
	
	function getName() {
		return $this->name;
	}
	
	function setName($name) {
		$this->name = $name;
	}
	
	function getUserName() {
		return $this->username;
	}
	
	function setUserName($username) {
		$this->username = $username;
	}	
	
	function getStatus() {
		return $this->status;
	}
	
	function setStatus($status) {
		$this->status = $status;
	}
}

?>