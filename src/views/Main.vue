<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <div v-if="username === ''">
          Github Repos Search
        </div>
        <div v-else>
          Search Github for {{ username }}
        </div>
        <v-spacer/>
      </v-card-title>
      <div class="pa-8">
        <v-text-field
          @change="handleName"
          v-model="username"
          label="Username"
        >
        </v-text-field>
<!--        <div>-->
<!--          Output of <code>main</code>: {{ mainOut }}-->
<!--        </div>-->
        <v-data-table
          :items="repos"
          :headers="headers"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          >
          <template v-slot:item.name="{ item }">
            <a :href="`https://github.com/${item.full_name}`" target="_blank">{{item.name}}</a>
          </template>
          <template v-slot:item.stargazers_count="{ item }">
            {{item.stargazers_count}}
<!--            <v-icon> {{ getIcon(item.stargazers_count) }}</v-icon>-->
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
  props: {
    aName: {
      type: String,
    }
  },
  data: function () {
    return {
      name: "",
      mainOut: "",
      sortBy: "stargazers_count",
      sortDesc: true,
      repos: [] as Repo[],
      headers: [{
        text: "Name",
        value: "name"
      }, {
        text: "Stars",
        value: "stargazers_count"
      }, {
        text: "Watchers",
        value: "watchers_count"
      }, {
        text: "Forks",
        value: "forks_count"
      }, {
        text: "Size",
        value: "size"
      }, {
        text: "Language",
        value: "language"
      }, {
        text: "Created at",
        value: "created_at"
      }, {
        text: "Updated at",
        value: "updated_at"
      }, ] as DataTableHeader[], username: this.$props.aName
    };
  },
  methods:{
    getIcon(stars: number): string {
      if(stars > 2){
        return "mdi-emoticon-happy-outline";
      } return "mdi-emoticon-neutral-outline";
    },
    async handleName() {
      this.repos = await getRepos(this.username);
    }
  },
  // async mounted() {
  //   // this.mainOut = await api.main();
  //   this.repos = await getRepos("ajlee2006");
  // },
});
</script>
