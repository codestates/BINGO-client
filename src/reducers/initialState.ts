export const initialState =
{
  userInfo: {
    userId: 1,
    username: "체험 유저",
    profileImage: "https://i.imgur.com/FP3hraO.png",
    level: "새싹",
    accessToken: "accessToken",
    ngoIdOfLoveList: []
  },
  mypageInfo: {},
  ngoList: [],
  loginInfo:{
    isLogin: false,
    accessToken: "default",
  },
  payModalInfo: {
    modalDisplay: false,
    money: 0,
  },
  payMessageInfo: {
    messageDisplay: true,
  },
  contentModalInfo:{
    modalDisplay: false,
  },
  myModalInfo:{
    modalDisplay: false,
    ngoName: '',
    donateId: 0,
  },
  selectedOptions: [],
  listInfo: {
    data: [{ logo: "", title: "", description: "", id: 1, }],
  },
  listInfoCategory: {
    category: "",
  },
  currentNgoId: 4,
  currentNewsList: {newsList: [{description: "", link: "", originallink: "", title: "", pubDate: ""}]},
  currentMessageList: {messageList: [{id: 0, ing: false, message: "", money: 0, user: {}, type: "repeat"}]},
  optionList: [
    {
      name: "아동",
      color: "white",
    },
    {
      name: "장애인",
      color: "white",
    },
    {
      name: "여성",
      color: "white",
    },
    {
      name: "성소수자",
      color: "white",
    },
    {
      name: "동물",
      color: "white",
    },
    {
      name: "환경",
      color: "white",
    },
    {
      name: "어르신",
      color: "white",
    },
    {
      name: "청소년/교육",
      color: "white",
    },
    {
      name: "의료/보건",
      color: "white",
    },
    {
      name: "가족",
      color: "white",
    },
    {
      name: "다문화",
      color: "white",
    },
  ],
  testList: [
    {
      question: 'Q1. 다음 중 관심있는 사회 이슈를 골라주세요. (최대 3개 항목 선택 가능)',
      left: 50,
      opacity: 1,
      name: '옵션',
      value: 0
    },
    {
      question: 'Q2. 다른 나라의 사회문제까지 신경쓸 여력은 없다.',
      left: 50,
      opacity: 1,
      name: '지구촌',
      value: 1
    },
    {
      question: 'Q3. 조금씩 여러 사람에게 나누기보다는 한 사람에게 큰 도움을 주고 싶다.',
      left: 50,
      opacity: 1,
      name: '결연',
      value: 0
    },
    {
      question: 'Q4. 내가 후원하는 단체에 좀 더 깊은 소속감을 느끼고 싶다.',
      left: 50,
      opacity: 1,
      name: '회원',
      value: 0
    },
    {
      question: 'Q5. 금전지원이 사회단체에 가장 큰 도움이 될 것이다.',
      left: 50,
      opacity: 1,
      name: '참여',
      value: 1
    },
    {
      question: 'Q6. 나의 기부에 대한 물질적 보상을 원한다.',
      left: 50,
      opacity: 1,
      name: '스토어',
      value: 0
    },
    {
      question: 'Q7. 종교는 더 나은 사회를 만들기 위해 꼭 필요하다.',
      left: 50,
      opacity: 1,
      name: '종교',
      value: 0
    },
    {
      question: 'Q8. 나는 안정성보다는 도전이 좋다.',
      left: 50,
      opacity: 1,
      name: '신생',
      value: 0
    },
  ],
};
