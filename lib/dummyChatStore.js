const store = globalThis.__nayizameenChatStore || { conversations: [], messages: [] };
globalThis.__nayizameenChatStore = store;

export function findOrCreateConversation({ buyerId, buyerName, sellerId, sellerName, propertyId, propertyTitle }) {
  if (!buyerId || !sellerId) throw new Error("Buyer and seller are required.");
  if (String(buyerId) === String(sellerId)) throw new Error("You cannot start a chat with yourself.");
  const existing = store.conversations.find((item) => String(item.propertyId) === String(propertyId) && String(item.buyerId) === String(buyerId) && String(item.sellerId) === String(sellerId));
  if (existing) return { conversation: existing, created: false };

  const now = new Date().toISOString();
  const conversation = { id: "conversation-" + Date.now(), buyerId, buyerName, sellerId, sellerName, propertyId: String(propertyId), propertyTitle, createdAt: now, updatedAt: now };
  store.conversations.unshift(conversation);
  store.messages.push({ id: "message-" + Date.now(), conversationId: conversation.id, senderId: "system", senderName: "Nayizameen", body: "Inquiry regarding " + propertyTitle, createdAt: now, readBy: [buyerId] });
  return { conversation, created: true };
}

export function getConversation(id) {
  return store.conversations.find((item) => item.id === id) || null;
}

export function getMessages(conversationId) {
  return store.messages.filter((item) => item.conversationId === conversationId);
}

export function addMessage({ conversationId, senderId, senderName, body }) {
  const conversation = getConversation(conversationId);
  if (!conversation) return null;
  const message = { id: "message-" + Date.now(), conversationId, senderId, senderName, body, createdAt: new Date().toISOString(), readBy: [senderId] };
  store.messages.push(message);
  conversation.updatedAt = message.createdAt;
  return message;
}