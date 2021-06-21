<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <div v-if="name === ''">
          Your profile
        </div>
        <div v-else>
          Welcome to Vue, {{ name }}
        </div>
        <v-spacer/>
      </v-card-title>
      <div class="pa-8">
        <v-text-field
          v-model="name"
          label="Name"
        >
        </v-text-field>
<!--        <div>-->
<!--          Output of <code>main</code>: {{ mainOut }}-->
<!--        </div>-->
        <v-data-table
          :items="repos"
          :headers="headers"
          >
          <template v-slot:item.name="{ item }">
            <a :href="`https://github.com/${item.full_name}`" target="_blank">{{item.name}}</a>
          </template>
          <template v-slot:item.stargazers_count="{ item }">
            {{item.stargazers_count}}
            <v-icon> {{ getIcon(item.stargazers_count) }}</v-icon>
          </template>
        </v-data-table>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {Repo} from "@/types/repo";
import {DataTableHeader} from "vuetify";
import {getRepos} from "@/api/api";

export default Vue.extend({
  name: "Main",
  data: function () {
    return {
      name: "",
      mainOut: "",
      repos: [] as Repo[],
      headers: [{
        text: "Name",
        value: "name"
      }, {
        text: "Stars",
        value: "stargazers_count"
      }, {
        text: "Size",
        value: "size"
      }] as DataTableHeader[]
    };
  },
  methods:{
    getIcon(stars: number): string {
      if(stars > 2){
        return "mdi-emoticon-happy-outline";
      } return "mdi-emoticon-neutral-outline";
    }
  },
  async mounted() {
    // this.mainOut = await api.main();
    this.repos = await getRepos("ajlee2006");
  },
});
</script>
