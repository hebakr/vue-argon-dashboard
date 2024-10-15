import { defineStore } from "pinia";
import config from "../util/config";
import camelcaseKeys from "camelcase-keys";

import { request } from "../util/request-api";
import snakecaseKeys from "snakecase-keys";

export const useRoomsStore = defineStore({
  id: "class_rooms",
  state: () => ({
    rooms: [],
    loading: false,
  }),
  actions: {
    async fetchRooms(schoolId) {
      this.loading = true;
      const response = await request(
        `${config.baseUrl}/api/v1/schools/${schoolId}/class_rooms`
      );
      this.rooms = camelcaseKeys(response.data);
      this.loading = false;
    },
    async createRoom(room) {
      this.loading = true;
      const response = await request(
        `${config.baseUrl}/api/v1/schools/${room.schoolId}/class_rooms`,
        "POST",
        snakecaseKeys(room)
      );
      this.loading = false;
      return camelcaseKeys(response.data);
    },
    async updateRoom(room) {
      this.loading = true;
      const response = await request(
        `${config.baseUrl}/api/v1/schools/${room.schoolId}/class_rooms/${room.id}`,
        "PUT",
        snakecaseKeys(room)
      );
      this.loading = false;
      return camelcaseKeys(response.data);
    },
    async saveRoom(room) {
      return +room.id > 0 ? this.updateRoom(room) : this.createRoom(room);
    },
    async deleteRoom(room) {
      this.loading = true;
      await request(
        `${config.baseUrl}/api/v1/schools/${room.schoolId}/class_rooms/${room.id}`,
        "DELETE",
        snakecaseKeys(room)
      );
      this.loading = false;
    },
  },
});
