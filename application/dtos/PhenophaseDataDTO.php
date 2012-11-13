<?php 
Class PhenophaseDataDTO {
	public $id;
	public $phenophaseId;
	public $individualId;
	public $value;
	public $date;
	public $image;
	
	public function getId() {
		return $this->id;
	}
	
	public function setId($id) {
		$this->id = $id;
	}

	public function getPhenophaseId() {
		return $this->phenophaseId;
	}

	public function setPhenophaseId($phenophaseId) {
		$this->phenophaseId = $phenophaseId;
	}

	public function getIndividualId() {
		return $this->individualId;
	}

	public function setIndividualId($individualId) {
		$this->individualId = $individualId;
	}

	public function getValue() {
		return $this->value;
	}

	public function setValue($value) {
		$this->value= $value;
	}

	public function getDate() {
		return $this->date;
	}

	public function setDate($date) {
		$this->date = $date;
	}
	
	public function getImage() {
		return $this->image;
	}
	
	public function setImage($image) {
		$this->image = $image;
	}	
}

?>