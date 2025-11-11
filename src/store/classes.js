import { buildCrudStore } from "./store-builder";
import config from "../util/config";
import camelcaseKeys from "camelcase-keys";

import { request } from "../util/request-api";

export const useClassesStore = buildCrudStore("academic_classes", {
  doSomething() {
    console.log("DO SOMETHING");
  },
  async findById(schoolId, resourceId, yearId) {
    this.loading = true;
    const response = await request(
      `${config.baseUrl}/api/v1/schools/${schoolId}/academic_classes/${resourceId}?yearId=${yearId}`
    );
    this.loading = false;
    return camelcaseKeys(response.data, { deep: true });
  },
});
