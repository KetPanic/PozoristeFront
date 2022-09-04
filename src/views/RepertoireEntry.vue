<template>
  <div id="app">
    <Header :subtitle="subtitle"/>
    <div v-if="gotData">
        <Show :rep="rep"></Show>
        <div :v-if="token">
        </div>
        <div v-if="token&&gotTickets">
            <hr/>
            <h4>Rezervisite karte:</h4>
            <p>Izaberite tip:</p>
            <select v-model="chosen">
                <option v-for="item in tickets" :value="item">{{item.ticketType.name}} - {{item.ticketType.price}}</option>
            </select>
            <div>
              <p>Izaberite kolicinu:</p>
              <b-form @submit="onSubmit" inline>
                  <label class="sr-only" for="inline-form-input-name">Name</label>
                  <b-form-input
                  type="number"
                  id="inline-form-input-name"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  v-model="value"
                  :disabled="disableInput"
                  :max="number"
                  min="0"
                  ></b-form-input>
              
                  <b-button variant="primary" type="submit" :disabled="disableButton">Rezervisi</b-button>
              </b-form>  
            </div>
            <hr/>    
           <Comments :id="rep.showId" /> 
        </div>
        <div v-else>
            Ulogujte se da biste rezervisali kartu
        </div>
    </div>
    <br/>
    <hr/>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import Comments from '@/components/Comments.vue';
  import Show from '@/components/Show.vue';
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'RepertoireEntry',
    
    components: {
      Header,
      Comments,
      Show
    },

    computed: {
        ...mapState([
            'token',
            'id'
        ])
    },

    data() {
        return {
            subtitle: '',
            repID: null,
            rep: {},
            tickets: {},
            chosen: {},
            disableInput:true,
            disableButton:true,
            value:0,
            number:0,
            show: null,
            image: '',
            gotData: false,
            gotTickets: false
        }
    },

    watch: {
      $route() {
        this.subtitle = this.$route.params.name;
        this.repID = this.$route.params.id;

        this.getRepertoireEntry(this.repID).then(r => {
          this.rep = r;
          this.image = 'data:image/jpeg;base64,'+ r.show.image;
          this.gotData = true;
        });
        this.getTickets(this.repID).then(r => {
          this.tickets = r;
          this.gotTickets = true;
        });
      },
      
      chosen(nVal, oVal){
        if(nVal != null){
            this.disableInput = false;
            this.value=0
            this.number = nVal.number;
        }else{
            this.disableInput = true;
            this.disableButton = true;
        }
      },

      value(nVal, oVal){
        if((nVal != 0 ) && (nVal <= this.number)){
            this.disableButton = false;
        }else{
            this.disableButton = true;
        }
      }


    },

    mounted() {
        this.subtitle = this.$route.params.name;
        this.repID = this.$route.params.id;

        this.getRepertoireEntry(this.repID).then(r => {
          this.rep = r;
          this.image = 'data:image/jpeg;base64,'+ r.show.image;
          this.gotData = true;
        });
        this.getTickets(this.repID).then(r => {
          this.tickets = r;
          this.gotTickets = true;
        });
    },

    methods: {
      ...mapActions([
        'getRepertoireEntry',
        'getTickets',
        'reserveTickets'
      ]),

      onSubmit(e){
        e.preventDefault();

        const o = {
            noOfTickets: this.value,
            userId: this.id,
            ticketId: this.chosen.id
        }
        this.reserveTickets(o).then(r => {
            if(r){
              this.tickets.forEach(element => {
                  alert(element)
                if(element.id == o.ticketId){
                  element.number = element.number - o.noOfTickets;
                }
              });
              this.chosen = null;
            }
        });
      }
    }
  }
</script>

<style scoped>
</style>
