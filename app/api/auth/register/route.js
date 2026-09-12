import { randomBytes, scryptSync } from "crypto";
import { db } from "@/lib/db";

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}

export async function POST(request) {
  try {
    const { name, email, phone, password, passwordConfirmation, accountType } = await request.json();
    const normalizedName = String(name || "").trim();
    const normalizedEmail = String(email || "").trim().toLowerCase();

    if (!normalizedName || !normalizedEmail || !password) {
      return Response.json({ error: "Name, email, and password are required." }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      return Response.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    if (String(password).length < 8) {
      return Response.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }
    if (password !== passwordConfirmation) {
      return Response.json({ error: "Passwords do not match." }, { status: 400 });
    }

    const role = accountType === "agent" ? "agent" : "buyer";
    const [result] = await db.execute(
      "INSERT INTO users (name, email, password_hash, role, phone) VALUES (?, ?, ?, ?, ?)",
      [normalizedName, normalizedEmail, hashPassword(password), role, String(phone || "").trim() || null],
    );

    return Response.json({ user: { id: String(result.insertId), name: normalizedName, email: normalizedEmail, type: role } }, { status: 201 });
  } catch (error) {
    if (error?.code === "ER_DUP_ENTRY") {
      return Response.json({ error: "An account with this email already exists." }, { status: 409 });
    }
    console.error("Registration failed:", error);
    return Response.json({ error: "Unable to create your account. Please try again." }, { status: 500 });
  }
}
