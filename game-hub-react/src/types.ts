export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

export interface Platform {
  id: number;
  name: string;
}

export interface Game {
  id: number;
  name: string;
  released: string;
  rating: number;
  background_image: string;
}