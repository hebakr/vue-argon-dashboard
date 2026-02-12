<script setup>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import ActiveUsersChart from "../../examples/Charts/ActiveUsersChart.vue";

const applications = [
  {
    name: "John Doe",
    grade: "PR3",
    submittedDate: "2024-06-01",
    status: "Approved",
    phone: "555-1234",
  },
  {
    name: "Jane Smith",
    grade: "KG2",
    submittedDate: "2024-06-03",
    status: "Pending",
    phone: "555-5678",
  },
  {
    name: "Alice Johnson",
    grade: "PR1",
    submittedDate: "2024-05-28",
    status: "Rejected",
    phone: "555-8765",
  },
  {
    name: "Bob Brown",
    grade: "PR5",
    submittedDate: "2024-06-02",
    status: "Approved",
    phone: "555-4321",
  },
];

const getStatusClasses = (status) => {
  switch (status) {
    case "Approved":
      return "badge bg-gradient-success";
    case "Pending":
      return "badge bg-gradient-warning";
    case "Rejected":
      return "badge bg-gradient-danger";
    default:
      return "badge bg-gradient-secondary";
  }
};
</script>
<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Total Applications"
              value="300"
              description="<span
                class='text-sm font-weight-bolder text-success'
                >+55%</span> since yesterday"
              :icon="{
                component: 'ni ni-money-coins',
                background: 'bg-gradient-primary',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Approved"
              value="150"
              description="<span
                class='text-sm font-weight-bolder text-danger'
                >-2%</span> since last quarter"
              :icon="{
                component: 'fa fa-user-check',
                background: 'bg-gradient-success',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Pending"
              value="123"
              description="<span
                class='text-sm font-weight-bolder text-success'
                >+3%</span> since last week"
              :icon="{
                component: 'fa fa-user-clock',
                background: 'bg-gradient-warning',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <mini-statistics-card
              title="Rejected"
              value="30"
              description="<span
                class='text-sm font-weight-bolder text-success'
                >+5%</span> than last month"
              :icon="{
                component: 'fa fa-user-times',
                background: 'bg-gradient-danger',
                shape: 'rounded-circle',
              }"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-7 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2">
              <gradient-line-chart
                id="chart-line"
                title="Sales Overview"
                description="<i class='fa fa-arrow-up text-success'></i>
      <span class='font-weight-bold'>4% more</span> in 2021"
                :chart="{
                  labels: [
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                  datasets: [
                    {
                      label: 'Mobile Apps',
                      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                    },
                  ],
                }"
              />
            </div>
          </div>
          <div class="col-lg-5">
            <div class="card p-3 h-100">
              <h6>Applications by Grade</h6>
              <div>
                <active-users-chart />
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-12 mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-2">Recent Applications</h6>
                  <a class="btn text-sm mb-0" href="javascript:;"
                    >View all
                    <i class="fa fa-angle-right"></i>
                  </a>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-items-center">
                  <thead>
                    <tr>
                      <th class="text-sm font-weight-bolder opacity-7">Name</th>
                      <th class="text-sm font-weight-bolder opacity-7">
                        Grade
                      </th>
                      <th class="text-sm font-weight-bolder opacity-7">
                        Submitted Date
                      </th>
                      <th class="text-sm font-weight-bolder opacity-7">
                        Phone
                      </th>
                      <th class="text-sm font-weight-bolder opacity-7">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(applicant, index) in applications" :key="index">
                      <td class="text-sm p-4">{{ applicant.name }}</td>
                      <td class="text-sm p-4">{{ applicant.grade }}</td>
                      <td class="text-sm p-4">{{ applicant.submittedDate }}</td>
                      <td class="text-sm p-4">{{ applicant.phone }}</td>
                      <td class="text-sm p-4">
                        <span :class="getStatusClasses(applicant.status)">{{
                          applicant.status
                        }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
