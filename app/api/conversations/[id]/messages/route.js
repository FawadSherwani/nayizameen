import { addMessage, getConversation, getMessages } from "@/lib/dummyChatStore";

export async function GET(_request, { params }) {
  const { id } = await params;
  if (!getConversation(id)) return Response.json({ error: "Conversation not found." }, { status: 404 });
  return Response.json({ messages: getMessages(id) });
}

export async function POST(request, { params }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const message = addMessage({ conversationId: id, senderId: body.senderId, senderName: body.senderName, body: String(body.body || "").trim() });
    if (!message) return Response.json({ error: "Conversation not found." }, { status: 404 });
    if (!message.body) return Response.json({ error: "Message body is required." }, { status: 400 });
    return Response.json({ message }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}