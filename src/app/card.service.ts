import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CardSet } from './model/CardSet.js';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  cardsUrl = "https://api.hearthstonejson.com/v1/latest/enUS/cards.json";
  collectionUrl = "api/v1/collection/?region=2&account_lo=15542146"; //https://hsreplay.net/
  finalSet: CardSet[] = []
  constructor(private http: HttpClient) { }

  loadCollection() {
    var collection = this.http.get(this.collectionUrl)
      .subscribe((collectionData) => {
        var cards = this.http.get<Array<any>>(this.cardsUrl)
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

            // finalSet: CardSet[] = []

            for(let key in sets){
              this.finalSet.push((sets as any)[key])
            }

            return this.finalSet;
          })
        })
    }
}