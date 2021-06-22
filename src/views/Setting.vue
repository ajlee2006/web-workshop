<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Settings
        <v-spacer/>
      </v-card-title>
      <div class="pa-8">
        Your language is set to {{ language }} (NOTE: This does not change anything)
        <language-select
          :language.sync="language"
          />
        <v-switch
          :label="`Dark theme: ${$vuetify.theme.dark}`"
          v-model="$vuetify.theme.dark"
          /> <!--@change="handleThemeSwitch"-->
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import LanguageSelect from "@/components/LanguageSelect.vue";

export default Vue.extend({
  name: "Setting",
  components: {LanguageSelect},
  data: function () {
    return {
      language: "English",
      // darkTheme: false
    };
  },
  methods:{
    // handleThemeSwitch() {
    //   this.$vuetify.theme.dark = this.darkTheme;
    // }
  },
});
</script>
