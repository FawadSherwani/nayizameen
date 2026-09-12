import { listProperties, saveProperty } from "@/lib/dummyPropertyStore";

export async function GET() {
  return Response.json({ properties: listProperties() });
}

export async function POST(request) {
  try {
    const property = await request.json();
    if (!property || !property.title || !property.price) {
      return Response.json({ error: "Title and price are required." }, { status: 400 });
    }
    return Response.json({ property: saveProperty(property) }, { status: 201 });
  } catch {
    return Response.json({ error: "Invalid property payload." }, { status: 400 });
  }
}