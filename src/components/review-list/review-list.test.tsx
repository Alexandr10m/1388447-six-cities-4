import * as React from "react";
import * as renderer from "react-test-renderer";
import {ReviewList} from "./review-list";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../reducer/user/user";
import {StatusOfReviewLoad} from "../../reducer/data/data";
import {Review} from "../../types";
import {noop} from "../../utils";


const mockStore = configureStore([]);
const reviews: Review[] = [{
  date: new Date(1),
  grade: 4,
  id: 1,
  text: `We loved it`,
  user: {
    avatarUrl: `https`,
    email: undefined,
    id: 18,
    isPro: true,
    name: `Sophie`,
  },
}];

describe(`Snapshot of ReviewList`, () => {
  it(`ReviewList should render correctly with Rewies form`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <ReviewList
              reviews={reviews}
              authorizationStatus={AuthorizationStatus.AUTH}
              onSendComment={noop}
              offerId={1}
              statusOfReviewLoad={StatusOfReviewLoad.NOT_IN_PROCESS}
              changeStatusOfReviewLoad={noop}
            />
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`ReviewList should render correctly without Rewies form`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <ReviewList
              reviews={reviews}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              onSendComment={noop}
              offerId={1}
              statusOfReviewLoad={StatusOfReviewLoad.NOT_IN_PROCESS}
              changeStatusOfReviewLoad={noop}
            />
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
