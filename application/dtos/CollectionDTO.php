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
	public $individual;
	public $place;
	public $transect;	
	public $graphic;
	
	public static function copy(Collection_model $collection, $graphic) {
		$dto = new CollectionDTO();
		$dto->setId($collection->getId());
		$dto->setImage($collection->getImage());
		$dto->setDate($collection->getDate());
		$dto->setRemark($collection->getRemark());
		$dto->setFlowerBud($collection->getFlowerBud());
		$dto->setAnthesis($collection->getAnthesis());
		$dto->setRipe($collection->getRipe());
		$dto->setUnripe($collection->getUnripe());
		$dto->setBudding($collection->getBudding());
		$dto->setFall($collection->getFall());
		$dto->setIndividual($collection->getIndividual()->getId());
		$dto->setSpecies($collection->getIndividual()->getSpecies()->getScientificName());
		$dto->setGenus($collection->getIndividual()->getSpecies()->getGenus()->getName());
		$dto->setFamily($collection->getIndividual()->getSpecies()->getGenus()->getFamily()->getName());
		$dto->setTransect($collection->getIndividual()->getTransect());
		$dto->setPlace($collection->getIndividual()->getPlace()->getName());
		
		if ($graphic != null) {
			$dto->setGraphic($graphic);
		}
		
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
	
	public function getIndividual() {
		return $this->individual;
	}
	
	public function setIndividual($individual) {
		$this->individual = $individual;
	}
	
	public function getGraphic() {
		return $this->graphic;
	}
	
	public function setGraphic($graphic) {
		$this->graphic = $graphic;
	}
	
	public function getPlace() {
		return $this->place;
	}
	
	public function setPlace($place) {
		$this->place = $place;
	}
	
	public function getTransect() {
		return $this->transect;
	}
	
	public function setTransect($transect) {
		$this->transect = $transect;
	}	
}

?>