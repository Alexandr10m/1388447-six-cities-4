import * as React from "react";
import * as renderer from "react-test-renderer";
import {FavouriteLocationItem} from "./favourite-location-item";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";
import {BrowserRouter} from "react-router-dom";
import {LocalOffer} from "../../types";
import {noop} from "../../utils";


const offerWithPremium: LocalOffer = {
  bedroom: 2,
  coords: [48.865610000000004, 2.350499],
  description: `in city center.`,
  facilities: [`Air conditioning`, `Breakfast`],
  grade: 3.6,
  host: {
    avatarUrl: `img/avatar-angelina.jpg`,
    id: 25,
    isPro: true,
    name: `Angelina`,
  },
  id: 1,
  isFavourite: false,
  isPremium: true,
  locationZoom: 16,
  maxAdults: 8,
  pictures: [`https://`, `https`],
  previewImage: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`,
  price: 397,
  title: `Penthouse`,
  type: `hotel`,
};
const mockStore = configureStore([]);

describe(`Snapshot of FavouriteLocationItem`, () => {
  it(`Shoul render correctly`, () => {
    const store = mockStore({
      [NameSpace.STATE]: {},
      [NameSpace.DATA]: {},
      [NameSpace.USER]: {},
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <FavouriteLocationItem
                offer={offerWithPremium}
                sendFavouriteOption={noop}
              />
            </BrowserRouter>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
