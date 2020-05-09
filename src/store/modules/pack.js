const state = {
  tableLoading: false, // 表格 请求加载loading
};

const mutations = {
  SET_TABLE_LOADING: (state, value) => {
   state.tableLoading = value
  }
};

const actions = {

};
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
