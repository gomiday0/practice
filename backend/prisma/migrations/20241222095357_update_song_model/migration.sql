-- CreateTable
CREATE TABLE "Song" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "title" STRING NOT NULL,
    "difficulty" STRING NOT NULL,
    "achievementRate" STRING NOT NULL,
    "skill" STRING NOT NULL,
    "type" STRING NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);
