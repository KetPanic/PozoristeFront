<template>
  <div>
    <b-list-group-item href="#"  class="item flex-column align-items-start">
      <div class=" w-100 justify-content-between">
        <h3 v-if="hall">{{ hall.name }}</h3>

        <p v-if="hall">Broj sedista: {{ hall.noOfSeats }}</p>
        <h4>Opis sale:</h4>
        <p v-if="hall">{{ hall.description }}</p>
      </div>
  </b-list-group-item>
  </div>
</template>

<script>

  export default {
    name: 'Header',
    
    props: {
      hall: {},
      gotData:false
    }
  }

</script>

<style scoped>
  .item{
    border: 1px solid black;
    padding-top: 1%;
    margin-top: 1%;
    padding-bottom: 1%;
    margin-bottom: 1%;
  }
</style>