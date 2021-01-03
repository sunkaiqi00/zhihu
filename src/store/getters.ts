export default {
  getColumns(state) {
    return (id: number) => state.columns.find(item => item.id === id);
  },
  getPosts(state) {
    return (id: number) => state.posts.filter(item => item.columnId === id);
  }
};
