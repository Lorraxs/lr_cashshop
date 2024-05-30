import { Box, Image as ImageComponent, useShow } from "lr-components";
import React, { useEffect } from "react";
import { isEnvBrowser } from "../utils/misc";
import User from "./User";
import Items from "./Items";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import ConfirmPaidDialog from "./ConfirmPaidDialog";
import DonateDialog from "./DonateDialog/DonateDialog";
import { motion, AnimatePresence } from "framer-motion";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { Category, Item, User as UserType } from "../types";
import {
  clearSelectedItem,
  clearSelectedOptions,
  setCategories,
  setDonateData,
  setItems,
  setShowConfirmModal,
} from "../store/items";
import { BankAccount } from "../types/redux.type";
import { setUser } from "../store/user";
import { donateActions } from "../store/donate";

const MotionImage = motion(ImageComponent);
const MotionUser = motion(User);
const MotionItems = motion(Items);
const MotionConfirmPaidDialog = motion(ConfirmPaidDialog);
const MotionDonateDialog = motion(DonateDialog);

function App() {
  const { show, toggle } = useShow({ name: "App" });
  const items = useSelector((state: RootState) => state.items.items);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const images = ["./images/bg.png"];
    /* items.forEach((item) => {
      if (item.image) images.push(item.image);
    }); */
    images.forEach((image) => {
      const loadImage = new Image();
      loadImage.src = image;
    });
    fetchNui("setAppReady", true);
  }, [items]);

  useEffect(() => {
    if (isEnvBrowser() && !show) {
      setTimeout(() => {
        toggle();
      }, 1000);
    }
    if (!show) {
      dispatch(setShowConfirmModal(false));
      dispatch(donateActions.setShow(false));
      dispatch(clearSelectedOptions());
      dispatch(clearSelectedItem());
    }
  }, [show, toggle, dispatch]);
  const showConfirmModal = useSelector(
    (state: RootState) => state.items.showConfirmModal
  );
  const showDonateDialog = useSelector((state: RootState) => state.donate.show);
  useNuiEvent<Category[]>("setCategories", (categories) => {
    dispatch(setCategories(categories));
  });
  useNuiEvent<Item[]>("setItems", (items) => {
    dispatch(setItems(items));
  });
  useNuiEvent<BankAccount[]>("setBankAccounts", (bankAccounts) => {
    dispatch(setDonateData(bankAccounts));
  });
  useNuiEvent<UserType>("setUser", (user) => {
    dispatch(setUser(user));
  });
  useNuiEvent<"PENDING" | "SUCCESS" | "INVALID_AMOUNT" | "INVALID_PLAYER">(
    "setDonateStatus",
    (status) => {
      dispatch(donateActions.setDonateStatus(status));
    }
  );

  return (
    <Box
      rWidth={1920}
      rHeight={1080}
      display="flex"
      rGap={50}
      rPadding={50}
      boxSizing="border-box"
    >
      <AnimatePresence>
        {show && (
          <MotionImage
            src="./images/bg.png"
            position="absolute"
            top={0}
            left={0}
            zIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {show && (
          <MotionUser
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {show && (
          <MotionItems
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showConfirmModal && (
          <MotionConfirmPaidDialog
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showDonateDialog && (
          <MotionDonateDialog
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </Box>
  );
}

export default App;
