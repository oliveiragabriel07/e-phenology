<?php 
Class GraphicDTO {
	public $flowerBudList;
	public $anthesisList;
	public $ripeList;
	public $unripeList;
	public $buddingList;
	public $fallList;
	
	public function getFlowerBudList() {
		return $this->flowerBudList;
	}
	
	public function setFlowerBudList($flowerBudList) {
		$this->flowerBudList = $flowerBudList;
	}

	public function getAnthesisList() {
		return $this->anthesisList;
	}
	
	public function setAnthesisList($anthesisList) {
		$this->anthesisList = $anthesisList;
	}

	public function getRipeList() {
		return $this->ripeList;
	}
	
	public function setRipeList($ripeList) {
		$this->ripeList = $ripeList;
	}

	public function getUnripeList() {
		return $this->unripeList;
	}
	
	public function setUnripeList($unripeList) {
		$this->unripeList = $unripeList;
	}

	public function getBuddingList() {
		return $this->buddingList;
	}
	
	public function setBuddingList($buddingList) {
		$this->buddingList = $buddingList;
	}

	public function getFallList() {
		return $this->fallList;
	}
	
	public function setFallList($fallList) {
		$this->fallList = $fallList;
	}	
}

?>