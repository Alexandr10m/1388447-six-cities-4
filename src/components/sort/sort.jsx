import React from "react";
import PropTypes from "prop-types";
import {SORTS} from "../../constants.js";
import {getOptionValue} from "../../utils.js";
import {ActionCreator} from "../../reducer.js";
import {connect} from "react-redux";


const optionTmpl = (type, index) => {
  return (
    <option key={`${type}-${index}`} className="places__option" value={getOptionValue(type)}>{type}</option>
  );
};

const liOptionTmpl = (type, currentType, index) => {
  const activeClass = type === currentType ? `places__option--active` : ``;

  return (
    <li key={`${type}-${index}`} className={`places__option ${activeClass}`} tabIndex="0">{type}</li>
  );
};

const Sort = (props) => {
  const {onSelectClick, sortType} = props;
  const openedClass = `places__options--opened`;

  const handlerSelectClick = (evt) => {
    if (evt.target.tagName !== `LI`) {
      return;
    }
    onSelectClick(evt.target.textContent);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0">
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul onClick={handlerSelectClick} className={`places__options places__options--custom ${openedClass}`}>
        {SORTS.map((it, i) => liOptionTmpl(it, sortType, i))}
      </ul>
      <select className="places__sorting-type" id="places-sorting">
        {SORTS.map((it, i) => optionTmpl(it, i))}
      </select>
    </form>
  );
};

Sort.propTypes = {
  onSelectClick: PropTypes.func.isRequired,
  sortType: PropTypes.string,
};

const mapStateToProps = (state) => ({
  sortType: state.sortType,
});

const mapDispatchToProps = (dispatch) => ({
  onSelectClick(sortType) {
    dispatch(ActionCreator.changeSort(sortType));
  }
});

export {Sort};
export default connect(mapStateToProps, mapDispatchToProps)(Sort);
