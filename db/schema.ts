import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

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

export const userRelations = relations(users, ({ many }) => ({
    followers: many(followers),
    userProgress: many(userProgress),
    steaks: many(steaks),
    leaderboards: many(leaderboards),
    experiences: many(experiences),
}));

export const userProgress = pgTable("user_progress", {
    id: serial("id").primaryKey(),
    hearts: integer("hearts").notNull().default(5),
    points: integer("points").notNull().default(0),
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

export const experiences = pgTable("experiences", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
    score: integer("score").default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const experienceRelations = relations(experiences, ({ one }) => ({
    user: one(users, {
        fields: [experiences.userId],
        references: [users.id],
    }),
}));

export const leagues = pgTable("leagues", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    imageSrc: text("image_src").notNull(),
    order: integer("order").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const leagueRelations = relations(leagues, ({ many }) => ({
    leaderboards: many(leaderboards),
}));

export const leaderboards = pgTable("leaderboards", {
    id: serial("id").primaryKey(),
    leagueId: integer("league_id").references(() => leagues.id, { onDelete: "cascade" }),
    userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
    score: integer("score").default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const leaderboardRelations = relations(leaderboards, ({ one, many }) => ({
    user: one(users, {
        fields: [leaderboards.userId],
        references: [users.id],
    }),
    league: one(leagues, {
        fields: [leaderboards.leagueId],
        references: [leagues.id],
    }),
}));

export const steaksEnum = pgEnum("steak_type", ["current", "previous", "longest"]);

export const steaks = pgTable(
    "steaks",
    {
        id: serial("id").primaryKey(),
        userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
        type: steaksEnum("steak_type").notNull(),
        startDate: timestamp("start_date").defaultNow().notNull(),
        endDate: timestamp("end_date").defaultNow().notNull(),
        lastExtendedDate: timestamp("last_extended_date").defaultNow().notNull(),
        achieveDate: timestamp("achieve_date").defaultNow().notNull(),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at").defaultNow(),
    },
    (steaks) => ({
        uniqueUserType: uniqueIndex("unique_user_type").on(steaks.userId, steaks.type),
    })
);

export const steakRelations = relations(steaks, ({ one }) => ({
    user: one(users, {
        fields: [steaks.userId],
        references: [users.id],
    }),
}));

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

export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
});

export const alphabets = pgTable("alphabets", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    title: text("title").notNull(),
    courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
});

export const characters = pgTable("characters", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    transliteration: text("transliteration").notNull(),
    audioSrc: text("audio_src").notNull(),
    alphabetId: integer("alphabet_id").references(() => alphabets.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
});

export const alphabetsRelations = relations(alphabets, ({ one, many }) => ({
    course: one(courses, {
        fields: [alphabets.courseId],
        references: [courses.id],
    }),
    characters: many(characters),
}));

export const charactersRelations = relations(characters, ({ one, many }) => ({
    alphabet: one(alphabets, {
        fields: [characters.alphabetId],
        references: [alphabets.id],
    }),
    characterChallenges: many(characterChallenges),
}));

export const characterChallengesEnum = pgEnum("character_challenge_type", ["LISTEN", "LISTEN_AND_SELECT"]);

export const characterChallenges = pgTable("character_challenges", {
    id: serial("id").primaryKey(),
    characterId: integer("character_id").references(() => characters.id, { onDelete: "cascade" }),
    type: characterChallengesEnum("character_challenge_type"),
    order: integer("order").notNull(),
});

export const characterChallengesRelations = relations(characterChallenges, ({ one, many }) => ({
    characterChallengeAnswers: many(characterChallengeAnswers),
    characterChallengeOptions: many(characterChallengeOptions),
    character: one(characters, {
        fields: [characterChallenges.characterId],
        references: [characters.id],
    }),
}));

export const characterChallengeAnswers = pgTable("character_challenge_answers", {
    id: serial("id").primaryKey(),
    characterChallengeId: integer("character_challenge_id").references(() => characterChallenges.id, { onDelete: "cascade" }),
    answer: text("answer").notNull(),
    audioSrc: text("audio_src").notNull(),
    order: integer("order").notNull(),
});

export const characterChallengeOptions = pgTable("character_challenge_options", {
    id: serial("id").primaryKey(),
    characterChallengeId: integer("character_challenge_id").references(() => characterChallenges.id, { onDelete: "cascade" }),
    text: text("text").notNull(),
    correct: boolean("correct").notNull(),
    imageSrc: text("image_src"),
    audioSrc: text("audio_src"),
});

export const characterChallengeOptionsRelations = relations(characterChallengeOptions, ({ one, many }) => ({
    characterChallenge: one(characterChallenges, {
        fields: [characterChallengeOptions.characterChallengeId],
        references: [characterChallenges.id],
    }),
}));

export const characterChallengeProgress = pgTable("character_challenge_progress", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull(),
    characterChallengeId: integer("character_challenge_id").references(() => challenges.id, { onDelete: "cascade" }),
    completed: boolean("complete").notNull().default(false),
});

export const characterChallengeProgressRelations = relations(characterChallengeProgress, ({ one }) => ({
    characterChallenges: one(characterChallenges, {
        fields: [characterChallengeProgress.characterChallengeId],
        references: [characterChallenges.id],
    }),
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

export const challengesEnum = pgEnum("challenge_type", ["SELECT", "ASSIST", "LISTEN", "MATCH", "CONVERSATION", "FILL"]);

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
