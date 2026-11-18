import { db, studentProfilesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";

export async function requireStudentProfile(req: Request, res: Response) {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "Entre na sua conta para continuar." });
    return null;
  }

  const [profile] = await db
    .select()
    .from(studentProfilesTable)
    .where(eq(studentProfilesTable.userId, req.user.id));

  if (!profile) {
    res.status(403).json({ error: "Conclua seu cadastro para continuar." });
    return null;
  }

  return { userId: req.user.id, profile };
}
