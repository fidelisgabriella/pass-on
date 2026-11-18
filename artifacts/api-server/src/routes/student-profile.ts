import {
  ClaimModeratorAccessBody,
  ClaimModeratorAccessResponse,
  GetStudentProfileResponse,
  SaveStudentProfileBody,
  SaveStudentProfileResponse,
} from "@workspace/api-zod";
import {
  db,
  studentProfilesTable,
} from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { Router, type IRouter, type Request, type Response } from "express";

const router: IRouter = Router();

function publicProfile(profile: typeof studentProfilesTable.$inferSelect) {
  return {
    displayName: profile.displayName,
    hasRa: true,
    isModerator: profile.isModerator,
  };
}

function constantTimeSecretMatch(candidate: string, expected: string): boolean {
  const candidateHash = createHash("sha256").update(candidate).digest();
  const expectedHash = createHash("sha256").update(expected).digest();
  return timingSafeEqual(candidateHash, expectedHash);
}

router.get(
  "/student-profile",
  async (req: Request, res: Response): Promise<void> => {
    if (!req.isAuthenticated()) {
      res.status(401).json({ error: "Entre na sua conta para continuar." });
      return;
    }

    const [profile] = await db
      .select()
      .from(studentProfilesTable)
      .where(eq(studentProfilesTable.userId, req.user.id));

    res.json(
      GetStudentProfileResponse.parse({
        profile: profile ? publicProfile(profile) : null,
      }),
    );
  },
);

router.put(
  "/student-profile",
  async (req: Request, res: Response): Promise<void> => {
    if (!req.isAuthenticated()) {
      res.status(401).json({ error: "Entre na sua conta para continuar." });
      return;
    }

    const parsed = SaveStudentProfileBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Confira o nome e o RA informados." });
      return;
    }

    const displayName = parsed.data.displayName.trim();
    const ra = parsed.data.ra.trim().toLocaleUpperCase("pt-BR");
    const hashSecret = process.env.SESSION_SECRET;
    if (displayName.length < 2 || !ra) {
      res.status(400).json({ error: "Confira o nome e o RA informados." });
      return;
    }
    if (!hashSecret) {
      res.status(503).json({ error: "Cadastro temporariamente indisponível." });
      return;
    }

    const raHash = createHmac("sha256", hashSecret).update(ra).digest("hex");
    try {
      const [profile] = await db
        .insert(studentProfilesTable)
        .values({ userId: req.user.id, displayName, raHash })
        .onConflictDoUpdate({
          target: studentProfilesTable.userId,
          set: { displayName, raHash, updatedAt: new Date() },
        })
        .returning();

      res.json(SaveStudentProfileResponse.parse(publicProfile(profile)));
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "23505"
      ) {
        res.status(409).json({ error: "Este RA já está associado a outro cadastro." });
        return;
      }
      throw error;
    }
  },
);

router.post(
  "/moderator/claim",
  async (req: Request, res: Response): Promise<void> => {
    if (!req.isAuthenticated()) {
      res.status(401).json({ error: "Entre na sua conta para continuar." });
      return;
    }

    const parsed = ClaimModeratorAccessBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Informe o código de configuração." });
      return;
    }

    const [profile] = await db
      .select()
      .from(studentProfilesTable)
      .where(eq(studentProfilesTable.userId, req.user.id));
    if (!profile) {
      res.status(403).json({ error: "Conclua seu cadastro primeiro." });
      return;
    }
    if (profile.isModerator) {
      res.json(ClaimModeratorAccessResponse.parse({ isModerator: true }));
      return;
    }

    const setupSecret = process.env.PASS_ON_ADMIN_SETUP_SECRET;
    if (!setupSecret) {
      res.status(503).json({ error: "A configuração inicial de moderação ainda não foi concluída." });
      return;
    }
    if (!constantTimeSecretMatch(parsed.data.setupCode, setupSecret)) {
      res.status(403).json({ error: "Código de configuração inválido." });
      return;
    }

    const claimed = await db.transaction(async (tx) => {
      await tx.execute(sql`select pg_advisory_xact_lock(24181027)`);
      const [existingModerator] = await tx
        .select({ userId: studentProfilesTable.userId })
        .from(studentProfilesTable)
        .where(eq(studentProfilesTable.isModerator, true))
        .limit(1);

      if (existingModerator) return false;

      await tx
        .update(studentProfilesTable)
        .set({ isModerator: true, updatedAt: new Date() })
        .where(eq(studentProfilesTable.userId, req.user.id));
      return true;
    });

    if (!claimed) {
      res.status(409).json({ error: "A moderação já foi configurada." });
      return;
    }

    res.json(ClaimModeratorAccessResponse.parse({ isModerator: true }));
  },
);

export default router;
