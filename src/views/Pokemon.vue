<template>
  <DefaultTemplate>
    <div class="content">
      <div id="pokemon" class="container">
        <h2 class="mg-0 text-center color-main">Test Fetch API</h2>
        <el-row :gutter="20" v-if="loading">
          <el-col
            :span="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="4"
            v-for="(pokemon, index) in 10"
            :key="index"
          >
            <el-skeleton :loading="true" animated class="wait-pokemon">
              <template slot="template">
                <el-skeleton-item variant="image" />
                <el-skeleton-item :rows="1" />
              </template>
            </el-skeleton>
          </el-col>
        </el-row>

        <div class="group-pokemon">
          <el-row :gutter="20" v-if="!loading">
            <el-col
              :span="24"
              :sm="12"
              :md="8"
              :lg="6"
              :xl="4"
              v-for="(pokemon, index) in pokemonList"
              :key="index"
            >
              <CardPokemon :pokemon="pokemon" />
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </DefaultTemplate>
</template>

<script>
import DefaultTemplate from "@/template/DefaultTemplate";
import CardPokemon from "@/components/CardPokemon";
import { HTTP } from "@/service/axios";

export default {
  components: {
    DefaultTemplate,
    HTTP,
    CardPokemon,
  },
  data() {
    return {
      count: 10,
      loading: true,
      pokemonList: [],
      colorByType: {
        fire: "#EE8130",
        grass: "#7AC74C",
        electric: "#F7D02C",
        water: "#6390F0",
        ground: "#E2BF65",
        rock: "#B6A136",
        fairy: "#D685AD",
        poison: "#A33EA1",
        bug: "#A6B91A",
        dragon: "#6F35FC",
        psychic: "#F95587",
        flying: "#A98FF3",
        fighting: "#C22E28",
        normal: "#A8A77A",
      },
    };
  },
  mounted() {
    this.fetchPokemon();
  },
  methods: {
    async fetchPokemon() {
      for (let i = 1; i < 105; i++) {
        await HTTP.get(`pokemon/${i}`).then(async (res) => {
          if (res.status == 200) {
            const pokemonTypes = res.data.types.map((el) => el.type.name);
            const mainTypes = Object.keys(this.colorByType);
            const type = await mainTypes.find(
              (type) => pokemonTypes.indexOf(type) > -1
            );
            this.pokemonList.push({
              name: res.data.name,
              img: res.data.sprites.front_default,
              color: this.colorByType[type],
            });
            if (this.pokemonList.length == 104 && res.data.id == 104) {
              this.loading = false;
            }
          }
        });
      }
    },
  },
};
</script>
