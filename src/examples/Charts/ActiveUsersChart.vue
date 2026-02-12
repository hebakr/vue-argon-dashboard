<script setup>
import { onMounted } from "vue";
import Chart from "chart.js/auto";

onMounted(() => {
  let ctx = document.getElementById("chart-bars").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["KG1", "KG2", "PR1", "PR2", "PR3", "PR4", "PR5", "PR6"],
      datasets: [
        {
          label: "Grades",
          tension: 0.4,
          borderWidth: 0,
          borderRadius: 4,
          borderSkipped: false,
          backgroundColor: "yellow",
          data: [450, 200, 100, 220, 500, 100, 400, 230],
          maxBarThickness: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: true,
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 500,
            beginAtZero: true,
            padding: 15,
            font: {
              size: 14,
              family: "Open Sans",
              style: "normal",
              lineHeight: 2,
            },
            color: "#fff",
          },
        },
        x: {
          grid: {
            drawBorder: true,
            display: true,
            drawOnChartArea: true,
            drawTicks: true,
          },
          ticks: {
            display: true,
            color: "lightblue",
          },
        },
      },
    },
  });
});
</script>
<template>
  <div class="card">
    <div class="card-body p-3">
      <div class="py-3 mb-3 bg-gradient-dark border-radius-lg pe-1">
        <div class="chart">
          <canvas id="chart-bars" class="chart-canvas" height="170"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>
