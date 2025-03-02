type UserDataType = {
  userId: number;
  fullName: string;
  photoUrl?: string;
};

type MessageType = {
  chatId: number | null;
  creationTime: string;
  id: number;
  text?: string;
  fileUrl?: string;
  userId: number;
  userPhotoUrl: string | null;
};

export { ChatsType, UserDataType, MessageType };
