import { createInsertSchema } from "drizzle-zod";
import {
  boolean,
  index,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { z } from "zod/v4";
import { usersTable } from "./auth";

export const studentProfilesTable = pgTable("student_profiles", {
  userId: varchar("user_id")
    .primaryKey()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  displayName: varchar("display_name", { length: 100 }).notNull(),
  // HMAC of the RA using the server-only session secret; the raw RA is never stored.
  raHash: varchar("ra_hash", { length: 64 }).notNull().unique(),
  isModerator: boolean("is_moderator").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const donationsTable = pgTable(
  "donations",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    ownerUserId: varchar("owner_user_id").references(() => usersTable.id, {
      onDelete: "set null",
    }),
    title: varchar("title", { length: 120 }).notNull(),
    category: varchar("category", { length: 32 }).notNull(),
    description: text("description"),
    size: varchar("size", { length: 40 }),
    condition: varchar("condition", { length: 60 }),
    status: varchar("status", { length: 20 }).notNull().default("pending"),
    imagePath: varchar("image_path", { length: 500 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("donations_status_created_at_idx").on(table.status, table.createdAt),
    index("donations_owner_created_at_idx").on(
      table.ownerUserId,
      table.createdAt,
    ),
  ],
);

export const donationInterestsTable = pgTable(
  "donation_interests",
  {
    id: serial("id").primaryKey(),
    donationId: varchar("donation_id", { length: 64 })
      .notNull()
      .references(() => donationsTable.id, { onDelete: "cascade" }),
    studentUserId: varchar("student_user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("donation_interests_donation_student_unique").on(
      table.donationId,
      table.studentUserId,
    ),
    index("donation_interests_donation_idx").on(table.donationId),
  ],
);

export const insertDonationSchema = createInsertSchema(donationsTable, {
  title: (schema) => schema.min(2).max(120),
  description: (schema) => schema.max(1000),
  size: (schema) => schema.max(40),
  condition: (schema) => schema.max(60),
  imagePath: (schema) => schema.min(1).max(500),
});

export type StudentProfile = typeof studentProfilesTable.$inferSelect;
export type Donation = typeof donationsTable.$inferSelect;
export type DonationInterest = typeof donationInterestsTable.$inferSelect;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
