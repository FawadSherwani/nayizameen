"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check, CheckCheck, MessageCircle, Send, X } from "lucide-react";

function getCurrentUser() {
  try {
    const session = JSON.parse(window.localStorage.getItem("nayizameen-session") || "null");
    if (!session) return null;
    return { id: session.id || session.email, name: session.name || "User", email: session.email || "" };
  } catch {
    return null;
  }
}

async function fetchConversationMessages(conversationId) {
  const response = await fetch("/api/conversations/" + conversationId + "/messages", { cache: "no-store" });
  if (!response.ok) return [];
  return (await response.json()).messages || [];
}
export default function PropertyChat({ propertyId, propertyTitle, ownerId, ownerName }) {
  const [user, setUser] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [notice, setNotice] = useState("");
  const [draft, setDraft] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => setUser(getCurrentUser()), []);


  useEffect(() => {
    if (!conversation) return undefined;
    fetchConversationMessages(conversation.id).then(setMessages);
    const interval = window.setInterval(() => fetchConversationMessages(conversation.id).then(setMessages), 2000);
    return () => window.clearInterval(interval);
  }, [conversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openChat = async () => {
    const currentUser = user || getCurrentUser();
    if (!currentUser) {
      setNotice("Please log in to chat with the owner.");
      return;
    }
    if (String(currentUser.id) === String(ownerId) || currentUser.email === ownerId) {
      setNotice("You cannot start a chat with yourself.");
      return;
    }
    setNotice("");
    const response = await fetch("/api/conversations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ buyerId: currentUser.id, buyerName: currentUser.name, sellerId: ownerId, sellerName: ownerName, propertyId, propertyTitle }) });
    const data = await response.json();
    if (!response.ok) {
      setNotice(data.error || "Unable to open this conversation.");
      return;
    }
    setConversation(data.conversation);
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    const body = draft.trim();
    if (!body || !conversation || !user) return;
    const response = await fetch("/api/conversations/" + conversation.id + "/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ senderId: user.id, senderName: user.name, body }) });
    if (!response.ok) {
      setNotice("Unable to send this message.");
      return;
    }
    setDraft("");
    fetchConversationMessages(conversation.id).then(setMessages);
  };

  return <>
    <button type="button" onClick={openChat} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary-700 px-4 py-2.5 text-sm font-semibold text-primary-700 transition hover:bg-primary-50"><MessageCircle className="h-4 w-4" />Chat with Owner</button>
    {notice && <div className="mt-3 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-sm text-amber-800">{notice}{notice.includes("log in") && <Link href="/login" className="ml-1 font-semibold underline">Log in</Link>}</div>}
    {conversation && <div className="fixed inset-0 z-[60] flex items-end justify-end bg-slate-900/20 p-4 sm:items-center"><section className="flex h-[min(680px,calc(100vh-2rem))] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200"><header className="flex items-start justify-between border-b border-slate-100 bg-primary-800 px-5 py-4 text-white"><div><p className="text-xs font-semibold uppercase tracking-wide text-primary-100">Chat with {ownerName}</p><h2 className="mt-1 text-base font-bold">{propertyTitle}</h2><p className="mt-1 text-xs text-primary-100">Inquiry regarding this property</p></div><button type="button" onClick={() => setConversation(null)} className="rounded-lg p-1 text-primary-100 hover:bg-white/10" aria-label="Close chat"><X className="h-5 w-5" /></button></header><div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">{messages.map((message) => { const mine = message.senderId === user?.id; const system = message.senderId === "system"; return <div key={message.id} className={system ? "text-center" : mine ? "flex justify-end" : "flex justify-start"}>{system ? <p className="mx-auto max-w-[90%] rounded-full bg-white px-3 py-2 text-xs text-slate-500 ring-1 ring-slate-200">{message.body}</p> : <div className={"max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm " + (mine ? "rounded-br-md bg-primary-700 text-white" : "rounded-bl-md bg-white text-slate-700 ring-1 ring-slate-200")}><p className={mine ? "text-[10px] font-semibold text-primary-100" : "text-[10px] font-semibold text-slate-400"}>{message.senderName}</p><p className="mt-1">{message.body}</p><p className={"mt-1 flex items-center justify-end gap-1 text-[10px] " + (mine ? "text-primary-100" : "text-slate-400")}>{new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}{mine && (message.readBy?.length > 1 ? <CheckCheck className="h-3 w-3" /> : <Check className="h-3 w-3" />)}</p></div>}</div>; })}<div ref={messagesEndRef} /></div><form onSubmit={sendMessage} className="flex gap-2 border-t border-slate-100 bg-white p-3"><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Write a message..." className="h-11 flex-1 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-100" /><button type="submit" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-700 text-white hover:bg-primary-800" aria-label="Send message"><Send className="h-4 w-4" /></button></form></section></div>}
  </>;
}