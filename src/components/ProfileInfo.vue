<template>
    <div>
        <div v-if="gotData">
            <b-card :title="user.username" :sub-title="user.email">
                <br/>
                <b-card-text>
                Ime: {{user.name}}
                </b-card-text>

                <b-card-text>Prezime: {{user.surname}}</b-card-text>
                
                <a href="izmenaProfila" class="card-link">Izmeni profil</a>
            </b-card>
            </div>
    </div>
</template>

<script>

    import { mapActions, mapState } from 'vuex';


    export default{
        name: "ProfileInfo",

        data(){
            return {
                gotData: false
            }
        },

        computed: {
            ...mapState([
                'token',
                'id',
                'user'
            ]),
        },

        methods: {
            ...mapActions([
                'getUser'
            ])
        },

        mounted(){
            if(!localStorage.getItem('token')){
                this.$router.push({ name: 'home'});
            }
            this.getUser().then(res => {
                if(res){
                    this.gotData = true;
                }else{
                    this.$router.push({ name: 'home'});
                }
            });
        },

    }
</script>