<template>
    <div>
        <Header subtitle="Profil"></Header>
        <ProfileInfo></ProfileInfo>
        <br>
        <UserReservations></UserReservations>
    </div>
</template>

<script>

    import Header from '@/components/Header.vue';
    import ProfileInfo from '@/components/ProfileInfo.vue';
    import UserReservations from '@/components/UserReservations.vue';
    import { mapActions, mapState } from 'vuex';


    export default{
        name: "Profile",
        
        components: {
    Header,
    ProfileInfo,
    UserReservations,
    UserReservations
},

        computed: {
            ...mapState([
                'token'
            ])
        },

        watch: {
            token(nVal, oVal){
                if(!localStorage.getItem('token')){
                    this.$router.push({ name: 'home'});
                }
            }
        },

        mounted(){
            if(!localStorage.getItem('token')){
                this.$router.push({ name: 'home'});
            }
        }
    }
</script>