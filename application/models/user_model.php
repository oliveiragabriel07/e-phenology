<?php
include 'application/dtos/UserDTO.php';
require_once 'application/models/abstract_model.php';

Class User_model extends Abstract_model {

	const TABLE_NAME = 't_user';

	private $name;
	private $username;
	private $password;
	private $status;

	/**
	 * @return the $name
	 */
	public function getName() {
		return $this->name;
	}

	/**
	 * @param field_type $name
	 */
	public function setName($name) {
		$this->name = $name;
	}

	/**
	 * @return the $status
	 */
	public function getStatus() {
		return $this->status;
	}

	/**
	 * @param field_type $status
	 */
	public function setStatus($status) {
		$this->status = $status;
	}

	/**
	 * @return the $username
	 */
	public function getUsername() {
		return $this->username;
	}

	/**
	 * @param field_type $username
	 */
	public function setUsername($username) {
		$this->username = $username;
	}

	/**
	 * @return the $password
	 */
	public function getPassword() {
		return $this->password;
	}

	/**
	 * @param field_type $password
	 */
	public function setPassword($password) {
		$this->password = $password;
	}

	/**
	 * (non-PHPdoc)
	 * @see Abstract_model::parseQueryResult()
	 */
	protected function parseQueryResult($result) {
		$this->setId($result->id);
		$this->setName($result->name);
		$this->setUserName($result->username);
		$this->setPassword($result->password);
		$this->setStatus($result->status);
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

	function getById($id) {
		$this->db->where('id', $id);
		$this->db->from($this->getTableName());
		$query = $this->db->get();
		$user = $this->copyUserDetails($query->first_row());

		return $user;
	}

	function getSessionId() {
		if ($this->session->userdata('user_id')) {
			return $this->session->userdata('user_id');
		}

		return null;
	}

	function getUserDetails () {
		return $this->getById($this->getSessionId());
	}

	function validate($username, $password) {
		$this->db->where('username', $username);
		$this->db->where('password', MD5($password));

		$query = $this->db->get($this->getTableName());

		if ($query->num_rows() == 1) {
			$row = $query->first_row();
			$this->startSession($row);

			return true;
		}

		return false;
	}

	function isLogged() {
		if ($this->session->userdata('user_id')) {
			return true;
		}

		return false;
	}

	function startSession($row) {
		$this->session->set_userdata('user_id', $row->ID);
	}

	function endSession() {
		$this->session->unset_userdata('user_id');
		$this->session->sess_destroy();
	}

	function copyUserDetails($user) {
		$userDTO = new UserDTO();
		$userDTO->setId($user->ID);
		$userDTO->setName($user->NAME);
		$userDTO->setSurName($user->SURNAME);
		$userDTO->setDisplayName($user->DISPLAYNAME);
		$userDTO->setUserName($user->USERNAME);
		$userDTO->setStatus($user->STATUS);
		return $userDTO;
	}
}

?>