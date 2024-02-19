import { useState } from "react";
import ChatForm from "../../components/Form/index.tsx";
import { sendMessage } from "../../components/App/apiFunctions.ts";

import Swal from "sweetalert2";

import "./chatbot.css";
import React from "react";
import { Link } from "react-router-dom";

import logoChat from "../../public/logo-chat.svg";

import logoFjs from "../../public/logo.svg";
import bannerFjs from "../../public/banner-fjs.svg";
import iconUser from "../../public/generic-user.svg";
import { ArrowLeft, DotsThreeVertical, GearFine } from "@phosphor-icons/react";
import { ChatEntry } from "../../types/types.ts";

const Chatbot = () => {
  const [chatLog, setChatLog] = useState<ChatEentry[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (userMessage: string) => {
    setChatLog((prevChatLog: ChatEntry[]) => [
      ...prevChatLog,
      {
        type: "user",
        message: userMessage,
      },
      {
        type: "bot",
        message: "...",
      },
    ]);

    setIsProcessing(true);
    const botResponse = await sendMessage(userMessage);
    setIsProcessing(false);

    const words = botResponse.text.split(" ");

    for (let i = 0; i < words.length; i++) {
      setTimeout(() => {
        setChatLog((prevChatLog: ChatEntry[]) => [
          ...prevChatLog.slice(0, -1),
          {
            type: "bot",
            message: words.slice(0, i + 1).join(" "),
          },
        ]);
      }, (i + 1) * 150);
    }
  };

  const handleAlert = () => {
    Swal.fire({
      title: "Olá, obrigada por testar!",
      text: "Esta é uma versão de demonstração da Jô. Em breve teremos mais funcionalidades.",
      icon: "info",
      showCancelButton: false,
      confirmButtonColor: "#6A1B44",
      confirmButtonText: "Voltar ao Chat",
    }).then((result) => {
      /*  if (result.isConfirmed) {
        console.log("Voltar ao Chat");
      } */
    });
  };

  return (
    <div className="main-chat">
      <aside className="aside-header">
        <img src={logoFjs} alt="Logo" className="img-logo" />
        <section className="banner-aside">
          <button>
            {" "}
            <a href="/">voltar à Home </a>
          </button>
          <img src={bannerFjs} alt="Banner-Fjs" />
        </section>

        <div className="footer-aside">
          <img className="w-[50px]" src={iconUser} alt="user" />
          <section>
            <p>Usuário</p>
            <p>FJS</p>
          </section>
          <div onClick={handleAlert} className="icon-engine">
            <GearFine size={40} color="white" />
          </div>
        </div>
      </aside>

      <section className="chat-box">
        <div className="chat-log">
          <div className="flex justify-between items-center max-w-full p-4 pt-10 px-12">
            <a href="/">
              <ArrowLeft size={50} />
            </a>
            <button onClick={handleAlert}>
              <DotsThreeVertical size={50} color="black" />
            </button>
          </div>

          {chatLog.map((entry, index) => (
            <div
              key={index}
              className={`flex pl-6 items-start ${
                entry.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <img
                className="w-[110px] h-auto"
                src={entry.type === "user" ? iconUser : logoChat}
                alt={entry.type === "user" ? "Foto do Usuário" : "Foto do Bot"}
              />
              <div
                className={`flex w-[60%] max-w-[75%] mx-16 my-10 p-3 rounded-lg shadow-lg ${
                  entry.type === "user"
                    ? "bg-main-white text-black"
                    : "bg-color-fjs text-main-white ml-[0rem] mt-[4rem]"
                }`}
              >
                <div className="p-5 font-inter text-justify">
                  <p className="text-[1.2rem] leading-[2.5rem]">
                    {entry.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ChatForm onSubmit={handleSubmit} />
      </section>
    </div>
  );
};

export default Chatbot;
