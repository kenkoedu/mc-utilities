<template>
  <BNavbar variant="light" toggleable="sm">
    <BNavbarToggle target="nav-collapse" />
    <BNavbarBrand>Mathematics</BNavbarBrand>
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav>
        <RouterLink to="/mc-utilities/by-topic">
          <BNavItem>
            <ListIcon class="me-1" />
            {{ allByTopicText }}
          </BNavItem>
        </RouterLink>
        <RouterLink to="/mc-utilities/by-year">
          <BNavItem>
            <Calendar class="me-1" />
            {{ allByYearText }}
          </BNavItem>
        </RouterLink>
        <RouterLink to="/mc-utilities/ex-editor">
          <BNavItem>
            <PencilIcon class="me-1" />
            {{ exerciseEditorText }}
          </BNavItem>
        </RouterLink>
        <!-- <RouterLink to="/mc-utilities/db-viewer">
          <BNavItem>
            <DatabaseIcon class="me-1" />
            {{ dbViewerText }}
          </BNavItem>
        </RouterLink> -->
        <BNavItem>
        </BNavItem>
      </BNavbarNav>
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BNavForm>
          <BFormCheckbox switch size="lg" class="mx-1"
            v-model="showAns" @change="setShowAns">
            Show Answer
          </BFormCheckbox>
          <BFormCheckbox switch size="lg" class="mx-1"
            v-model="showHKPercent"
            @change="setShowHKPercent">
            Show %
          </BFormCheckbox>
        </BNavForm>
        <BNavItemDropdown right class="mx-2">
          <template #button-content>
            <GlobeIcon class="me-1" />
            {{ settings.lang === 'e' ? 'English' : '中文' }}
          </template>
          <BDropdownItem @click="setLang('e')">English
          </BDropdownItem>
          <BDropdownItem @click="setLang('c')">中文
          </BDropdownItem>
        </BNavItemDropdown>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/store';
import { ref, computed } from 'vue';
// import { ListIcon, PencilIcon, DatabaseIcon, GlobeIcon, Calendar } from 'lucide-vue-next';
import { ListIcon, PencilIcon, GlobeIcon, Calendar } from 'lucide-vue-next';

const settings = useSettingsStore()
const showAns = ref<boolean>(true)
const showHKPercent = ref<boolean>(true)
const setLang = (lang: 'e' | 'c') => {
  settings.lang = lang
}
const setShowAns = () => {
  settings.showAns = showAns.value
}
const setShowHKPercent = () => {
  settings.showHKPercent = showHKPercent.value
}

const allByTopicText = computed(() => {
  return settings.lang === 'c' ? '按課題' : 'All By Topic'
})

const allByYearText = computed(() => {
  return settings.lang === 'c' ? '按年份' : 'All By Year'
})

const exerciseEditorText = computed(() => {
  return settings.lang === 'c' ? '製作工作紙' : 'Exercise Editor'
})

// const dbViewerText = computed(() => {
//   return settings.lang === 'c' ? '檢視資料庫' : 'DB Viewer'
// })
</script>

<style scoped></style>