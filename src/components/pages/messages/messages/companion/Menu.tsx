"use client";

import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavoriteMessage } from "@/redux/messages/slice";
import { RootState } from "@/redux/store";
import { CommonIcon } from "@/components";
import {
  useAddChatToFavoritesMutation,
  useRemoveChatFromFavoritesMutation,
  useGetFavoritesChatsQuery,
  useAddChatToArchiveMutation,
  useRemoveChatFromArchiveMutation,
  useGetArchivedChatsQuery,
} from "@/redux/messages/chatApi";
import style from "./Menu.module.scss";

interface MenuType {
  status: boolean;
  changeStatus: () => void;
  blockUserWindowHandle: (() => void) | undefined;
  complaintWindowHandle: (() => void) | undefined;
  chatId: number | null;
  isHeartSelected: boolean;
  setHeartSelected: (isHeartSelected: boolean) => void;
  isArchived: boolean;
  setArchived: (isArchived: boolean) => void;
}

const Menu: FC<MenuType> = ({
  status,
  changeStatus,
  blockUserWindowHandle,
  complaintWindowHandle,
  chatId,
  isHeartSelected,
  setHeartSelected,
  isArchived,
  setArchived,
}) => {
  const [addChatToFavorites] = useAddChatToFavoritesMutation();
  const [removeChatFromFavorites] = useRemoveChatFromFavoritesMutation();
  const { data: favoritesChats } = useGetFavoritesChatsQuery();
  const [addChatToArchive] = useAddChatToArchiveMutation();
  const [removeChatFromArchive] = useRemoveChatFromArchiveMutation();
  // const [isArchived, setArchived] = useState(false);
  const { data: archivedChats } = useGetArchivedChatsQuery();
  const isCompanionBlocked = useSelector((state: RootState) =>
    state.messages?.chat ? state.messages.chat.anotherUserBlocked : null
  );
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) =>
    chatId ? state.messages.favorites[chatId] : false
  );

  useEffect(() => {
    if (favoritesChats) {
      const isIdInFavorites = favoritesChats.some(
        (chat) => chat.chatId === chatId
      );
      isIdInFavorites && setHeartSelected(true);
    }
  }, [favoritesChats, chatId, setHeartSelected]);

  const handlerHeartSelected = async (
    chatId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setHeartSelected(!isHeartSelected);
    try {
      if (chatId) {
        await addChatToFavorites({ chatId: chatId }).unwrap();
        console.log("Chat added to favorites!");
      }
    } catch (error) {
      setHeartSelected(!isHeartSelected);
      console.error("Failed to add to favorites:", error);
    }
  };

  const handlerHeartRemovedFromSelected = async (
    chatId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setHeartSelected(!isHeartSelected);
    try {
      if (chatId) {
        await removeChatFromFavorites({ chatId: chatId }).unwrap();
        console.log("Chat removed from favorites!");
      }
    } catch (error) {
      setHeartSelected(!isHeartSelected);
      console.error("Failed to remove from favorites:", error);
    }
  };

  useEffect(() => {
    if (archivedChats) {
      const isIdInArchived = archivedChats.some(
        (chat) => chat.chatId === chatId
      );
      isIdInArchived && setArchived(true);
    }
  }, [archivedChats, chatId, setArchived]);

  const addToArchive = async (
    chatId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setArchived(!isArchived);
    try {
      if (chatId) {
        await addChatToArchive({ chatId: chatId }).unwrap();
        console.log("Chat added to the archive!");
      }
    } catch (error) {
      setArchived(!isArchived);
      console.error("Failed to add to the archive:", error);
    }
  };

  const removeFromArchive = async (
    chatId: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setArchived(!isArchived);
    try {
      if (chatId) {
        await removeChatFromArchive({ chatId: chatId }).unwrap();
        console.log("Chat removed from the archive!");
      }
    } catch (error) {
      setArchived(!isArchived);
      console.error("Failed to remove from the archive:", error);
    }
  };

  return (
    <ul
      className={status ? style.menuWrapper : "hidden"}
      onClick={changeStatus}
    >
      <li>
        <p
          className={style.link}
          onClick={(e) => {
            if (!chatId) return;
            dispatch(toggleFavoriteMessage(chatId));
            if (handlerHeartRemovedFromSelected && handlerHeartSelected) {
              isFavorite
                ? // @ts-ignore
                  handlerHeartRemovedFromSelected(chatId, e)
                : // @ts-ignore
                  handlerHeartSelected(chatId, e);
            }
          }}
        >
          <CommonIcon
            id={isFavorite ? "icon-heart-selected" : "icon-heart"}
            // className={style.icon}
            width="20"
            height="19"
          />
          {isFavorite ? <span>Прибрати</span> : <span>Додати з обраного</span>}
        </p>
      </li>
      <li>
        <p
          className={style.link}
          onClick={(e) => {
            if (chatId && removeFromArchive && addToArchive) {
              isArchived
                ? // @ts-ignore
                  removeFromArchive(chatId, e)
                : // @ts-ignore
                  addToArchive(chatId, e);
            }
          }}
        >
          <CommonIcon
            id="folder"
            className={style.icon}
            width="20"
            height="19"
          />
          {isArchived ? <span>Прибрати</span> : <span>Додати до архіву</span>}
        </p>
      </li>
      <li>
        <p className={style.link} onClick={complaintWindowHandle}>
          <CommonIcon id="flag" width="20" height="20" />
          Поскаржитись
        </p>
      </li>
      {!isCompanionBlocked ? (
        <li>
          <p className={style.link} onClick={blockUserWindowHandle}>
            <CommonIcon id="no-entry-sign" width="20" height="20" />
            Заблокувати
          </p>
        </li>
      ) : (
        <li>
          <p
            className={style.link}
            style={{ color: "#ff5656", cursor: "not-allowed" }}
          >
            <CommonIcon id="no-entry-sign" width="20" height="20" />
            Заблоковано
          </p>
        </li>
      )}
    </ul>
  );
};

export default Menu;
