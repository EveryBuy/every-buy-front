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

export { ChatsType, UserDataType, MessageType };
