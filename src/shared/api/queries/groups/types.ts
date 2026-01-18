export interface Group {
  id: string;
  name: string;
  creatorId: string;
  createAt: string;
  updateAt: string;
  creator: {
    id: string;
    name: string;
  };
  users: {
    user: {
      id: string;
      name: string;
    };
  }[];
}
