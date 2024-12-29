-- CreateTable
CREATE TABLE "mst_user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mst_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mst_link" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "short_url" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "mst_link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mst_user_email_key" ON "mst_user"("email");

-- AddForeignKey
ALTER TABLE "mst_link" ADD CONSTRAINT "mst_link_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "mst_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
