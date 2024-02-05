import { defineStore } from 'pinia'
export const useSettingsStore = defineStore('settings', {
  state: () => ({
    lang: "e" as "e" | "c"
  })
})