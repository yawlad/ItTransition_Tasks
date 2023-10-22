import { instance } from "./api.config";

const ImageService = {
  postImage(id: string, img: string) {
    return instance.post(`/image?id=${id}`, { img });
  },

  getImage(id: string) {
    return instance.get(`/image?id=${id}`);
  },

  getImages() {
    return instance.get(`/images`);
  },
};

export default ImageService;
