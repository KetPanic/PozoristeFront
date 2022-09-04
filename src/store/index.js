import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    repertoireIds: [],
    repertoire: [],
    showIds: [],
    shows: [],
    halls: [],
    id: -1,
  },
  getters: {
  },
  mutations: {
    setToken(state, token) {
      state.token = token.token;
      localStorage.token = token.token;
      state.id = token.id;
      localStorage.id = token.id;
    },

    removeToken(state) {
      state.token = '';
      state.id = -1;
      localStorage.token = '';
      localStorage.id = -1;
    },

    addRepertoireIds(state, ids){
      state.repertoireIds = ids;
    },

    addRepertoire(state, item){
      state.repertoire.push(item);
    },

    addShowIds(state, ids){
      state.showIds = ids;
    },

    addShow(state, item){
      state.shows.push(item);
    },

    addHalls(state, halls){
      state.halls = halls;
    },
    addComment(state, obj) {
      const image = state.shows.filter( item => item.id == obj.showId )[0];
      if (image) {
        image.comments.push(obj.comment);
      }
    }
  },
  actions: {

    reserveTickets({commit, state}, obj){
      return new Promise( (resolve, reject) => {
        fetch('http://127.0.0.1:8200/reservations', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.token}`
           },
          body: JSON.stringify(obj)
        }).then( res => res.json() )
        .then(rez => {
          if(!rez.message){
            alert("Rezervisano!");
            resolve(true);
          }else{
            alert(rez.message);
            resolve(false);
          }
        })
      });
    },

    getTickets({ commit, state }, id) {
      return new Promise( (resolve, reject) => {
        
          fetch(`http://127.0.0.1:8200/tickets/repertoireEntry/${id}`)
            .then( obj => obj.json())
            .then( res => {
              resolve(res);
            });
      });
    },

    getRepertoireEntry({ commit, state }, id) {
      return new Promise( (resolve, reject) => {
        const item = state.repertoire.filter( item => item.id == id )[0];
        
        if (item) {
          resolve(item);
        } else {
          fetch(`http://127.0.0.1:8200/repertoire/${id}`)
            .then( obj => obj.json())
            .then( res => {
              commit('addRepertoire', res);
              resolve(res);
            });
        }
      });
    },

    fetchShowIds({commit}){
      fetch('http://127.0.0.1:8200/shows/ids')
      .then(obj => obj.json())
      .then(res => commit('addShowIds', res));
    },
    
    fetchHalls({commit}){
      fetch('http://127.0.0.1:8200/halls')
      .then(obj => obj.json())
      .then(res => commit('addHalls', res));
    },
        
    getShowEntry({ commit, state }, id) {
      return new Promise( (resolve, reject) => {
        const item = state.shows.filter( item => item.id == id )[0];
        
        if (item) {
          resolve(item);
        } else {
          fetch(`http://127.0.0.1:8200/shows/${id}`)
            .then( obj => obj.json())
            .then( res => {
              fetch(`http://127.0.0.1:8200/comments/${id}`)
              .then( obj => obj.json())
              .then(res2 => {
                const r2 = res;
                r2.comments = res2;
                commit('addShow', r2);
                resolve(r2);
              })
            });
        }
      });
    },

    fetchRepertoireIds({commit}){
      fetch('http://127.0.0.1:8200/repertoire/ids')
      .then(obj => obj.json())
      .then(res => commit('addRepertoireIds', res));
    },

    register({ commit }, obj) {
      return new Promise( (resolve, reject) => {
      fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => {
          if(!tkn.token){
            alert(tkn[0].message);
            resolve(false);
          }else{
            commit('setToken', tkn);
            resolve(true); 
          }
          }
        );
      });
    },

    login({ commit }, obj) {
      return new Promise( (resolve, reject) => {
      fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }).then( res => res.json() )
      .then( tkn => {
        if (!tkn.token) {
          alert(tkn.message);
          resolve(false)
        } else {
          commit('setToken', tkn);
          resolve(true);
        }
      });
    });
    },

    
    socket_comment({ commit }, msg) {
      const comment = JSON.parse(msg);
      commit('addComment', { showId: comment.showId, comment: comment });
    }

  },
  modules: {
  }
})
