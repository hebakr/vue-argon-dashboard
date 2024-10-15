<template>
  <div class="table-responsive p-0">
    <table class="table align-items-center mb-0">
      <thead>
        <tr>
          <th
            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Client
          </th>

          <th
            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Mobile
          </th>
          <th
            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          >
            Email
          </th>
          <th
            class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
          ></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.clients" :key="item.id">
          <td>
            <div class="d-flex px-2 py-1">
              <LogoThumb :title="item.name" :url="item.logo" />
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-sm">{{ item.name }}</h6>
                <p class="text-xs text-secondary mb-0">
                  {{ item.email }}
                </p>
              </div>
            </div>
          </td>
          <td>{{ item.mobile }}</td>
          <td>{{ item.email }}</td>
          <td>
            <p class="text-xs font-weight-bold mb-0">Manager</p>
            <p class="text-xs text-secondary mb-0">Organization</p>
          </td>
          <td class="align-middle text-center text-sm">
            <span class="badge badge-sm bg-gradient-success">Online</span>
          </td>
          <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold"
              >23/04/18</span
            >
          </td>
          <td class="align-middle">
            <a href="#" class="button is-default">
              <i class="fa fa-edit" />
            </a>
          </td>
          <td class="has-text-right">
            <div class="buttons is-flex is-justify-content-right">
              <a
                href="#"
                @click.prevent="deleteClient(item.id)"
                class="button is-danger"
              >
                <i class="fa fa-trash" />
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useClientsStore } from "@/store/clients";
import LogoThumb from "./LogoThumb.vue";
const store = useClientsStore();
onMounted(() => store.fetchClients());

const deleteClient = (clientId) => {
  if (confirm("Are you sure?")) {
    store.deleteClient(clientId);
  }
};
</script>
