/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import ProgressBar from "../component/ProgressBar";

import { isMobile } from "react-device-detect";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const address = useTonAddress();
  const [token, setToken] = useState<number>(0);
  const [remainedEnergy, setRemainedEnergy] = useState(25);
  const [modalVisible, setModalVisible] = useState(false);

  // const [remainedEnergy, setRemainedEnergy] = useState(25);
  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }

  const bodyRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.random() * (event.clientX - rect.left);
    const y = Math.random() * (event.clientY - rect.top);

    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);

    styleElement.sheet &&
      styleElement.sheet.insertRule(
        "@keyframes fade-out-top-right {0% {opacity: 1; transform: translateY(0); } 100% {opacity: 0;transform: translateY(-100%);}}",
        0
      );

    const newDiv = document.createElement("div");
    newDiv.textContent = `+1`;
    newDiv.style.backgroundImage = "url('image/dollar.png')";
    newDiv.style.backgroundRepeat = "no-repeat";
    newDiv.style.backgroundPosition = "center";
    newDiv.style.fontSize = "30px";
    newDiv.style.paddingLeft = "30px";
    newDiv.style.display = "flex";
    newDiv.style.justifyContent = "center";
    newDiv.style.alignItems = "center";
    newDiv.style.backgroundSize = "cover";
    newDiv.style.width = "40px";
    newDiv.style.height = "40px";
    newDiv.style.position = "absolute";
    newDiv.style.left = `${x + 50}px`;
    newDiv.style.top = `${y}px`;
    newDiv.style.color = "red";
    newDiv.className =
      "dynamic-div animate-fadeouttopright transform max-sm:text-3xl text-5xl font-bold transition not-selectable";

    bodyRef.current && bodyRef.current.appendChild(newDiv);
    const interval = setTimeout(() => newDiv && newDiv.remove(), 1000);

    return () => clearTimeout(interval);
  };

  const handleTap = (event: any) => {
    // if (!address) {
    //   setModalVisible(true);
    //   return;
    // }
    if (remainedEnergy > 0) {
      setRemainedEnergy(remainedEnergy - 1);
      localStorage.setItem("remainedEnergy", String(remainedEnergy - 1));
      if (token === null) {
        setToken(1);
      } else {
        setToken(token + 1);
      }
    }
    handleClick(event);
  };

  const handleTouch = (event: any) => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }
    const length = event.touches.length;
    console.log(event, length);
    if (remainedEnergy - length >= 0 && length >= 1) {
      setRemainedEnergy(remainedEnergy - length);
      setToken(token + length);
    }
  };

  const closeWalletModal = () => {
    setModalVisible(false);
  };

  const buttonWrapperRef = useRef(null);

  const handleTonButtonClick = () => {
    if (buttonWrapperRef.current) {
      const tonConnectButton = (buttonWrapperRef.current as any).querySelector(
        "button"
      ); // Adjust selector if necessary
      if (tonConnectButton) {
        tonConnectButton.click();
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="relative justify-center items-center w-full h-14 px-5 py-2"
        ref={buttonWrapperRef}
      >
        <TonConnectButton className="float-right" />
      </div>
      <div className="flex flex-col relative items-center justify-between mt-3">
        <div className="flex justify-center items-center bg-[#4C4C4E] p-3 mb-10 rounded-[25px] gap-3">
          <img src="/image/yescoin.png" alt="" className=" w-7 h-7" />
          <h1 className=" text-[30px] ">Yescoin Community</h1>
          <img src="/image/award.png" alt="" className=" w-11 h-10" />
        </div>
        <div className="flex justify-center items-center not-selectable gap-3">
          <img src="/image/yescoin.png" alt="" className=" w-10 h-10" />
          <h1 className="text-5xl">{formatNumberWithCommas(token!)}</h1>
        </div>
        <div
          className={`relative bg-[url('/image/yescoin2.png')] active:bg-[url('/image/yescoin1.png')] my-5 max-sm:my-5 rounded-full bg-cover aspect-square h-[200px] w-[200px] flex-shrink-0 shadow-custom ${
            remainedEnergy > 0
              ? "cursor-pointer"
              : "cursor-not-allowed opacity-50"
          }`}
          ref={bodyRef}
          onTouchStart={(e) => {
            if (!isMobile) return;
            handleTouch(e);
          }}
          onClick={(e) => {
            console.log("clickEvent: ", e);
            // if (isMobile) return;
            handleTap(e);
          }}
        ></div>

        <div>
          <div className="flex flex-col items-center not-selectable w-full">
            <div className="flex justify-between items-center w-full mb-1 pl-3 pr-4">
              <h3 className="font-bold">Today’s Tap Limit</h3>
              <h3 className="text-[#FFF] text-md font-bold">
                {remainedEnergy}
              </h3>
            </div>
            <ProgressBar value={remainedEnergy * 4} />
          </div>
        </div>
      </div>

      {modalVisible && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center"
            onClick={() => setModalVisible(false)}
          ></div>

          <div className="fixed bottom-0 left-0 right-0 p-4 shadow-lg bg-[#1E3D4B] rounded-t-2xl flex flex-col justify-center gap-4 animate-slide-in-bottom transform transition-all max-h-[80vh] overflow-y-auto">
            <div className="flex justify-end w-full h-12">
              <button
                className="text-black bg-[#4F7383] p-1 rounded-full"
                onClick={closeWalletModal}
                style={{
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/image/icon/close_icon.svg"
                  alt="close"
                  className="w-4 h-4"
                />
              </button>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/image/icon/connect_wallet.svg"
                alt="connectButton"
                className="w-20 h-25"
              />
            </div>
            <p className="text-3xl font-bold text-center mb-2">
              Please connect the <br></br>wallet first!
            </p>
            <div
              className="flex text-xl justify-center items-center w-full h-16 px-2 py-1 bg-gradient-to-r from-[#07AEEA] to-[#D3984E] rounded-xl cursor-pointer gap-2"
              onClick={handleTonButtonClick}
            >
              <img src="/image/icon/union.svg" alt="tonbuttonicon" />
              Connnect TON Wallet
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
