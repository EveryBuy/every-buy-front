type ChatsType = MessageType[];

type UserDataType = {
  userId: number;
  fullName: string;
  photoUrl?: string;
};

type MessageType = {
  chatId: number;
  lastMessage: string;
  lastMessageDate: string;
  userData: UserDataType;
};

export { ChatsType, UserDataType, MessageType };
