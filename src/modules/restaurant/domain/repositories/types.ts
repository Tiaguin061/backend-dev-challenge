export interface UpdateUniqueRestaurantRepositoryData {
  restaurant_id: string;
  data: {
    name: string;
    address: string;
    opening_hour: string;
    user_id: string;
    profile_photo?: string | null;

    profile_photo_file?: CustomFile.File;
  };
}
