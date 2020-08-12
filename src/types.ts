export interface LocalOffer {
  isPremium: boolean;
  pictures: string[];
  price: number;
  isFavourite: boolean;
  grade: number;
  title: string;
  type: string;
  bedroom: number;
  maxAdults: number;
  facilities: string[];
  coords: number[];
  locationZoom: number;
  id: number;
  description: string;
  previewImage: string;
  host: Host;
}

export interface CityOffers {
  city: string;
  cityCoords: number[];
  cityZoom: number;
  localOffers: LocalOffer[] | [];
}

export interface Host {
  id: number;
  name: string;
  isPro: boolean;
  avatarUrl: string;
}

export interface author {
  avatarUrl: string;
  email: string;
  id: number;
  isPro: boolean;
  name: string;
}

export interface Review {
  text: string;
  date: InstanceType<typeof Date>;
  id: number;
  grade: number;
  user: author;
}
