import * as React from "react";
import PropTypes from "prop-types";
import {SORTS} from "../../constants.js";
import {getOptionValue} from "../../utils.js";
import {ActionCreator} from "../../reducer/state/state.js";
import {connect} from "react-redux";
import {getSortType} from "../../reducer/state/selector.js";


const Sort = (props) => {
  const _handleSelectClick = (evt) => {
    if (evt.target.tagName !== `LI`) {
      return;
    }
    const {onSelectClick, onHideOptions} = props;
    onHideOptions();
    onSelectClick(evt.target.textContent);
  };

  const {sortType: currentSort, isShowOptions, onToggleViewOptions} = props;
  const openedClass = isShowOptions ? `places__options--opened` : ``;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span onClick={onToggleViewOptions} className="places__sorting-type" tabIndex="0">
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul onClick={_handleSelectClick} className={`places__options places__options--custom ${openedClass}`}>

        {SORTS.map((sort, i) => {
          const activeClass = sort === currentSort ? `places__option--active` : ``;
          return (
            <li key={`${sort}-${i}`} className={`places__option ${activeClass}`} tabIndex="0">{sort}</li>
          );
        })}

      </ul>
      <select className="places__sorting-type visually-hidden" id="places-sorting">

        {SORTS.map((sort, i) => {
          return (
            <option key={`${sort}-${i}`} className="places__option" value={getOptionValue(sort)}>{sort}</option>
          );
        })}

      </select>
    </form>
  );
};

Sort.propTypes = {
  sortType: PropTypes.string,
  isShowOptions: PropTypes.bool.isRequired,
  onSelectClick: PropTypes.func.isRequired,
  onHideOptions: PropTypes.func.isRequired,
  onToggleViewOptions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sortType: getSortType(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSelectClick(sortType) {
    dispatch(ActionCreator.changeSort(sortType));
  }
});


export {Sort};
export default connect(mapStateToProps, mapDispatchToProps)(Sort);
