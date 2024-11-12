type UserDataType = {
  userId: number;
  fullName: string;
  photoUrl?: string;
};

type ChatType = {
  chatId?: number;
  lastMessage: string;
  lastMessageDate: string;
  section?: string;
  userData: UserDataType;
};

type ChatsType = ChatType[];

export { UserDataType, ChatType, ChatsType };
