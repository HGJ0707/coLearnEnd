import * as path from 'path';

const DEFAULT_WEIGHT = {
  docwork: {
    comment_unit: 2, // 表示一条评论2分
    comment_weight: 20, // 权重为20 ， 表示最高能拿20分
    like_unit: 1,
    like_weight: 5,
    belike_unit: 1,
    belike_weight: 15,
    teacher_mark_weight: 30,
    student_mark_weight: 30,
  },
  videowork: {
    comment_unit: 2, // 表示一条评论2分
    comment_weight: 20, // 权重为20 ， 表示最高能拿20分
    like_unit: 1,
    like_weight: 5,
    belike_unit: 1,
    belike_weight: 15,
    teacher_mark_weight: 30,
    student_mark_weight: 20,
    danmu_unit: 1,
    danmu_weight: 10,
  },
};

export const filePath = path.resolve('./files');
export const docPath = path.resolve('./files/docs/');
export const videoPath = path.resolve('./files/videos/');
export const imgPath = path.resolve('./files/imgs/');
export const uploadPath = path.resolve('./files/upload/');
export const fileIdMap = {
  doc: 'files/docs',
  video: 'files/videos',
  img: 'files/imgs',
};
export { DEFAULT_WEIGHT };
export const file_slice_size = 1024 * 1024 * 6;
