import { ColumnmProps, PostProps, UserProps } from "./typeings/interface";

const testData: ColumnmProps[] = [
  {
    _id: "1",
    title: "周杰伦的专栏",
    avatar: {
      url: "https://static.vue-js.com/6280b990-ff19-11ea-85f6-6fac77c0c9b3.png",
      _id: "disuyrgdv",
      createAt: "2020-01-03 11:18"
    },
    description:
      "周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，华语流行男歌手、演员、词曲创作人、MV及电影导演、编剧及制作人。"
  },
  {
    _id: "1",
    title: "周杰伦的专栏",
    avatar: {
      url: "https://static.vue-js.com/6280b990-ff19-11ea-85f6-6fac77c0c9b3.png",
      _id: "disuyrgdv",
      createAt: "2020-01-03 11:18"
    },
    description:
      "周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，华语流行男歌手、演员、词曲创作人、MV及电影导演、编剧及制作人。"
  },
  {
    _id: "1",
    title: "周杰伦的专栏",
    avatar: {
      url: "https://static.vue-js.com/6280b990-ff19-11ea-85f6-6fac77c0c9b3.png",
      _id: "disuyrgdv",
      createAt: "2020-01-03 11:18"
    },
    description:
      "周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，华语流行男歌手、演员、词曲创作人、MV及电影导演、编剧及制作人。"
  },
  {
    _id: "1",
    title: "周杰伦的专栏",
    avatar: {
      url: "https://static.vue-js.com/6280b990-ff19-11ea-85f6-6fac77c0c9b3.png",
      _id: "disuyrgdv",
      createAt: "2020-01-03 11:18"
    },
    description:
      "周杰伦（Jay Chou），1979年1月18日出生于台湾省新北市，华语流行男歌手、演员、词曲创作人、MV及电影导演、编剧及制作人。"
  }
];
const testPosts: PostProps[] = [
  {
    id: 1,
    title: "这是我第一遍文章",
    content:
      "人民网沈阳1月2日电 1月2日，沈阳市统筹推进新冠肺炎疫情防控和经济社会发展工作指挥部发布《关于加强重点管控区域疫情防控工作的通知》。《通知》中说：为维护公众身体健康和生命安全，坚决防止新冠肺炎疫情在沈阳市扩散，依据《中华人民共和国传染病防治法》《中华人民共和国突发事件应对法》《突发公共卫生事件应对条例》等法律法规的规定，经市指挥部研究决定，现将有关事宜通知如下",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRebnMDvZD6v9fiMSrmozpeZN4kxuY4CODEjA&usqp=CAU",
    createdAt: "2021-01-01 15:05",
    columnId: 1
  },
  {
    id: 2,
    title: "这是我第二遍文章",
    content:
      "人民网沈阳1月2日电 1月2日，沈阳市统筹推进新冠肺炎疫情防控和经济社会发展工作指挥部发布《关于加强重点管控区域疫情防控工作的通知》。《通知》中说：为维护公众身体健康和生命安全，坚决防止新冠肺炎疫情在沈阳市扩散，依据《中华人民共和国传染病防治法》《中华人民共和国突发事件应对法》《突发公共卫生事件应对条例》等法律法规的规定，经市指挥部研究决定，现将有关事宜通知如下",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRebnMDvZD6v9fiMSrmozpeZN4kxuY4CODEjA&usqp=CAU",
    createdAt: "2021-01-01 15:05",
    columnId: 1
  },
  {
    id: 3,
    title: "这是我第三遍文章",
    content:
      "人民网沈阳1月2日电 1月2日，沈阳市统筹推进新冠肺炎疫情防控和经济社会发展工作指挥部发布《关于加强重点管控区域疫情防控工作的通知》。《通知》中说：为维护公众身体健康和生命安全，坚决防止新冠肺炎疫情在沈阳市扩散，依据《中华人民共和国传染病防治法》《中华人民共和国突发事件应对法》《突发公共卫生事件应对条例》等法律法规的规定，经市指挥部研究决定，现将有关事宜通知如下",
    image: "",
    createdAt: "2021-01-01 15:05",
    columnId: 1
  },
  {
    id: 4,
    title: "这是我第四遍文章",
    content:
      "人民网沈阳1月2日电 1月2日，沈阳市统筹推进新冠肺炎疫情防控和经济社会发展工作指挥部发布《关于加强重点管控区域疫情防控工作的通知》。《通知》中说：为维护公众身体健康和生命安全，坚决防止新冠肺炎疫情在沈阳市扩散，依据《中华人民共和国传染病防治法》《中华人民共和国突发事件应对法》《突发公共卫生事件应对条例》等法律法规的规定，经市指挥部研究决定，现将有关事宜通知如下",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRebnMDvZD6v9fiMSrmozpeZN4kxuY4CODEjA&usqp=CAU",
    createdAt: "2021-01-01 15:05",
    columnId: 1
  }
];
const user: UserProps = {
  id: 1,
  name: "开怀",
  isLogin: true,
  columnId: 1
};
export { testData, testPosts, user };
