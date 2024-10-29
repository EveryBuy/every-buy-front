type ChatsType = MessageType[];

type UserDataType = {
  userId: number;
  fullName: string;
  photoUrl?: string;
};

type MessageType = {
  chatId: number;
  creationTime: string;
  id: number;
  text: string;
  userId: number;
  userPhotoUrl: string | null;
  // lastMessage: string;
  // lastMessageDate: string;
  // userData: UserDataType;
};

interface ChatMessagesType {
  id: number;
  text: string;
  creationTime: string;
  userId: number;
  chatId: number;
  userPhotoUrl: null | string;
}

export { ChatsType, UserDataType, MessageType, ChatMessagesType };
