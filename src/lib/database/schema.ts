import { index, integer, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    pk: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const cards = pgTable("cards", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  owner_id: text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  image_key: text(),
  title: text().notNull(),
  player_url: text(),
  episodes_total: integer().default(12).notNull(),
  episodes_watched: integer().default(0).notNull(),
 
  release_day_of_week: integer().notNull().default(1),   // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  release_time: text().notNull().default("12:00"),  // HH:mm (eg 14:30)

  updated_at: timestamp().defaultNow().notNull(),
  created_at: timestamp().defaultNow().notNull(),
}, (card) => ({
  ownerIdIdx: index("cards_owner_id_idx").on(card.owner_id),
}));

