export interface UpdateUniqueRestaurantServiceData {
  restaurant_id: string;
  data: {
    name: string;
    address: string;
    opening_hour: string;
    user_id: string;

    profile_photo_file?: CustomFile.File;
  };
}

export interface CreateRestaurantServiceData {
  name: string;
  address: string;
  opening_hour: string;
  user_id: string;

  profile_photo_file?: CustomFile.File;
}
