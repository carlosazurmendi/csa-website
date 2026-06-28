import * as migration_20260624_191830_initial from './20260624_191830_initial';
import * as migration_20260625_143450_m2_content_model from './20260625_143450_m2_content_model';
import * as migration_20260626_001000_m3_experience_case_relationship from './20260626_001000_m3_experience_case_relationship';
import * as migration_20260626_002000_m4_free_training_release_status from './20260626_002000_m4_free_training_release_status';
import * as migration_20260626_003000_m5_free_training_type_cta from './20260626_003000_m5_free_training_type_cta';
import * as migration_20260626_004000_m6_media_imagesizes_home_images from './20260626_004000_m6_media_imagesizes_home_images';
import * as migration_20260626_005000_m7_lesson_video_url from './20260626_005000_m7_lesson_video_url';
import * as migration_20260626_006000_m8_course_enroll_cta_label from './20260626_006000_m8_course_enroll_cta_label';
import * as migration_20260627_130005_m9_lesson_quiz_keypoints from './20260627_130005_m9_lesson_quiz_keypoints';
import * as migration_20260627_140000_m10_lesson_resource_meta from './20260627_140000_m10_lesson_resource_meta';
import * as migration_20260627_150000_m11_certificate_metadata from './20260627_150000_m11_certificate_metadata';
import * as migration_20260627_160000_m12_safety_chat from './20260627_160000_m12_safety_chat';
import * as migration_20260628_010000_m13_order_idempotency from './20260628_010000_m13_order_idempotency';

export const migrations = [
  {
    up: migration_20260624_191830_initial.up,
    down: migration_20260624_191830_initial.down,
    name: '20260624_191830_initial',
  },
  {
    up: migration_20260625_143450_m2_content_model.up,
    down: migration_20260625_143450_m2_content_model.down,
    name: '20260625_143450_m2_content_model',
  },
  {
    up: migration_20260626_001000_m3_experience_case_relationship.up,
    down: migration_20260626_001000_m3_experience_case_relationship.down,
    name: '20260626_001000_m3_experience_case_relationship',
  },
  {
    up: migration_20260626_002000_m4_free_training_release_status.up,
    down: migration_20260626_002000_m4_free_training_release_status.down,
    name: '20260626_002000_m4_free_training_release_status',
  },
  {
    up: migration_20260626_003000_m5_free_training_type_cta.up,
    down: migration_20260626_003000_m5_free_training_type_cta.down,
    name: '20260626_003000_m5_free_training_type_cta',
  },
  {
    up: migration_20260626_004000_m6_media_imagesizes_home_images.up,
    down: migration_20260626_004000_m6_media_imagesizes_home_images.down,
    name: '20260626_004000_m6_media_imagesizes_home_images',
  },
  {
    up: migration_20260626_005000_m7_lesson_video_url.up,
    down: migration_20260626_005000_m7_lesson_video_url.down,
    name: '20260626_005000_m7_lesson_video_url',
  },
  {
    up: migration_20260626_006000_m8_course_enroll_cta_label.up,
    down: migration_20260626_006000_m8_course_enroll_cta_label.down,
    name: '20260626_006000_m8_course_enroll_cta_label',
  },
  {
    up: migration_20260627_130005_m9_lesson_quiz_keypoints.up,
    down: migration_20260627_130005_m9_lesson_quiz_keypoints.down,
    name: '20260627_130005_m9_lesson_quiz_keypoints'
  },
  {
    up: migration_20260627_140000_m10_lesson_resource_meta.up,
    down: migration_20260627_140000_m10_lesson_resource_meta.down,
    name: '20260627_140000_m10_lesson_resource_meta'
  },
  {
    up: migration_20260627_150000_m11_certificate_metadata.up,
    down: migration_20260627_150000_m11_certificate_metadata.down,
    name: '20260627_150000_m11_certificate_metadata'
  },
  {
    up: migration_20260627_160000_m12_safety_chat.up,
    down: migration_20260627_160000_m12_safety_chat.down,
    name: '20260627_160000_m12_safety_chat'
  },
  {
    up: migration_20260628_010000_m13_order_idempotency.up,
    down: migration_20260628_010000_m13_order_idempotency.down,
    name: '20260628_010000_m13_order_idempotency'
  },
];
