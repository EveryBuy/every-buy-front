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
};

type ChatMessagesType = any;

export { ChatsType, UserDataType, MessageType, ChatMessagesType };
