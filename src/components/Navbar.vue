<template>
  <BNavbar>
    <BNavbarBrand>Mathematics</BNavbarBrand>
    <BNavbarNav>
      <RouterLink to="/mc-utilities /by-topic">
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
      <BNavItemDropdown text="🌐" right>
        <BDropdownItem @click="setLang('e')">English
        </BDropdownItem>
        <BDropdownItem @click="setLang('c')">中文
        </BDropdownItem>
      </BNavItemDropdown>
    </BNavbarNav>
  </BNavbar>
</template>

<script setup lang="ts">
import { useSettingsStore } from '../store';

const settings = useSettingsStore()
const setLang = (lang: 'e' | 'c') => {
  settings.lang = lang
}
</script>

<style scoped></style>