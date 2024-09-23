// "use client";

import { Box } from "@mui/material";
import { MessageListBlock, DialogueBlock } from "@/components";
// import getData from "@/actions/getData";
// import { notFound } from "next/navigation";

export default async function Page() {
  // const responseMessagesBuy: any = await getData(
  //   "/data/messages/messagesBuy.json"
  // );
  // const responseMessagesSell: any = await getData(
  //   "/data/messages/messagesSell.json"
  // );
  // const dataMessagesBuy = await responseMessagesBuy.json();
  // const dataMessagesSell = await responseMessagesSell.json();

  // if (!dataMessagesBuy.length) notFound();

  return (
    <>
      <h1 className="title">Повідомлення</h1>
      <Box
        sx={{
          display: "flex",
          columnGap: "35px",
          "@media (min-width: 768px)": {
            height: "720px",
          },
        }}
      >
        <MessageListBlock />
        <DialogueBlock />
      </Box>
    </>
  );
}
