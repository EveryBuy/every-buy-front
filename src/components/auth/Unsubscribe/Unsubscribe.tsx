"use client";

import { useState } from "react";
import { Backdrop } from "@mui/material";
import style from "./Unsubscribe.module.scss";
import { useAppDispatch } from "@/redux/store";
import { unsubscribeUser } from "@/redux/auth/operations";
import toast from "react-hot-toast";

const UnsubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [otherImprovement, setOtherImprovement] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const reasons = form.querySelectorAll('input[name="entry.2120425030"]:checked');
    const frequencies = form.querySelectorAll('input[name="entry.2091891096"]:checked');
    const improvements = form.querySelectorAll('input[name="entry.1092167163"]:checked');
    const futureIntentions = form.querySelectorAll('input[name="entry.2090872823"]:checked');

    if (!email) {
      toast.error("Будь ласка, введіть email.");
      return;
    }

    if (reasons.length === 0) {
      toast.error("Будь ласка, виберіть хоча б одну причину.");
      return;
    }

    if (frequencies.length === 0) {
      toast.error("Будь ласка, виберіть частоту.");
      return;
    }

    if (improvements.length === 0) {
      toast.error("Будь ласка, виберіть, що покращити.");
      return;
    }

    if (futureIntentions.length === 0) {
      toast.error("Будь ласка, вкажіть, чи готові ви повернутися до наших листів.");
      return;
    }

    try {
      await dispatch(unsubscribeUser(email));
    } catch (error) {
      console.error("Failed to unsubscribe:", error);
    }

    form.submit(); 
  };


  return (
    <>
      <button onClick={handleOpen} className={style.openButton}>Відписатись від розсилки</button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
        aria-hidden={open ? "false" : "true"}
      >
        <div className={style.modalBox} onClick={(e) => e.stopPropagation()}>
          <h3 className={style.modalTitle}>Розкажіть нам чому ви не хочете отримувати листи про новинки</h3>

          <form
            onSubmit={handleSubmit}
            action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdoEWF-dWOc0gdDisi4CL6G1TIdBlA9MujIy4TmbtkIjOzI-g/formResponse"
            method="POST"
            target="_blank"
          >
            <div>
              <label>Що стало основною причиною вашого рішення відмовитися від наших листів?</label>
              <div>
                <input type="checkbox" name="entry.2120425030" value="Я отримую забагато електронних листів" />
                Я отримую забагато електронних листів
              </div>
              <div>
                <input type="checkbox" name="entry.2120425030" value="Інформація в листах для мене нецікава" />
                Інформація в листах для мене нецікава
              </div>
              <div>
                <input type="checkbox" name="entry.2120425030" value="Я не користуюся послугами EveryBuy" />
                Я не користуюся послугами EveryBuy
              </div>
              <div>
                <input type="checkbox" name="entry.2120425030" value={`Other: ${otherReason}`} />
                Інше:
                <input
                  type="text"
                  placeholder="Ваша причина"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label>Як часто ви хотіли б отримувати новини або пропозиції від нас?</label>
              <div>
                <input type="checkbox" name="entry.2091891096" value="Раз на тиждень" />
                Раз на тиждень
              </div>
              <div>
                <input type="checkbox" name="entry.2091891096" value="Раз на місяць" />
                Раз на місяць
              </div>
              <div>
                <input type="checkbox" name="entry.2091891096" value="Тільки при наявності особливих акцій" />
                Тільки при наявності особливих акцій
              </div>
              <div>
                <input type="checkbox" name="entry.2091891096" value="Я взагалі не хочу отримувати листів" />
                Я взагалі не хочу отримувати листів
              </div>
            </div>

            <div>
              <label>Що могло б покращити наші листи?</label>
              <div>
                <input type="checkbox" name="entry.1092167163" value="Більше релевантних пропозицій" />
                Більше релевантних пропозицій
              </div>
              <div>
                <input type="checkbox" name="entry.1092167163" value="Коротший та зрозуміліший зміст" />
                Коротший та зрозуміліший зміст
              </div>
              <div>
                <input type="checkbox" name="entry.1092167163" value="Менше частоти розсилки" />
                Менше частоти розсилки
              </div>
              <div>
                <input type="checkbox" name="entry.1092167163" value={`Other: ${otherImprovement}`} />
                Інше:
                <input
                  type="text"
                  placeholder="Ваша пропозиція"
                  value={otherImprovement}
                  onChange={(e) => setOtherImprovement(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label>Чи готові ви повернутися до наших листів у майбутньому, якщо ми внесемо зміни?</label>
              <div>
                <input type="radio" name="entry.2090872823" value="Так" /> Так
              </div>
              <div>
                <input type="radio" name="entry.2090872823" value="Ні" /> Ні
              </div>
            </div>

            <div>
              <label htmlFor="emailInput">Вкажіть свою електронну адресу, щоб ми могли відмінити Вашу підписку:</label>
              <input
                type="email"
                id="emailInput"
                name="entry.1315222471"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={style.buttonGroup}>
              <button type="button" className={style.cancelButton} onClick={handleClose}>Відміна</button>
              <button type="submit" className={style.submitButton}>Відписатись</button>
            </div>
          </form>
        </div>
      </Backdrop>
    </>
  );
};

export default UnsubscribeForm;
