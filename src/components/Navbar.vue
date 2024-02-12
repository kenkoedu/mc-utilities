<template>
  <BNavbar variant="light" toggleable="sm">
    <BNavbarToggle target="nav-collapse" />
    <BNavbarBrand>Mathematics</BNavbarBrand>
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav>
        <RouterLink to="/mc-utilities/by-topic">
          <BNavItem>
            All By Topic
          </BNavItem>
        </RouterLink>
        <RouterLink to="/mc-utilities/ex-editor">
          <BNavItem>
            Exercise Editor
          </BNavItem>
        </RouterLink>
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
            <IMdiLanguage></IMdiLanguage>
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
import { useSettingsStore } from '../store';
import { ref } from 'vue';

const settings = useSettingsStore()
const showAns = ref<boolean>(true)
const showHKPercent = ref<boolean>(true)
const setLang = (lang: 'e' | 'c') => {
  settings.lang = lang
}
const setShowAns = (showAns: boolean) => {
  settings.showAns = showAns
}
const setShowHKPercent = (showHKPercent: boolean) => {
  settings.showHKPercent = showHKPercent
}
</script>

<style scoped></style>