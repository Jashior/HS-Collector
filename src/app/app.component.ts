import { Component } from '@angular/core';
import { CardService } from './card.service';
import { CardSet } from './model/CardSet.js';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

enum Rarity {
  Common,
  Rare,
  Epic,
  Legendary
}

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
  
  cardsUrl = "https://api.hearthstonejson.com/v1/latest/enUS/cards.json";
  collectionUrl = "api/v1/collection/?region=2&account_lo=15542146"; //https://hsreplay.net/

  constructor(cardService: CardService, http: HttpClient) {
    // this.cardSets = cardService.loadCollection();

    var collection = http.get(this.collectionUrl)
      .subscribe((collectionData) => {
        var cards = http.get<Array<any>>(this.cardsUrl)
          .subscribe(cardsData => {
            const collectibleCards = cardsData.filter(card => card.collectible)
            const myCards = JSON.parse(
              JSON.stringify(collectionData))
          
            let sets = {}
           
            for (let card of collectibleCards){
              let setOfCard: string = card.set 
              let id: string = card.dbfId
              let quantity = 0;

              if (myCards.collection[id]){
                quantity = Math.min(2, myCards.collection[id][0] + myCards.collection[id][1])
              } 

              if ((sets as any)[setOfCard] == undefined){
                (sets as any)[setOfCard] = {
                    name: card.set,
                    commonTotal: 0,
                    commonCollected: 0,
                    rareTotal: 0,
                    rareCollected: 0,
                    epicTotal: 0,
                    epicCollected: 0,
                    legendaryTotal: 0,
                    legendaryCollected: 0,    
                    image: "", 
                    showDetails: false
                }
              }

                if (card.rarity == 'COMMON'){
                  (sets as any)[setOfCard].commonTotal += 2;
                  (sets as any)[setOfCard].commonCollected += quantity;
                }
                if (card.rarity == 'RARE'){
                  (sets as any)[setOfCard].rareTotal += 2;
                  (sets as any)[setOfCard].rareCollected += quantity;
                }
                if (card.rarity == 'EPIC'){
                  (sets as any)[setOfCard].epicTotal += 2;
                  (sets as any)[setOfCard].epicCollected += quantity;
                }
                if (card.rarity == 'LEGENDARY'){
                  (sets as any)[setOfCard].legendaryTotal += 1;
                  (sets as any)[setOfCard].legendaryCollected += Math.min(1, quantity);
                }
               
            }

            var finalSet: CardSet[] = []

            var blacklist = ['HERO_SKINS',]
            // var realNmes = {'YEAR_OF_THE_DRAGON': 'Year Of The Dragon'}
            for(let key in sets){

              if(blacklist.includes(key))
                continue;

              finalSet.push((sets as any)[key])
            }



            this.cardSets = finalSet;
          })
        })

    // this.cardSets = cardService.loadCollection();
  }

  ngOnInit() {
    // for (let cardSetName of this.cardSetNames){
    //   let randomCommonCollected = Math.floor(Math.random() * 90)
    //   let randomCommonTotal = Math.floor(Math.random() * 11) + 100
    //   let randomRareCollected = Math.floor(Math.random() * 40)
    //   let randomRareTotal = Math.floor(Math.random() * 11) + 50
    //   let randomEpicCollected = Math.floor(Math.random() * 15)
    //   let randomEpicTotal = Math.floor(Math.random() * 11) + 15
    //   let randomLegendaryCollected = Math.floor(Math.random() * 10)
    //   let randomLegendaryTotal = Math.floor(Math.random() * 11) + 10
    //   this.cardSets.push({...this.cardSetExample, name: cardSetName, commonCollected: randomCommonCollected, commonTotal: randomCommonTotal
    //   , rareCollected: randomRareCollected, rareTotal: randomRareTotal, epicCollected: randomEpicCollected, epicTotal: randomEpicTotal, legendaryCollected: randomLegendaryCollected, legendaryTotal: randomLegendaryTotal})
    // }
  }

  printSets(){
    console.log(this.cardSets)
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
    if (this.sortByString == 'common'){
      return (cardSet.commonCollected / cardSet.commonTotal)*100
    }
    if (this.sortByString == 'rare'){
      return (cardSet.rareCollected / cardSet.rareTotal)*100
    }
    if (this.sortByString == 'epic'){
      return (cardSet.epicCollected / cardSet.epicTotal)*100
    }
    if (this.sortByString == 'legendary'){
      return (cardSet.legendaryCollected / cardSet.legendaryTotal)*100
    }

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
