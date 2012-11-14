<?php 
Class CollectionDTO {
	public $id;
	public $date;
	public $image;
	public $remark;
	public $flowerBud;
	public $anthesis;
	public $ripe;
	public $unripe;
	public $budding;
	public $fall;	
	public $species;
	public $genus;
	public $family;
	public $individualId;
	
	public static function copy($result) {
		$dto = new CollectionDTO();
		$dto->setId($result->id);
		$dto->setDate($result->date);
		$dto->setImage($result->image);
		$dto->setRemark($result->remark);
		$dto->setFlowerBud($result->flower_bud);
		$dto->setAnthesis($result->anthesis);
		$dto->setRipe($result->ripe);
		$dto->setUnripe($result->unripe);
		$dto->setBudding($result->budding);
		$dto->setFall($result->fall);		
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
	
	public function getRemark() {
		return $this->remark;
	}
	
	public function setRemark($remark) {
		$this->remark = $remark;
	}
	
	public function getFlowerBud() {
		return $this->flowerBud;
	}
	
	public function setFlowerBud($flowerBud) {
		$this->flowerBud = $flowerBud;
	}
	
	public function getAnthesis() {
		return $this->anthesis;
	}
	
	public function setAnthesis($anthesis) {
		$this->anthesis = $anthesis;
	}
	
	public function getRipe() {
		return $this->ripe;
	}
	
	public function setRipe($ripe) {
		$this->ripe= $ripe;
	}
	
	public function getUnripe() {
		return $this->unripe;
	}
	
	public function setUnripe($unripe) {
		$this->unripe= $unripe;
	}

	public function getBudding() {
		return $this->budding;
	}
	
	public function setBudding($budding) {
		$this->budding = $budding;
	}
	
	public function getFall() {
		return $this->fall;
	}
	
	public function setFall($fall) {
		$this->fall = $fall;
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