import * as migration_20260624_191830_initial from './20260624_191830_initial';
import * as migration_20260625_143450_m2_content_model from './20260625_143450_m2_content_model';
import * as migration_20260626_001000_m3_experience_case_relationship from './20260626_001000_m3_experience_case_relationship';
import * as migration_20260626_002000_m4_free_training_release_status from './20260626_002000_m4_free_training_release_status';
import * as migration_20260626_003000_m5_free_training_type_cta from './20260626_003000_m5_free_training_type_cta';
import * as migration_20260626_004000_m6_media_imagesizes_home_images from './20260626_004000_m6_media_imagesizes_home_images';

export const migrations = [
  {
    up: migration_20260624_191830_initial.up,
    down: migration_20260624_191830_initial.down,
    name: '20260624_191830_initial',
  },
  {
    up: migration_20260625_143450_m2_content_model.up,
    down: migration_20260625_143450_m2_content_model.down,
    name: '20260625_143450_m2_content_model'
  },
  {
    up: migration_20260626_001000_m3_experience_case_relationship.up,
    down: migration_20260626_001000_m3_experience_case_relationship.down,
    name: '20260626_001000_m3_experience_case_relationship'
  },
  {
    up: migration_20260626_002000_m4_free_training_release_status.up,
    down: migration_20260626_002000_m4_free_training_release_status.down,
    name: '20260626_002000_m4_free_training_release_status'
  },
  {
    up: migration_20260626_003000_m5_free_training_type_cta.up,
    down: migration_20260626_003000_m5_free_training_type_cta.down,
    name: '20260626_003000_m5_free_training_type_cta'
  },
  {
    up: migration_20260626_004000_m6_media_imagesizes_home_images.up,
    down: migration_20260626_004000_m6_media_imagesizes_home_images.down,
    name: '20260626_004000_m6_media_imagesizes_home_images'
  },
];
