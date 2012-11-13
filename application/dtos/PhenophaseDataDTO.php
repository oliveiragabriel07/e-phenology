<?php 
Class PhenophaseDataDTO {
	public $id;
	public $value;
	public $date;
	public $image;
	public $phenophase;	
	public $species;
	public $genus;
	public $family;
	public $individualId;
	
	public static function copy($result) {
		$dto = new PhenophaseDataDTO();
		$dto->setId($result->id);
		$dto->setValue($result->value);
		$dto->setDate($result->date);
		$dto->setImage($result->image);
		$dto->setPhenophase($result->phenophase);
		$dto->setSpecies($result->species);
		$dto->setGenus($result->genus);
		$dto->setFamily($result->family);
		$dto->setIndividualId($result->id_individual);
		return $dto;
	}
	
	public function getId() {
		return $this->id;
	}
	
	public function setId($id) {
		$this->id = $id;
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
	
	public function getPhenophase() {
		return $this->phenophase;
	}
	public function setPhenophase($phenophase) {
		$this->phenophase = $phenophase;
	}
	
	public function getSpecies() {
		return $this->species;
	}
	
	public function setSpecies($species) {
		$this->species = $species;
	}
	
	public function getGenus() {
		return $this->genus;
	}
	
	public function setGenus($genus) {
		$this->genus = $genus;
	}	
	
	public function getFamily() {
		return $this->family;
	}
	
	public function setFamily($family) {
		$this->family = $family;
	}
	
	public function getIndividualId() {
		return $this->individualId;
	}
	
	public function setIndividualId($individualId) {
		$this->individualId = $individualId;
	}
}

?>