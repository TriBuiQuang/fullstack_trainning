import * as types from './../constants/ActionTypes';
export const listALL = () => {
   return {
      type: types.LIST_ALL
   }
}
export const status = () => {
   return {
      type: 'TOOGLE_STATUS',
   }
}

export const sort = (sort) => {
   return {
      type: 'SORT',
      sort // sort: sort
   }
}
