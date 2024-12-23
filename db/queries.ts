import { currentUser } from "@/lib/current-user";
import { getFromCache, saveToCache, shuffle } from "@/lib/redis";
import { Steak } from "@/lib/types";
import { format } from "date-fns";
import { and, eq } from "drizzle-orm";
import { cache } from "react";
import db from "./drizzle";
import { alphabets, challengeProgress, courses, experiences, followers, lessons, steaks, units, userProgress, users } from "./schema";

type NormalizedData = {
    [key: string]: Steak;
};

export const getUserByUserId = cache(async (userId: string) => {
    const cacheKey = `user:${userId}`;
    const cachedUser = await getFromCache(cacheKey);

    if (cachedUser) {
        return cachedUser;
    }

    const data = await db.query.users.findFirst({
        where: eq(users.userId, userId),
    });

    if (data) {
        await saveToCache(cacheKey, data);
    }

    return data;
});

export const getUserById = cache(async (id: number) => {
    const cacheKey = `user:${id}`;
    const cachedUser = await getFromCache(cacheKey);

    if (cachedUser) {
        return cachedUser;
    }

    const data = await db.query.users.findFirst({
        where: eq(users.id, id),
    });

    if (data) {
        await saveToCache(cacheKey, data);
    }

    return data;
});

export const getUserByEmail = cache(async (email: string) => {
    const data = await db.query.users.findFirst({
        where: eq(users.email, email),
    });
    return data;
});

export const getUser = cache(async () => {
    let user = await currentUser();

    if (!user) {
        return null;
    }
    const username = user.username;
    const userProgressData = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, user.id),
        with: {
            activeCourse: true,
        },
    });
    const steaks = await getSteaks(username);
    const experiences = await getExperiences(username);

    return {
        ...user,
        ...experiences,
        userProgress: userProgressData,
        steaks,
    };
});

export const getUserByUserName = cache(async (username: string) => {
    const decodedUsername = decodeURIComponent(username);
    const data = await db.query.users.findFirst({
        where: eq(users.username, decodedUsername),
    });
    return data;
});

export const getUserProfileByUserName = cache(async (username: string) => {
    const decodedUsername = decodeURIComponent(username);
    const userProfile = await db.query.users.findFirst({
        where: eq(users.username, decodedUsername),
    });

    const steaks = await getSteaks(username);
    const experiences = await getExperiences(username);

    return {
        ...userProfile,
        ...experiences,
        steaks,
    };
});

export const getCourses = cache(async () => {
    const cacheKey = `courses`;
    const cachedData = await getFromCache(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const data = await db.query.courses.findMany();

    if (data) {
        await saveToCache(cacheKey, data);
    }

    return data;
});

export const getUserProgress = cache(async (username?: string) => {
    let user = await currentUser();

    if (!user) {
        return null;
    }

    if (username) {
        user = await getUserByUserName(username);
    }

    if (!user) {
        return null;
    }

    const userId = user.id;

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        },
    });

    return data;
});

export const getCourseById = cache(async (courseId: number) => {
    const cacheKey = `course:${courseId}`;
    const cachedCourse = await getFromCache(cacheKey);

    if (cachedCourse) {
        return cachedCourse;
    }

    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
    });

    if (data) {
        await saveToCache(cacheKey, data);
    }

    return data;
});

export const getUnits = cache(async () => {
    const [user, userProgress] = await Promise.all([currentUser(), getUserProgress()]);

    if (!userProgress?.activeCourseId || !userProgress?.userId || !user) {
        return [];
    }

    const cacheKey = `user:${user.id}:course:${userProgress.activeCourseId}:units`;
    const cachedUnits = await getFromCache(cacheKey);

    if (cachedUnits) {
        console.log("Retrieving units from cache");

        return cachedUnits;
    }

    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        orderBy: (unit, { asc }) => [asc(unit.order)],
        with: {
            lessons: {
                with: {
                    levels: {
                        with: {
                            challenges: {
                                with: {
                                    challengeProgress: {
                                        where: eq(challengeProgress.userId, user?.id),
                                    },
                                    challengeOptions: true,
                                },
                            },
                        },
                    },
                },
            },
            style: true,
        },
    });

    const normalizedData = data.map((unit) => {
        const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
            const levelsWithCompletedStatus = lesson.levels.map((level) => {
                if (level.challenges.length === 0) {
                    return {
                        ...level,
                        completed: false,
                    };
                }

                const allCompletedLevels = level.challenges.every((challenge) => {
                    const hasChallengeProgress = challenge.challengeProgress && challenge.challengeProgress.length > 0;
                    const allChallengeProgressCompleted = hasChallengeProgress ? challenge.challengeProgress.every((progress) => progress.completed) : false;

                    return challenge.challengeOptions && allChallengeProgressCompleted;
                });

                return {
                    ...level,
                    completed: allCompletedLevels,
                };
            });

            return {
                ...lesson,
                levels: levelsWithCompletedStatus,
            };
        });

        return {
            ...unit,
            lessons: lessonsWithCompletedStatus,
        };
    });

    await saveToCache(cacheKey, normalizedData);

    return normalizedData;
});

export const getCourseProgress = cache(async () => {
    const user = await currentUser();
    const userProgress = await getUserProgress();

    if (!userProgress?.activeCourseId) {
        return null;
    }

    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: (unit, { asc }) => [asc(unit.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                with: {
                    unit: true,
                    levels: {
                        with: {
                            challenges: {
                                with: {
                                    challengeProgress: {
                                        where: eq(challengeProgress.userId, user.id),
                                    },
                                    challengeOptions: true,
                                    challengeParts: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    const firstIncompleteLevel = unitsInActiveCourse
        .flatMap((unit) => unit.lessons)
        .flatMap((lesson) => lesson.levels)
        .find((level) => {
            return level?.challenges.some((challenge) => {
                return !challenge.challengeProgress || challenge.challengeProgress.length === 0;
            });
        });

    return {
        activeLevelLesson: firstIncompleteLevel,
        activeLevelLessonId: firstIncompleteLevel?.lessonId,
    };
});

export const getLesson = cache(async (id?: number) => {
    const user = await currentUser();
    if (!user) {
        return null;
    }
    const courseProgress = await getCourseProgress();

    const lessonId = id || courseProgress?.activeLevelLessonId;

    if (!lessonId) {
        return null;
    }

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            unit: true,
            levels: {
                with: {
                    challenges: {
                        orderBy: (challenges, { asc }) => [asc(challenges.order)],
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, user.id),
                            },
                            challengeOptions: true,
                            challengeParts: {
                                orderBy: (challengeParts, { asc }) => [asc(challengeParts.order)],
                            },
                            challengeQuestions: {
                                with: {
                                    challengeQuestionTranslations: true,
                                },
                                orderBy: (challengeQuestions, { asc }) => [asc(challengeQuestions.order)],
                            },
                        },
                    },
                },
            },
        },
    });

    if (!data || !data.levels) return null;

    const levels = data.levels.map((level) => {
        const challengesWithCompletedStatus = level.challenges.map((challenge) => {
            const completed = challenge.challengeProgress?.length > 0 && challenge.challengeProgress.every((progress) => progress.completed);

            const shuffledParts = shuffle([...challenge.challengeParts]);

            return {
                ...challenge,
                completed,
                challengeParts: shuffledParts,
            };
        });

        const levelCompleted = challengesWithCompletedStatus.every((challenge) => challenge.completed);

        return {
            ...level,
            challenges: challengesWithCompletedStatus,
            completed: levelCompleted,
        };
    });

    const lesson = levels.find((level) => !level?.completed);

    return {
        levels,
        lesson,
    };
});

export const getLessonPercentage = cache(async () => {
    const courseProgress = await getCourseProgress();

    if (!courseProgress?.activeLevelLessonId) return 0;

    const data = await getLesson(courseProgress.activeLevelLessonId);

    if (!data || !data.levels || data.levels.length === 0) return 0;

    const completeLevels = data.levels.filter((level) => level.completed);
    const percentage = Math.floor((completeLevels.length / data.levels.length) * 100);

    return percentage;
});

export const getAlphabets = cache(async () => {
    const [user, userProgress] = await Promise.all([currentUser(), getUserProgress()]);

    if (!userProgress?.activeCourseId || !userProgress?.userId || !user) {
        return [];
    }

    const cacheKey = `user:${user.id}:course:${userProgress.activeCourseId}:alphabets`;
    const cachedAlphabets = await getFromCache(cacheKey);

    if (cachedAlphabets) {
        console.log("Retrieving alphabets from cache");
        return cachedAlphabets;
    }

    const data = await db.query.alphabets.findMany({
        where: eq(alphabets.courseId, userProgress.activeCourseId),
        with: {
            characters: true,
        },
    });
    return data;
});

export const getSteaks = cache(async (username?: string) => {
    let user = await currentUser();

    if (!user) {
        return null;
    }

    if (username) {
        user = await getUserByUserName(username);
    }

    if (!user) {
        return null;
    }

    const userId = user.id;

    const data = await db.query.steaks.findMany({
        where: eq(steaks.userId, userId),
    });

    if (data && data?.length > 0) {
        const normalizedData = data.reduce<NormalizedData>((acc, item: typeof steaks.$inferSelect) => {
            acc[item.type + "Steak"] = {
                startDate: format(new Date(item.startDate), "yyyy-MM-dd"),
                endDate: format(new Date(item.endDate), "yyyy-MM-dd"),
                lastExtendedDate: format(new Date(item.lastExtendedDate), "yyyy-MM-dd"),
                achieveDate: format(new Date(item.achieveDate), "yyyy-MM-dd"),
                length: item.startDate && item.endDate ? Math.max((item.endDate.getTime() - item.startDate.getTime()) / (1000 * 60 * 60 * 24), 0) + 1 : 0,
            };
            return acc;
        }, {});

        return normalizedData;
    }

    return null;
});

const getUserDetails = async (userId: number, userLoginId: number) => {
    const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
        columns: {
            id: true,
            userId: true,
            username: true,
            displayName: true,
            imageSrc: true,
        },
    });

    const userExperiences = await db.query.experiences.findMany({
        where: eq(experiences.userId, userId),
        columns: {
            score: true,
        },
    });

    const totalExperiences = userExperiences.reduce((acc, experience) => {
        if (experience.score) {
            return acc + experience.score;
        }
        return acc;
    }, 0);

    const isFollowing = await db.query.followers.findFirst({
        where: and(eq(followers.followerId, userLoginId), eq(followers.followingId, userId)),
    });

    const isFollowedBy = await db.query.followers.findFirst({
        where: and(eq(followers.followerId, userId), eq(followers.followingId, userLoginId)),
    });

    const canFollow = userId !== userLoginId;

    return {
        id: user?.id || 0,
        userId: user?.userId || "",
        username: user?.username || "",
        displayName: user?.displayName || "",
        picture: user?.imageSrc || "",
        totalXp: totalExperiences || 0,
        isFollowing: !!isFollowing,
        isFollowedBy: !!isFollowedBy,
        canFollow: canFollow,
    };
};

export const getFollowers = cache(async (username?: string) => {
    const userLogin = await currentUser();
    if (!userLogin) return null;

    const user = username ? await getUserByUserName(username) : null;
    if (!user) return null;

    const userId = user.id;

    const followersData = await db.query.followers.findMany({
        where: eq(followers.followingId, userId),
    });

    const followerIds = followersData.map((follower) => follower.followerId);

    const followerDetails = await Promise.all(followerIds.map((followerId) => (followerId ? getUserDetails(followerId, userLogin.id) : null)));

    return followerDetails;
});

export const getFollowings = cache(async (username?: string) => {
    const userLogin = await currentUser();
    if (!userLogin) return null;

    const user = username ? await getUserByUserName(username) : null;
    if (!user) return null;

    const userId = user.id;

    const followingData = await db.query.followers.findMany({
        where: eq(followers.followerId, userId),
    });

    const followingIds = followingData.map((following) => following.followingId);

    const followingDetails = await Promise.all(followingIds.map((followingId) => (followingId ? getUserDetails(followingId, userLogin.id) : null)));

    return followingDetails;
});

export const getExperiences = cache(async (username: string) => {
    let user = await currentUser();

    if (!user) {
        return null;
    }

    if (username) {
        user = await getUserByUserName(username);
    }

    if (!user) {
        return null;
    }

    const userId = user.id;

    const userExperiences = await db.query.experiences.findMany({
        where: eq(experiences.userId, userId),
        columns: {
            score: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    const totalExperiences = userExperiences.reduce((acc, experience) => {
        if (experience.score) {
            return acc + experience.score;
        }
        return acc;
    }, 0);

    return {
        totalExp: totalExperiences,
        experiences: userExperiences,
    };
});
