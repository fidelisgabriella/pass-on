import {
  ApproveDonationResponse,
  CreateDonationBody,
  CreateDonationResponse,
  ExpressDonationInterestResponse,
  GetDonationResponse,
  ListDonationInterestsResponse,
  ListDonationsResponse,
  ListMyDonationsResponse,
  ListPendingDonationsResponse,
  UpdateDonationStatusBody,
  UpdateDonationStatusResponse,
} from "@workspace/api-zod";
import {
  db,
  donationInterestsTable,
  donationsTable,
  studentProfilesTable,
} from "@workspace/db";
import {
  and,
  count,
  desc,
  eq,
  inArray,
} from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { Router, type IRouter, type Request, type Response } from "express";
import { requireStudentProfile } from "../lib/student-access";

const router: IRouter = Router();

type DonationRow = typeof donationsTable.$inferSelect;

async function serializeDonations(rows: DonationRow[], viewerId: string) {
  if (rows.length === 0) return [];

  const donationIds = rows.map((row) => row.id);
  const ownerIds = [
    ...new Set(
      rows
        .map((row) => row.ownerUserId)
        .filter((userId): userId is string => userId !== null),
    ),
  ];

  const [owners, interestCounts, viewerInterests] = await Promise.all([
    ownerIds.length
      ? db
          .select({
            userId: studentProfilesTable.userId,
            displayName: studentProfilesTable.displayName,
          })
          .from(studentProfilesTable)
          .where(inArray(studentProfilesTable.userId, ownerIds))
      : Promise.resolve([]),
    db
      .select({
        donationId: donationInterestsTable.donationId,
        count: count(),
      })
      .from(donationInterestsTable)
      .where(inArray(donationInterestsTable.donationId, donationIds))
      .groupBy(donationInterestsTable.donationId),
    db
      .select({ donationId: donationInterestsTable.donationId })
      .from(donationInterestsTable)
      .where(
        and(
          eq(donationInterestsTable.studentUserId, viewerId),
          inArray(donationInterestsTable.donationId, donationIds),
        ),
      ),
  ]);

  const ownerNames = new Map(owners.map((owner) => [owner.userId, owner.displayName]));
  const counts = new Map(
    interestCounts.map((entry) => [entry.donationId, Number(entry.count)]),
  );
  const interestedIds = new Set(viewerInterests.map((entry) => entry.donationId));

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    category: row.category,
    description: row.description,
    size: row.size,
    condition: row.condition,
    status: row.status,
    imagePath: row.imagePath,
    ownerName: row.ownerUserId ? (ownerNames.get(row.ownerUserId) ?? null) : null,
    createdAt: row.createdAt,
    interestCount: counts.get(row.id) ?? 0,
    isOwner: row.ownerUserId === viewerId,
    isInterested: interestedIds.has(row.id),
  }));
}

function donationIdFrom(req: Request): string | null {
  const raw = req.params.id;
  return typeof raw === "string" ? raw : null;
}

router.get(
  "/donations",
  async (req: Request, res: Response): Promise<void> => {
    const current = await requireStudentProfile(req, res);
    if (!current) return;

    const rows = await db
      .select()
      .from(donationsTable)
      .where(eq(donationsTable.status, "available"))
      .orderBy(desc(donationsTable.createdAt))
      .limit(100);

    res.json(ListDonationsResponse.parse(await serializeDonations(rows, current.userId)));
  },
);

router.post(
  "/donations",
  async (req: Request, res: Response): Promise<void> => {
    const current = await requireStudentProfile(req, res);
    if (!current) return;

    const parsed = CreateDonationBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Confira os campos e a foto do anúncio." });
      return;
    }
    if (!parsed.data.imagePath.startsWith("/objects/")) {
      res.status(400).json({ error: "Envie uma foto pelo formulário." });
      return;
    }

    const [row] = await db
      .insert(donationsTable)
      .values({
        id: randomUUID(),
        ownerUserId: current.userId,
        title: parsed.data.title.trim(),
        category: parsed.data.category,
        description: parsed.data.description?.trim() || null,
        size: parsed.data.size?.trim() || null,
        condition: parsed.data.condition.trim(),
        imagePath: parsed.data.imagePath,
        status: "pending",
      })
      .returning();

    const [donation] = await serializeDonations([row], current.userId);
    res.status(201).json(CreateDonationResponse.parse(donation));
  },
);

router.get(
  "/donations/mine",
  async (req: Request, res: Response): Promise<void> => {
    const current = await requireStudentProfile(req, res);
    if (!current) return;

    const rows = await db
      .select()
      .from(donationsTable)
      .where(eq(donationsTable.ownerUserId, current.userId))
      .orderBy(desc(donationsTable.createdAt))
      .limit(100);

    res.json(ListMyDonationsResponse.parse(await serializeDonations(rows, current.userId)));
  },
);

router.get(
  "/donations/pending",
  async (req: Request, res: Response): Promise<void> => {
    const current = await requireStudentProfile(req, res);
    if (!current) return;
    if (!current.profile.isModerator) {
      res.status(403).json({ error: "Somente a equipe responsável pode revisar anúncios." });
      return;
    }

    const rows = await db
      .select()
      .from(donationsTable)
      .where(eq(donationsTable.status, "pending"))
      .orderBy(desc(donationsTable.createdAt))
      .limit(100);

    res.json(ListPendingDonationsResponse.parse(await serializeDonations(rows, current.userId)));
  },
);

router.get(
  "/donations/:id",
  async (req: Request, res: Response): Promise<void> => {
    const current = await requireStudentProfile(req, res);
    if (!current) return;
    const id = donationIdFrom(req);
    if (!id) {
      res.status(400).json({ error: "Identificador inválido." });
      return;
    }

    const [row] = await db
      .select()
      .from(donationsTable)
      .where(eq(donationsTable.id, id));
    if (!row) {
      res.status(404).json({ error: "Doação não encontrada." });
      return;
    }
    if (
      row.status !== "available" &&
      row.ownerUserId !== current.userId &&
      !current.profile.isModerator
    ) {
      res.status(404).json({ error: "Doação não encontrada." });
      return;
    }

    const [donation] = await serializeDonations([row], current.userId);
    res.json(GetDonationResponse.parse(donation));
  },
);

router.get(
  "/donations/:id/interests",
  async (req: Request, res: Response): Promise<void> => {
    const current = await requireStudentProfile(req, res);
    if (!current) return;
    const id = donationIdFrom(req);
    if (!id) {
      res.status(400).json({ error: "Identificador inválido." });
      return;
    }

    const [row] = await db
      .select()
      .from(donationsTable)
      .where(eq(donationsTable.id, id));
    if (!row) {
      res.status(404).json({ error: "Doação não encontrada." });
      return;
    }
    if (row.ownerUserId !== current.userId && !current.profile.isModerator) {
      res.status(403).json({ error: "Somente a pessoa responsável pode ver os interessados." });
      return;
    }

    const interests = await db
      .select({
        studentName: studentProfilesTable.displayName,
        createdAt: donationInterestsTable.createdAt,
      })
      .from(donationInterestsTable)
      .innerJoin(
        studentProfilesTable,
        eq(donationInterestsTable.studentUserId, studentProfilesTable.userId),
      )
      .where(eq(donationInterestsTable.donationId, id))
      .orderBy(desc(donationInterestsTable.createdAt));

    res.json(ListDonationInterestsResponse.parse(interests));
  },
);

router.post(
  "/donations/:id/interests",
  async (req: Request, res: Response): Promise<void> => {
    const current = await requireStudentProfile(req, res);
    if (!current) return;
    const id = donationIdFrom(req);
    if (!id) {
      res.status(400).json({ error: "Identificador inválido." });
      return;
    }

    const [row] = await db
      .select()
      .from(donationsTable)
      .where(eq(donationsTable.id, id));
    if (!row) {
      res.status(404).json({ error: "Doação não encontrada." });
      return;
    }
    if (row.status !== "available" || row.ownerUserId === current.userId) {
      res.status(409).json({ error: "Esta doação não aceita novas manifestações de interesse." });
      return;
    }

    await db
      .insert(donationInterestsTable)
      .values({ donationId: id, studentUserId: current.userId })
      .onConflictDoNothing({
        target: [
          donationInterestsTable.donationId,
          donationInterestsTable.studentUserId,
        ],
      });

    res.json(ExpressDonationInterestResponse.parse({ interested: true }));
  },
);

router.post(
  "/donations/:id/approve",
  async (req: Request, res: Response): Promise<void> => {
    const current = await requireStudentProfile(req, res);
    if (!current) return;
    if (!current.profile.isModerator) {
      res.status(403).json({ error: "Somente a equipe responsável pode aprovar anúncios." });
      return;
    }
    const id = donationIdFrom(req);
    if (!id) {
      res.status(400).json({ error: "Identificador inválido." });
      return;
    }

    const [row] = await db
      .update(donationsTable)
      .set({ status: "available", updatedAt: new Date() })
      .where(and(eq(donationsTable.id, id), eq(donationsTable.status, "pending")))
      .returning();
    if (!row) {
      const [existing] = await db
        .select({ id: donationsTable.id })
        .from(donationsTable)
        .where(eq(donationsTable.id, id));
      if (!existing) {
        res.status(404).json({ error: "Doação não encontrada." });
        return;
      }
      res.status(409).json({ error: "Esta doação já foi revisada." });
      return;
    }

    const [donation] = await serializeDonations([row], current.userId);
    res.json(ApproveDonationResponse.parse(donation));
  },
);

router.patch(
  "/donations/:id/status",
  async (req: Request, res: Response): Promise<void> => {
    const current = await requireStudentProfile(req, res);
    if (!current) return;
    const id = donationIdFrom(req);
    if (!id) {
      res.status(400).json({ error: "Identificador inválido." });
      return;
    }

    const parsed = UpdateDonationStatusBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Status inválido." });
      return;
    }

    const [existing] = await db
      .select()
      .from(donationsTable)
      .where(eq(donationsTable.id, id));
    if (!existing) {
      res.status(404).json({ error: "Doação não encontrada." });
      return;
    }
    if (existing.ownerUserId !== current.userId) {
      res.status(403).json({ error: "Somente quem publicou pode atualizar este status." });
      return;
    }

    const validTransition =
      (existing.status === "available" && parsed.data.status === "reserved") ||
      (existing.status === "reserved" && parsed.data.status === "delivered");
    if (!validTransition) {
      res.status(409).json({ error: "Esta alteração não é permitida para o status atual." });
      return;
    }

    const [row] = await db
      .update(donationsTable)
      .set({ status: parsed.data.status, updatedAt: new Date() })
      .where(eq(donationsTable.id, id))
      .returning();

    const [donation] = await serializeDonations([row], current.userId);
    res.json(UpdateDonationStatusResponse.parse(donation));
  },
);

export default router;
