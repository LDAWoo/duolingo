import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    userId: text("user_id").unique(),
    username: text("username").unique().notNull(),
    displayName: text("display_name"),
    email: text("email").unique().notNull(),
    imageSrc: text("image_src"),
    passwordHash: text("password_hash"),
    googleId: text("google_id"),
    facebookId: text("facebook_id"),
    timeStamp: timestamp("time_stamp").defaultNow(),
    isActive: boolean("is_active").default(true),
});

export const followers = pgTable("followers", {
    id: serial("id").primaryKey(),
    followerId: integer("follower_id").references(() => users.id, { onDelete: "cascade" }),
    followingId: integer("following_id").references(() => users.id, { onDelete: "cascade" }),
    timeStamp: timestamp("time_stamp").defaultNow(),
});

export const followersRelations = relations(followers, ({ one }) => ({
    follower: one(users, {
        fields: [followers.followerId],
        references: [users.id],
    }),
    following: one(users, {
        fields: [followers.followingId],
        references: [users.id],
    }),
}));

export const userRelations = relations(users, ({ many }) => ({
    followers: many(followers),
    userProgress: many(userProgress),
}));

export const userProgress = pgTable("user_progress", {
    id: serial("id").primaryKey(),
    hearts: integer("hearts").notNull().default(5),
    points: integer("points").notNull().default(5),
    gems: integer("gems").notNull().default(500),
    userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
    activeCourseId: integer("active_course_id").references(() => courses.id, { onDelete: "cascade" }),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id],
    }),
}));

export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
    userProgress: many(userProgress),
    units: many(units),
}));

export const unitsEnum = pgEnum("unit_type", ["image", "json"]);

export const units = pgTable("units", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    order: integer("order").notNull(),
    src: text("src").notNull(),
    type: unitsEnum("unit_type"),
    courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }),
    stylesId: integer("styles_id").references(() => styles.id),
});

export const styles = pgTable("styles", {
    id: serial("id").primaryKey(),
    backgroundColor: text("background_color").notNull().default("rgb(88, 204, 2)"),
    color: text("text_color").notNull().default("rgb(255, 255, 255)"),
});

export const unitsRelations = relations(units, ({ one, many }) => ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id],
    }),
    style: one(styles, {
        fields: [units.stylesId],
        references: [styles.id],
    }),
    lessons: many(lessons),
}));

export const lessons = pgTable("lessons", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("imageSrc").notNull(),
    order: integer("order").notNull(),
    unitId: integer("unit_id").references(() => units.id, { onDelete: "cascade" }),
});

export const lessonRelations = relations(lessons, ({ one, many }) => ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id],
    }),
    levels: many(levels),
}));

export const levels = pgTable("levels", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    order: integer("order").notNull(),
    lessonId: integer("lesson_id").references(() => lessons.id, { onDelete: "cascade" }),
});

export const levelRelations = relations(levels, ({ one, many }) => ({
    lesson: one(lessons, {
        fields: [levels.lessonId],
        references: [lessons.id],
    }),
    challenges: many(challenges),
}));

export const challengesEnum = pgEnum("challenge_type", ["SELECT", "ASSIST", "LISTEN", "MATCH", "CONVERSATION"]);

export const challenges = pgTable("challenges", {
    id: serial("id").primaryKey(),
    leverId: integer("level_id").references(() => levels.id, { onDelete: "cascade" }),
    type: challengesEnum("challenge_type"),
    question: text("question"),
    order: integer("order").notNull(),
    audioSrc: text("audio_src"),
    imageSrc: text("image_src"),
});

export const challengesRelations = relations(challenges, ({ one, many }) => ({
    level: one(levels, {
        fields: [challenges.leverId],
        references: [levels.id],
    }),
    challengeOptions: many(challengeOptions),
    challengeParts: many(challengeParts),
    challengeProgress: many(challengeProgress),
}));

export const challengeOptions = pgTable("challenge_options", {
    id: serial("id").primaryKey(),
    challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade" }),
    text: text("text").notNull(),
    correct: boolean("correct").notNull(),
    imageSrc: text("image_src"),
    audioSrc: text("audio_src"),
});

export const challengeOptionsRelations = relations(challengeOptions, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeOptions.challengeId],
        references: [challenges.id],
    }),
}));

export const challengeParts = pgTable("challenge_parts", {
    id: serial("id").primaryKey(),
    challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade" }),
    text: text("text").notNull(),
    correct: boolean("correct").notNull(),
    order: integer("order").notNull(),
    imageSrc: text("image_src"),
    audioSrc: text("audio_src"),
});

export const challengePartsRelations = relations(challengeParts, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeParts.challengeId],
        references: [challenges.id],
    }),
}));

export const challengeProgress = pgTable("challenge_progress", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull(),
    challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade" }),
    completed: boolean("complete").notNull().default(false),
});

export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeProgress.challengeId],
        references: [challenges.id],
    }),
}));
