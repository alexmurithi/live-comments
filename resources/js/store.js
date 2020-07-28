import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store =new Vuex.Store({
    state:{
        //stores all the comments in this array//
        comments:[]
    },
    getters:{
        //returns the comments array//
        comments:state=>{
            return state.comments
        }
    },
    mutations:{
        //populates the comments array in the state with the comments from the database//
        getComments:(state,comments)=>{
            state.comments =comments
        },
        addComment:(state,comment)=>{
            state.comments = state.push(comment)
        }
    },
    actions:{
        /* gets all the comments from comments endpoint api*/
       getComments:({commit})=>{
           axios.get(`http://127.0.0.1:8000/api/comments`)
             .then(res=>{
                 //commits getcomments mutation and passes a parameter of comments from the response//
                 commit('getComments',res.data)
                 
             })
             .catch(err=>{
                 console.log(err)
             })
       },
       addComment:({commit},comment)=>{
         return new Promise((resolve,reject)=>{
             axios.post(`http://127.0.0.1:8000/api/comments`,{
                 author:comment.author,
                 content:comment.content
             })
                .then(res=>{
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
         })
       }
    }
})