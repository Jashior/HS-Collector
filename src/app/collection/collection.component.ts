import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { CardSet } from '../model/CardSet.js';
import { Rarity } from '../model/Rarity';
import { compareCommon, compareRare, compareEpic, compareLegendary, compareTotal, releaseDate } from '../comparators/SortByComparator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  title: string;
  cardSets: CardSet[] = [];
  sortByString: string;
  rarity = Rarity;
  link: string;

  constructor(private route: ActivatedRoute, private cardService: CardService) {
    this.title = 'hscollector';
    this.sortByString = 'release';
    this.link = "";

    this.route.params.subscribe(params => {
      this.link = params['link'];
    })

    cardService.getData(this.link).subscribe(results => {
      var collection = results[0];
      var cards = results[1];
      this.cardSets = cardService.getCardSetsFromData(cards, collection);
      this.sortBy(this.sortByString);
    })
  }

  ngOnInit() { }

  getTotalCollectedCards() {
    let total = 0;
    for (let cardSet of this.cardSets) {
      total += cardSet.commonCollected + cardSet.rareCollected + cardSet.epicCollected + cardSet.legendaryCollected
    }
    return total;
  }

  getTotalCards() {
    let total = 0;
    for (let cardSet of this.cardSets) {
      total += cardSet.commonTotal + cardSet.rareTotal + cardSet.epicTotal + cardSet.legendaryTotal
    }
    return total;
  }

  getPercentCollectedTotal() {
    return (this.getTotalCollectedCards() / this.getTotalCards()) * 100
  }

  getTotalCollectedCommon() {
    let total = 0;
    for (let cardSet of this.cardSets) {
      total += cardSet.commonCollected
    }
    return total;
  }

  getTotalCommon() {
    let total = 0;
    for (let cardSet of this.cardSets) {
      total += cardSet.commonTotal
    }
    return total;
  }

  getPercentCollectedTotalCommon() {
    return (this.getTotalCollectedCommon() / this.getTotalCommon()) * 100
  }

  getTotalCollectedRare() {
    let total = 0;
    for (let cardSet of this.cardSets) {
      total += cardSet.rareCollected
    }
    return total;
  }

  getTotalRare() {
    let total = 0;
    for (let cardSet of this.cardSets) {
      total += cardSet.rareTotal
    }
    return total;
  }

  getPercentCollectedTotalRare() {
    return (this.getTotalCollectedRare() / this.getTotalRare()) * 100
  }

  getTotalCollectedEpic() {
    let total = 0;
    for (let cardSet of this.cardSets) {
      total += cardSet.epicCollected
    }
    return total;
  }

  getTotalEpic() {
    let total = 0;
    for (let cardSet of this.cardSets) {
      total += cardSet.epicTotal
    }
    return total;
  }

  getPercentCollectedTotalEpic() {
    return (this.getTotalCollectedEpic() / this.getTotalEpic()) * 100
  }

  getTotalCollectedLegendary() {
    let total = 0;
    for (let cardSet of this.cardSets) {
      total += cardSet.legendaryCollected
    }
    return total;
  }

  getTotalLegendary() {
    let total = 0;
    for (let cardSet of this.cardSets) {
      total += cardSet.legendaryTotal
    }
    return total;
  }

  getPercentCollectedTotalLegendary() {
    return (this.getTotalCollectedLegendary() / this.getTotalLegendary()) * 100
  }

  getTotalCardsOfCardSet(cardSet: CardSet) {
    return cardSet.commonTotal + cardSet.rareTotal + cardSet.epicTotal + cardSet.legendaryTotal
  }

  getTotalCollectedOfCardSet(cardSet: CardSet) {
    return cardSet.commonCollected + cardSet.rareCollected + cardSet.epicCollected + cardSet.legendaryCollected
  }

  getPercentCollected(cardSet: CardSet) {
    if (this.sortByString == Rarity.COMMON) {
      return (cardSet.commonCollected / cardSet.commonTotal) * 100
    }
    if (this.sortByString == Rarity.RARE) {
      return (cardSet.rareCollected / cardSet.rareTotal) * 100
    }
    if (this.sortByString == Rarity.EPIC) {
      return (cardSet.epicCollected / cardSet.epicTotal) * 100
    }
    if (this.sortByString == Rarity.LEGENDARY) {
      return (cardSet.legendaryCollected / cardSet.legendaryTotal) * 100
    }

    return (this.getTotalCollectedOfCardSet(cardSet) / this.getTotalCardsOfCardSet(cardSet)) * 100
  }

  toggleShowDetails(cardSet: CardSet) {
    cardSet.showDetails = !cardSet.showDetails;
  }

  sortBy(sortType: string) {
    if (this.sortByString == sortType) {
      this.sortByString = 'release';
    } else {
      this.sortByString = sortType;
    }
    // Figure out which type of sort to use 
    if (this.sortByString == Rarity.COMMON) {
      this.cardSets.sort(compareCommon)
      return;
    }
    if (this.sortByString == Rarity.RARE) {
      this.cardSets.sort(compareRare)
      return;
    }
    if (this.sortByString == Rarity.EPIC) {
      this.cardSets.sort(compareEpic)
      return;
    }
    if (this.sortByString == Rarity.LEGENDARY) {
      this.cardSets.sort(compareLegendary)
      return;
    }
    if (this.sortByString == 'total') {
      this.cardSets.sort(compareTotal);
      return;
    }
    if (this.sortByString == "release") {
      this.cardSets.sort(releaseDate)
      return;
    }
  }
}
