import React from 'react'
import connectRedux from '../redux/connect';


const Filter = ({ updateFilter, filters}) => {

  const updateFilterNow = (event) => {
    updateFilter(event.target.getAttribute("data-filter"));
  }
  return (
    <div>
      <span>Show: </span>
      <button onClick={updateFilterNow} data-filter="ALL" disabled={filters.filter === 'ALL'} style={{ marginLeft: '4px', }}>
        All
      </button>
      <button onClick={updateFilterNow} data-filter="ACTIVE" disabled={filters.filter === 'ACTIVE'} style={{ marginLeft: '4px', }}>
        Active
      </button>
      <button onClick={updateFilterNow} data-filter="COMPLETED" disabled={filters.filter === 'COMPLETED'} style={{ marginLeft: '4px', }}>
        Completed
      </button>
    </div>
  );

}



export default connectRedux(Filter);
