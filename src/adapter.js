const cityAdapter = (data) => {
  return {
    city: data[`city`][`name`],
    cityCoords: [data[`city`][`location`][`latitude`], data[`city`][`location`][`longitude`]],
    cityZoom: data[`city`][`location`][`zoom`],
    localOffers: [],
  };
};

const localOffersAdapter = (data) => {
  return {
    isPremium: data[`is_premium`],
    pictures: data[`images`],
    price: data[`price`],
    isFavourite: data[`is_favorite`],
    grade: data[`rating`],
    title: data[`title`],
    type: data[`type`],
    bedroom: data[`bedrooms`],
    maxAdults: data[`max_adults`],
    facilities: data[`goods`],
    coords: [data[`location`][`latitude`], data[`location`][`longitude`]],
    locationZoom: data[`location`][`zoom`],
    id: data[`id`],
    description: data[`description`],
    previewImage: data[`preview_image`],
    reviews: [{
      image: `img/avatar-max.jpg`,
      text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
      name: `Max`,
      time: `April 2019`,
    }],
    host: {
      id: data[`host`][`id`],
      name: data[`host`][`name`],
      isPro: data[`host`][`is_pro`],
      avatarUrl: data[`host`][`avatar_url`],
    },
  };
};

const authInfoAdapter = (authData) => ({
  avatarUrl: authData[`avatar_url`],
  email: authData[`email`],
  id: authData[`id`],
  isPro: authData[`is_pro`],
  name: authData[`name`],
});

const reviewAdapter = (review) => ({
  text: review[`comment`],
  date: new Date(review[`date`]),
  id: review[`id`],
  grade: review[`rating`],
  user: authInfoAdapter(review[`user`]),
});

export {cityAdapter, localOffersAdapter, authInfoAdapter, reviewAdapter};
