export interface CardSet {
    name: string;
    commonTotal: number;
    commonCollected: number;
    rareTotal: number;
    rareCollected: number;
    epicTotal: number;
    epicCollected: number;
    legendaryTotal: number;
    legendaryCollected: number;
    image: string;
    showDetails: boolean;
}

export function emptyCardSet(): CardSet {
    return {
        name: "Unknown",
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