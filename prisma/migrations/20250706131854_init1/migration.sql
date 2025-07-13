-- AddForeignKey
ALTER TABLE `teachers` ADD CONSTRAINT `teachers_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
