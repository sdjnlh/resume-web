<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <span class="el-dropdown-link">
      {{ languageName }}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language === 'zh'" command="zh"
        >中文</el-dropdown-item
      >
      <el-dropdown-item :disabled="language === 'en'" command="en"
        >English</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'LangSelect',
  data() {
    return {
      // lang: ''
    }
  },
  computed: {
    language() {
      return this.$store.getters.language || 'en'
    },
    languageName() {
      return this.$store.getters.language === 'zh' ? '中文' : 'English'
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
    }
  },
  mounted: function() {}
}
</script>

<style scoped>
.international-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px !important;
}
</style>
