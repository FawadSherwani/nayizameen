import { findOrCreateConversation } from "@/lib/dummyChatStore";

export async function POST(request) {
  try {
    const body = await request.json();
    const result = findOrCreateConversation(body);
    return Response.json(result, { status: result.created ? 201 : 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}