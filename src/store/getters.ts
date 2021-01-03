export default {
  getColumns(state) {
    return (id: string) => state.columns.find(item => item._id === id);
  },
  getPosts(state) {
    return (cid: string) => state.posts.filter(item => item.column === cid);
  }
};
