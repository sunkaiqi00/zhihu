import { objToArr } from "@/hooks/helper";

export default {
  getColumnsById(state) {
    return (id: string) => state.columns.data[id];
  },
  getPostsByCid(state) {
    return (cid: string) => {
      return objToArr(state.posts.data).filter(
        post => (post as any).column === cid
      );
    };
  },
  getColumns(state) {
    return objToArr(state.columns.data);
  }
};
