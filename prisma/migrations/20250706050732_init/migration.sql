-- DropIndex
DROP INDEX `users_uid_idx` ON `users`;

-- CreateTable
CREATE TABLE `user_marks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` INTEGER NOT NULL,
    `work_id` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `marks_work_id`(`work_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teachers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` INTEGER NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `phone_num` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teacher_marks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacher_id` INTEGER NOT NULL,
    `work_id` INTEGER NOT NULL,
    `mark` INTEGER NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `mark_teacher_id`(`teacher_id`),
    INDEX `mark_teacher_work_id`(`work_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teacher_remarks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` INTEGER NOT NULL,
    `teacher_id` INTEGER NOT NULL,
    `work_id` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `teacher_comment_id`(`teacher_id`),
    INDEX `teacher_comment_workid`(`work_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teacher_comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacher_id` INTEGER NOT NULL,
    `work_id` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `teacher_comment_id`(`teacher_id`),
    INDEX `teacher_comment_workid`(`work_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `student_id` VARCHAR(255) NOT NULL,
    `uid` INTEGER NOT NULL,
    `teacher_id` INTEGER NOT NULL,
    `class_name` VARCHAR(255) NOT NULL,
    `student_name` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(255) NOT NULL DEFAULT '1',
    `password` VARCHAR(255) NOT NULL DEFAULT '123456',
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `teacher_id`(`teacher_id`),
    PRIMARY KEY (`student_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student_reply_like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` VARCHAR(191) NOT NULL,
    `reply_id` INTEGER NOT NULL,
    `like` INTEGER NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `student_reply_like_id`(`reply_id`),
    INDEX `student_reply_like`(`student_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student_marks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` VARCHAR(191) NOT NULL,
    `work_id` INTEGER NOT NULL,
    `mark` INTEGER NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `mark_student_id`(`student_id`),
    INDEX `mark_work_id`(`work_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student_danmu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` VARCHAR(191) NOT NULL,
    `work_id` INTEGER NOT NULL,
    `danmu_content` TEXT NOT NULL,
    `danmu_time` INTEGER NOT NULL DEFAULT 0,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `mark_student_id`(`student_id`),
    INDEX `mark_work_id`(`work_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student_danmu_like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` VARCHAR(191) NOT NULL,
    `danmu_id` INTEGER NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `student_reply_like`(`student_id`),
    INDEX `student_reply_id_like`(`danmu_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `student_comment_like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` VARCHAR(191) NOT NULL,
    `comment_id` INTEGER NOT NULL,
    `like` INTEGER NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `like_student_id`(`student_id`),
    INDEX `like_comment_id`(`comment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `works` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `work_title` VARCHAR(255) NOT NULL,
    `like_count` INTEGER NOT NULL DEFAULT 0,
    `jon_url` VARCHAR(191) NOT NULL,
    `cover_url` VARCHAR(191) NOT NULL,
    `pageviews` INTEGER NOT NULL DEFAULT 0,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `works_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `work_pv` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` INTEGER NOT NULL,
    `work_id` INTEGER NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `pv_work_id`(`work_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `work_like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` INTEGER NOT NULL,
    `work_id` INTEGER NOT NULL,
    `is_like` INTEGER NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teacher_id` INTEGER NOT NULL,
    `course_name` VARCHAR(255) NOT NULL,
    `course_desc` VARCHAR(255) NOT NULL,
    `course_img` VARCHAR(255) NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `course_teacher`(`teacher_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classes` (
    `class_name` VARCHAR(255) NOT NULL,
    `teacher_id` INTEGER NOT NULL,
    `grade` VARCHAR(255) NOT NULL,
    `major` VARCHAR(255) NOT NULL,
    `class` VARCHAR(255) NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `teacherid`(`teacher_id`),
    PRIMARY KEY (`class_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `work_id` INTEGER NOT NULL,
    `parent_id` INTEGER NOT NULL,
    `comment_user_uid` INTEGER NOT NULL,
    `comment_user` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `like_count` INTEGER NOT NULL DEFAULT 0,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `comments_work_id`(`work_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment_like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` INTEGER NOT NULL,
    `comment_id` INTEGER NOT NULL,
    `is_like` INTEGER NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `like_comment`(`comment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reply` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment_id` INTEGER NOT NULL,
    `reply_user` VARCHAR(191) NOT NULL,
    `reply_to_user` VARCHAR(191) NOT NULL,
    `reply_content` TEXT NOT NULL,
    `like_count` INTEGER NOT NULL DEFAULT 0,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `reply_comment_id`(`comment_id`),
    INDEX `reply_user_id`(`reply_user`),
    INDEX `reply_to_user_id`(`reply_to_user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groups` (
    `id` VARCHAR(255) NOT NULL,
    `task_id` INTEGER NOT NULL,
    `group_leader` VARCHAR(255) NOT NULL,
    `group_name` VARCHAR(255) NOT NULL,
    `work_id` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `group_task_id`(`task_id`),
    INDEX `group_group_leader`(`group_leader`),
    INDEX `group_work_id`(`work_id`),
    PRIMARY KEY (`task_id`, `group_leader`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groups_student` (
    `id` INTEGER NOT NULL,
    `task_id` INTEGER NOT NULL,
    `work_id` INTEGER NOT NULL,
    `group_leader` VARCHAR(255) NOT NULL,
    `group_name` VARCHAR(255) NOT NULL,
    `score` INTEGER NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `group_task_id`(`task_id`),
    INDEX `group_leader`(`group_leader`),
    PRIMARY KEY (`task_id`, `group_leader`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `group_members` (
    `task_id` INTEGER NOT NULL,
    `leader_id` VARCHAR(255) NOT NULL,
    `student_id` VARCHAR(255) NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `mermbers_leader_id`(`leader_id`),
    INDEX `members_student_id`(`student_id`),
    PRIMARY KEY (`task_id`, `student_id`, `leader_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `choose_course` (
    `course_id` INTEGER NOT NULL,
    `class_name` VARCHAR(255) NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `course_id`(`course_id`),
    PRIMARY KEY (`class_name`, `course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `barrages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` INTEGER NOT NULL,
    `work_id` INTEGER NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `danmu_time` INTEGER NOT NULL DEFAULT 0,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    INDEX `mark_work_id`(`work_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tasks` (
    `course_id` INTEGER NOT NULL,
    `task_id` INTEGER NOT NULL,
    `task_title` VARCHAR(255) NOT NULL,
    `task_type` VARCHAR(255) NOT NULL,
    `task_desc` VARCHAR(255) NOT NULL,
    `desc_file_url` VARCHAR(255) NOT NULL,
    `deadline` VARCHAR(255) NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `tasks_task_id_key`(`task_id`),
    INDEX `tasks_course_id`(`course_id`),
    PRIMARY KEY (`course_id`, `task_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `score_weight` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` INTEGER NOT NULL,
    `work_type` VARCHAR(255) NOT NULL DEFAULT 'videowork',
    `comment_unit` INTEGER NOT NULL,
    `comment_weight` INTEGER NOT NULL,
    `like_unit` INTEGER NOT NULL,
    `like_weight` INTEGER NOT NULL,
    `belike_unit` INTEGER NOT NULL,
    `belike_weight` INTEGER NOT NULL,
    `teacher_mark_weight` INTEGER NOT NULL,
    `student_mark_weight` INTEGER NOT NULL,
    `danmu_unit` INTEGER NOT NULL DEFAULT 0,
    `danmu_weight` INTEGER NOT NULL,
    `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_time` DATETIME(3) NOT NULL,
    `state` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_marks` ADD CONSTRAINT `user_marks_work_id_fkey` FOREIGN KEY (`work_id`) REFERENCES `works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teacher_marks` ADD CONSTRAINT `teacher_marks_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teacher_marks` ADD CONSTRAINT `teacher_marks_work_id_fkey` FOREIGN KEY (`work_id`) REFERENCES `works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teacher_remarks` ADD CONSTRAINT `teacher_remarks_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teacher_remarks` ADD CONSTRAINT `teacher_remarks_work_id_fkey` FOREIGN KEY (`work_id`) REFERENCES `works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teacher_comments` ADD CONSTRAINT `teacher_comments_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teacher_comments` ADD CONSTRAINT `teacher_comments_work_id_fkey` FOREIGN KEY (`work_id`) REFERENCES `works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_class_name_fkey` FOREIGN KEY (`class_name`) REFERENCES `classes`(`class_name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_reply_like` ADD CONSTRAINT `student_reply_like_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_reply_like` ADD CONSTRAINT `student_reply_like_reply_id_fkey` FOREIGN KEY (`reply_id`) REFERENCES `reply`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_marks` ADD CONSTRAINT `student_marks_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_marks` ADD CONSTRAINT `student_marks_work_id_fkey` FOREIGN KEY (`work_id`) REFERENCES `works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_danmu` ADD CONSTRAINT `student_danmu_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_danmu` ADD CONSTRAINT `student_danmu_work_id_fkey` FOREIGN KEY (`work_id`) REFERENCES `works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_danmu_like` ADD CONSTRAINT `student_danmu_like_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_danmu_like` ADD CONSTRAINT `student_danmu_like_danmu_id_fkey` FOREIGN KEY (`danmu_id`) REFERENCES `student_danmu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_comment_like` ADD CONSTRAINT `student_comment_like_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_comment_like` ADD CONSTRAINT `student_comment_like_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_pv` ADD CONSTRAINT `work_pv_work_id_fkey` FOREIGN KEY (`work_id`) REFERENCES `works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_like` ADD CONSTRAINT `work_like_work_id_fkey` FOREIGN KEY (`work_id`) REFERENCES `works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `courses_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `classes_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_work_id_fkey` FOREIGN KEY (`work_id`) REFERENCES `works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment_like` ADD CONSTRAINT `comment_like_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reply` ADD CONSTRAINT `reply_reply_user_fkey` FOREIGN KEY (`reply_user`) REFERENCES `students`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reply` ADD CONSTRAINT `reply_reply_to_user_fkey` FOREIGN KEY (`reply_to_user`) REFERENCES `students`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reply` ADD CONSTRAINT `reply_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `comments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groups` ADD CONSTRAINT `groups_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `tasks`(`task_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groups` ADD CONSTRAINT `groups_group_leader_fkey` FOREIGN KEY (`group_leader`) REFERENCES `students`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groups` ADD CONSTRAINT `groups_work_id_fkey` FOREIGN KEY (`work_id`) REFERENCES `works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groups_student` ADD CONSTRAINT `groups_student_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `tasks`(`task_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groups_student` ADD CONSTRAINT `groups_student_group_leader_fkey` FOREIGN KEY (`group_leader`) REFERENCES `students`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groups_student` ADD CONSTRAINT `groups_student_work_id_fkey` FOREIGN KEY (`work_id`) REFERENCES `works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_members` ADD CONSTRAINT `group_members_task_id_leader_id_fkey` FOREIGN KEY (`task_id`, `leader_id`) REFERENCES `groups`(`task_id`, `group_leader`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_members` ADD CONSTRAINT `group_members_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `students`(`student_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `choose_course` ADD CONSTRAINT `choose_course_class_name_fkey` FOREIGN KEY (`class_name`) REFERENCES `classes`(`class_name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `choose_course` ADD CONSTRAINT `choose_course_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `barrages` ADD CONSTRAINT `barrages_work_id_fkey` FOREIGN KEY (`work_id`) REFERENCES `works`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
