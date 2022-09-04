<template>
  <div>
    <b-pagination
      v-model="currentPage"
      :total-rows="repertoireIds.length"
      :per-page="perPage"
      aria-controls="image-table"
    ></b-pagination>
    <b-table
      id="image-table"
      hover
      fixed
      :items="items"
      :fields="fields"
      small
      :per-page="perPage"
      :current-page="currentPage"
      @row-clicked="rowClicked"
    >
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="repertoireIds.length"
      :per-page="perPage"
      aria-controls="image-table"
    ></b-pagination>
  </div>
</template>

<script>

  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Repertoire',

    data() {
      return {
        fields: [{key:'show.name', label: 'Naziv'}, {key:'hall.name', label: 'Sala'}, {key:'dateTime', label: 'Datum'}, {key:'time', label: 'Vreme'}],
        items: [],
        currentPage: 1,
        perPage: 5
      }
    },

    computed: {
      ...mapState([
        'repertoireIds'
      ])
    },

    watch: {
      currentPage(nVal, oVal) {
        this.repertoireIds.slice((this.currentPage-1) * this.perPage, this.currentPage * this.perPage).map( id => {
          this.getRepertoireEntry(id).then( obj => this.items.push(obj) );
        });
      },

      repertoireIds(nVal, oVal) {
        this.currentPage = 1;
        this.items = [];

        nVal.slice((this.currentPage-1) * this.perPage, this.currentPage * this.perPage).map( id => {
          this.getRepertoireEntry(id).then( obj => this.items.push(obj) );
        });
      }
    },

    mounted() {
      this.repertoireIds.slice((this.currentPage-1) * this.perPage, this.currentPage * this.perPage).map( id => {
        this.getRepertoireEntry(id).then( obj => this.items.push(obj) );
      });
    },

    methods: {
      ...mapActions([
        'getRepertoireEntry'
      ]),

      rowClicked(record, index) {
        this.$router.push({ name: 'RepertoireEntry', params: { id: record.id, name: record.show.name } });
      }
    }
  }

</script>

<style scoped>
  .pagination {
    justify-content: center;
  }
</style>