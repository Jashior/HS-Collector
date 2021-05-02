import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardSet, emptyCardSet } from '../model/CardSet';
import { Rarity } from '../model/Rarity';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cardsUrl = "https://api.hearthstonejson.com/v1/latest/enUS/cards.json";
  collectionUrl = "api/v1/collection/?region=2&account_lo=15542146"; //https://hsreplay.net/

  constructor(private http: HttpClient) { }

  getAllCards() {
    return this.http.get<Array<any>>(this.cardsUrl);
  }

  getCollection() {
    return this.http.get(this.collectionUrl);
  }

  getData() {
    return forkJoin([this.getAllCards(), this.getCollection()])
  }

  getCardSetsFromData(collection: any, cards: Array<any>) {
    const collectibleCards = cards.filter(card => card.collectible)
    const myCards = JSON.parse(JSON.stringify(collection))
    let results = {}

    for (let card of collectibleCards) {
      let setOfCard: string = card.set
      let id: string = card.dbfId
      let quantity = 0;

      if (myCards.collection[id]) {
        quantity = Math.min(2, myCards.collection[id][0] + myCards.collection[id][1])
      }

      if ((results as any)[setOfCard] == undefined) {
        var newCardSet = emptyCardSet();
        newCardSet.name = card.set;
        (results as any)[setOfCard] = newCardSet;
      }

      if (card.rarity == Rarity.COMMON) {
        (results as any)[setOfCard].commonTotal += 2;
        (results as any)[setOfCard].commonCollected += quantity;
      }
      if (card.rarity == Rarity.RARE) {
        (results as any)[setOfCard].rareTotal += 2;
        (results as any)[setOfCard].rareCollected += quantity;
      }
      if (card.rarity == Rarity.EPIC) {
        (results as any)[setOfCard].epicTotal += 2;
        (results as any)[setOfCard].epicCollected += quantity;
      }
      if (card.rarity == Rarity.LEGENDARY) {
        (results as any)[setOfCard].legendaryTotal += 1;
        (results as any)[setOfCard].legendaryCollected += Math.min(1, quantity);
      }
    }

    var skip = ['HERO_SKINS', 'EXPERT1', 'CORE']

    var finalSet: CardSet[] = []
    for (let key in results) {
      if (skip.includes(key))
        continue;

      finalSet.push((results as any)[key])
    }
    return finalSet;
  }
}