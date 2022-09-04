<template>
    <div>
        <div v-if="gotItem">
            <b-card :title="item.name" :img-src="image" img-alt="Image" img-top>
            </b-card>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        name: "ShowTile",

        props: {
            id: Number
        },

        data() {
            return {
                item: {},
                gotItem: false,
                image: ''
            }
        },

        watch: {
            id(nVal, oVal){
                this.getShowEntry(this.id).then( obj => {
                this.item = obj;
                this.image = 'data:image/jpeg;base64,'+ obj.poster;
                this.gotItem = true
             });
            }
        },

        mounted() {
            this.getShowEntry(this.id).then( obj => {
                this.item = obj;
                this.image = 'data:image/jpeg;base64,'+ obj.poster;
                this.gotItem = true
             });
        },

        methods: {
            ...mapActions([
                'getShowEntry'
            ]),
        }

    }
</script>