import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { collection, organization, reminder } from "./schema";

export type GetReminders = InferSelectModel<typeof reminder>;
export type InsertReminder = InferInsertModel<typeof reminder>;

export type GetCollections = InferSelectModel<typeof collection>;
export type InsertCollection = InferInsertModel<typeof collection>;

export type GetOrganizations = InferSelectModel<typeof organization>;
export type InsertOrganization = InferInsertModel<typeof organization>;
