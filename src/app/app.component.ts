import { Component } from '@angular/core';
import { CardSet } from './model/CardSet.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'hscollector';
  cardSets: CardSet[] = [];
  cardSetNames = ['Classic', 'The Barrens', 'Scholomance', 'Black Temple', 'Darkmoon Faire', 'Classic', 'The Barrens', 'Scholomance', 'Black Temple', 'Darkmoon Faire', 'Classic', 'The Barrens', 'Scholomance', 'Black Temple', 'Darkmoon Faire', 'Classic', 'The Barrens', 'Scholomance', 'Black Temple', 'Darkmoon Faire']
  sortByString: string = "";

  cardSetExample: CardSet = {
    name: 'Classic',
    commonTotal: 50,
    commonCollected: 33,
    rareTotal: 10,
    rareCollected: 10,
    epicTotal: 10,
    epicCollected: 5,
    legendaryTotal: 10,
    legendaryCollected: 3,
    image: 'hello',
    showDetails: false
  };

  ngOnInit() {
    for (let cardSetName of this.cardSetNames){
      let randomCommonCollected = Math.floor(Math.random() * 90)
      let randomCommonTotal = Math.floor(Math.random() * 11) + 100
      let randomRareCollected = Math.floor(Math.random() * 40)
      let randomRareTotal = Math.floor(Math.random() * 11) + 50
      let randomEpicCollected = Math.floor(Math.random() * 15)
      let randomEpicTotal = Math.floor(Math.random() * 11) + 15
      let randomLegendaryCollected = Math.floor(Math.random() * 10)
      let randomLegendaryTotal = Math.floor(Math.random() * 11) + 10
      this.cardSets.push({...this.cardSetExample, name: cardSetName, commonCollected: randomCommonCollected, commonTotal: randomCommonTotal
      , rareCollected: randomRareCollected, rareTotal: randomRareTotal, epicCollected: randomEpicCollected, epicTotal: randomEpicTotal, legendaryCollected: randomLegendaryCollected, legendaryTotal: randomLegendaryTotal})
    }
  }


  getTotalCollectedCards(){
    let total = 0;
    for(let cardSet of this.cardSets){
      total += cardSet.commonCollected + cardSet.rareCollected + cardSet.epicCollected + cardSet.legendaryCollected
    }
    return total;
  }

  getTotalCards(){
    let total = 0;
    for(let cardSet of this.cardSets){
      total += cardSet.commonTotal + cardSet.rareTotal+ cardSet.epicTotal + cardSet.legendaryTotal
    }
    return total;
  }

  getPercentCollectedTotal(){
    return (this.getTotalCollectedCards() / this.getTotalCards())*100
  }

  getTotalCollectedCommon(){
    let total = 0;
    for(let cardSet of this.cardSets){
      total += cardSet.commonCollected 
    }
    return total;
  }

  getTotalCommon(){  
    let total = 0;
    for(let cardSet of this.cardSets){
      total += cardSet.commonTotal
    }
    return total;
  }

  getPercentCollectedTotalCommon(){
    return (this.getTotalCollectedCommon() / this.getTotalCommon())*100
  }

  getTotalCollectedRare(){
    let total = 0;
    for(let cardSet of this.cardSets){
      total += cardSet.rareCollected 
    }
    return total;
  }

  getTotalRare(){  
    let total = 0;
    for(let cardSet of this.cardSets){
      total += cardSet.rareTotal
    }
    return total;
  }

  getPercentCollectedTotalRare(){
    return (this.getTotalCollectedRare() / this.getTotalRare())*100
  }

  getTotalCollectedEpic(){
    let total = 0;
    for(let cardSet of this.cardSets){
      total += cardSet.epicCollected 
    }
    return total;
  }

  getTotalEpic(){  
    let total = 0;
    for(let cardSet of this.cardSets){
      total += cardSet.epicTotal
    }
    return total;
  }

  getPercentCollectedTotalEpic(){
    return (this.getTotalCollectedEpic() / this.getTotalEpic())*100
  }

  getTotalCollectedLegendary(){
    let total = 0;
    for(let cardSet of this.cardSets){
      total += cardSet.legendaryCollected 
    }
    return total;
  }

  getTotalLegendary(){  
    let total = 0;
    for(let cardSet of this.cardSets){
      total += cardSet.legendaryTotal
    }
    return total;
  }

  getPercentCollectedTotalLegendary(){
    return (this.getTotalCollectedLegendary() / this.getTotalLegendary())*100
  }


  getTotalCardsOfCardSet(cardSet: CardSet){
    return cardSet.commonTotal + cardSet.rareTotal + cardSet.epicTotal + cardSet.legendaryTotal
  } 

  getTotalCollectedOfCardSet(cardSet: CardSet){
    return cardSet.commonCollected + cardSet.rareCollected + cardSet.epicCollected + cardSet.legendaryCollected
  }

  getPercentCollected(cardSet: CardSet){
    return (this.getTotalCollectedOfCardSet(cardSet) / this.getTotalCardsOfCardSet(cardSet))*100
  }

  toggleShowDetails(cardSet: CardSet){
    cardSet.showDetails = !cardSet.showDetails;
  }

  sortBy(sortType: string){
    if (this.sortByString == sortType){
      this.sortByString = '';
    } else {
      this.sortByString = sortType;
    }

    function compareDefault(a: any, b: any){
      // Default Sort Here
    }

    function compareCommon(a: any,b: any){
      if((a.commonCollected / a.commonTotal) > (b.commonCollected / b.commonTotal)){
        return -1;
      }
      if((a.commonCollected / a.commonTotal) < (b.commonCollected / b.commonTotal)){
        return 1;
      }
      return 0
    }

    function compareRare(a: any,b: any){
      if((a.rareCollected / a.rareTotal) > (b.rareCollected / b.rareTotal)){
        return -1;
      }
      if((a.rareCollected / a.rareTotal) < (b.rareCollected / b.rareTotal)){
        return 1;
      }
      return 0
    }

    function compareEpic(a: any,b: any){
      if((a.epicCollected / a.epicTotal) > (b.epicCollected / b.epicTotal)){
        return -1;
      }
      if((a.epicCollected / a.epicTotal) < (b.epicCollected / b.epicTotal)){
        return 1;
      }
      return 0
    }
    function compareLegendary(a: any,b: any){
      if((a.legendaryCollected / a.legendaryTotal) > (b.legendaryCollected / b.legendaryTotal)){
        return -1;
      }
      if((a.legendaryCollected / a.legendaryTotal) < (b.legendaryCollected / b.legendaryTotal)){
        return 1;
      }
      return 0
    }
    function compareTotal(a: any,b: any){
      if(((a.commonCollected+a.rareCollected+a.epicCollected+a.legendaryCollected) / (a.commonTotal+a.rareTotal+a.epicTotal+a.legendaryTotal)) > ((b.commonCollected+b.rareCollected+b.epicCollected+b.legendaryCollected) / (b.commonTotal+b.rareTotal+b.epicTotal+b.legendaryTotal))){
        return -1;
      }
      if(((a.commonCollected+a.rareCollected+a.epicCollected+a.legendaryCollected) / (a.commonTotal+a.rareTotal+a.epicTotal+a.legendaryTotal)) < ((b.commonCollected+b.rareCollected+b.epicCollected+b.legendaryCollected) / (b.commonTotal+b.rareTotal+b.epicTotal+b.legendaryTotal))){
        return 1;
      }
      return 0
    }
    function defaultCompare(a: any, b:any){
      if((a.name) < (b.name)){
        return -1;
      }
      if((a.name) > (b.name)){
        return 1;
      }
      return 0
    }


 // Figure out which type of sort to use 
    if (this.sortByString == 'common'){
      this.cardSets.sort(compareCommon)
      return;
    }
    if (this.sortByString == 'rare'){
      this.cardSets.sort(compareRare)
      return;
    }
    if (this.sortByString == 'epic'){
      this.cardSets.sort(compareEpic)
      return;
    }
    if (this.sortByString == 'legendary'){
      this.cardSets.sort(compareLegendary)
      return;
    }
    if (this.sortByString == 'total'){
      this.cardSets.sort(compareTotal);
      return;
    }
    if (this.sortByString ==""){
      this.cardSets.sort(defaultCompare)
      return;
    }

   
 
  }
}
