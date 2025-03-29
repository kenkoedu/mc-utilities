<template>
  <BContainer>
    <h2>Database Viewer</h2>
    <div v-if="tables.length">
      <div v-for="table in tables" :key="table.name"
        class="mb-4">
        <h3>{{ table.name }}</h3>
        <BTable striped bordered hover :items="table.data"
          :fields="table.fields">
        </BTable>
      </div>
      <!-- Add specific view for topic_stats -->
      <div v-if="topicStats" class="mb-4">
        <h3>topic_stats</h3>
        <BTable striped bordered hover
          :items="topicStats.data"
          :fields="topicStats.fields">
        </BTable>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
  </BContainer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { BTable } from 'bootstrap-vue-next';

const tables = ref<any[]>([]);
const topicStats = ref<any | null>(null); // Add ref for topic_stats

onMounted(async () => {
  await loadTables();
  await loadTopicStats(); // Load topic_stats view
});

async function loadTables() {
  try {
    const response = await fetch('/api/tables');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    tables.value = await response.json();
  } catch (error) {
    console.error("Failed to load tables:", error);
  }
}

// Add function to load topic_stats view
async function loadTopicStats() {
  try {
    const response = await fetch('/api/views/topic_stats');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    topicStats.value = await response.json();
  } catch (error) {
    console.error("Failed to load topic_stats view:", error);
  }
}
</script>
