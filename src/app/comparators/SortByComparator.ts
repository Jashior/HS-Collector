import { releaseMap } from '../model/SetNameMapper';

export function releaseDate(a: any, b: any) {
    if (releaseMap[a.name] > releaseMap[b.name]) {
        return -1;
    }
    if (releaseMap[a.name] < releaseMap[b.name]) {
        return 1;
    }
    return 0;
}

export function compareCommon(a: any, b: any) {
    if ((a.commonCollected / a.commonTotal) > (b.commonCollected / b.commonTotal)) {
        return -1;
    }
    if ((a.commonCollected / a.commonTotal) < (b.commonCollected / b.commonTotal)) {
        return 1;
    }
    return 0
}

export function compareRare(a: any, b: any) {
    if ((a.rareCollected / a.rareTotal) > (b.rareCollected / b.rareTotal)) {
        return -1;
    }
    if ((a.rareCollected / a.rareTotal) < (b.rareCollected / b.rareTotal)) {
        return 1;
    }
    return 0
}

export function compareEpic(a: any, b: any) {
    if ((a.epicCollected / a.epicTotal) > (b.epicCollected / b.epicTotal)) {
        return -1;
    }
    if ((a.epicCollected / a.epicTotal) < (b.epicCollected / b.epicTotal)) {
        return 1;
    }
    return 0
}

export function compareLegendary(a: any, b: any) {
    if ((a.legendaryCollected / a.legendaryTotal) > (b.legendaryCollected / b.legendaryTotal)) {
        return -1;
    }
    if ((a.legendaryCollected / a.legendaryTotal) < (b.legendaryCollected / b.legendaryTotal)) {
        return 1;
    }
    return 0
}

export function compareTotal(a: any, b: any) {
    if (((a.commonCollected + a.rareCollected + a.epicCollected + a.legendaryCollected) / (a.commonTotal + a.rareTotal + a.epicTotal + a.legendaryTotal)) > ((b.commonCollected + b.rareCollected + b.epicCollected + b.legendaryCollected) / (b.commonTotal + b.rareTotal + b.epicTotal + b.legendaryTotal))) {
        return -1;
    }
    if (((a.commonCollected + a.rareCollected + a.epicCollected + a.legendaryCollected) / (a.commonTotal + a.rareTotal + a.epicTotal + a.legendaryTotal)) < ((b.commonCollected + b.rareCollected + b.epicCollected + b.legendaryCollected) / (b.commonTotal + b.rareTotal + b.epicTotal + b.legendaryTotal))) {
        return 1;
    }
    return 0
}

export function release(a: any, b: any) {
    if ((a.name) < (b.name)) {
        return -1;
    }
    if ((a.name) > (b.name)) {
        return 1;
    }
    return 0
}