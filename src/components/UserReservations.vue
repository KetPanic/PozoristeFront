<template>
    <div>
        <h2>Rezervacije</h2>
        <hr/>
            <div v-for="r in res" :key="r.id" class="cont">
                <div v-if="gotData">
                 <b-card :title="r.show.show.name" :sub-title="r.show.hall.name">
                 <br/>
                <b-card-text>
                Datum: {{r.show.dateTime}}
                </b-card-text>
                <b-card-text>Vreme: {{r.show.time}}</b-card-text>
                <b-card-text>Broj karata: {{r.noOfTickets}}</b-card-text>
                <b-button @click="delRes(r.id)">Otkazi rezervaciju</b-button>
            </b-card>   
            </div>
            <hr/>
        </div>
    </div>
</template>

<script>

    import {mapActions, mapState} from 'vuex';

    export default{
        name: 'UserResrvations',

        computed: {
            ...mapState([
                'reservations',
                'token'
            ])
        },

        data(){
            return{
                res: [],
                counter: 0,
                gotData: false
            }
        },

        methods: {
            ...mapActions([
                'getReservations',
                'getRepertoireEntry',
                'deleteReservation'
            ]),

            delRes(id){
                this.deleteReservation(id).then(r => {
                    location.reload();
                })
            }
        },

        watch: {
            token(nVal, oVal){
                this.getReservations();
            },
            res(nVal, oVal){
                nVal.forEach(r => {
                    this.getRepertoireEntry(r.ticket.repertoireId).then(s => {
                        r.show = s;
                        this.counter++;
                        if(this.counter == this.res.length){
                            this.gotData = true;
                        }
                    })
                });
            },

        },

        mounted(){
            this.getReservations().then(r => {
                this.res = r;
            });
        }

    }

</script>

<style>
    .cont{
        margin-left:30%;
        margin-right:30%;
    }
</style>