<template>
      <div class="container">
          <div class="row">
             <div class="col">
                 <div class="card">
                     <div class="card-body">
                         <form @keyup.enter="postComment">
                           <div class="form-group">
                             <input type="text" class="form-control" placeholder="Author's Name" v-model="comment.author">
                         </div>
                         <div class="form-group">
                             <textarea name="comment" id=""  rows="6" class="form-control" v-model="comment.content" >

                             </textarea>
                         </div>
                         <div class="form-group">
                             <input type="submit" value="Submit" class="btn btn-success" @click.prevent="postComment">
                         </div>
                         </form>
                         
                     </div>
                 </div>

             </div>
        <div class="col">
            <div class="card">
                <div class="card-body">
                    <div class="media" v-for="comment in comments" :key="comment.id">
                 <img class="mr-3" src="https://api.adorable.io/avatars/48/@adorable.io.png" alt="Generic placeholder image">
               <div class="media-body">
                   <h5>{{comment.author}}</h5>
                   {{comment.content}}
               </div>
          </div>
                </div>
            </div>
            
        </div>
          </div>

          
      </div>
</template>

<script>
  import {store} from '../store';
  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';
  

    export default {
       store:store,

       data:function(){
           return{
               comment:{
                   author:'',
                   content:''
               }
           }
       },

        mounted() {
            //calls the action getcomments from store.js//
            this.$store.dispatch('getComments');
           
             Echo.channel('comment-channel')
                .listen('.newComment', (e)=>{
                  this.$store.commit('addComment',e.comment)
                  console.log(e)
                })
        
        },

        computed:{
            //gets the comments array from store.js//
           ...mapGetters([
               'comments'
           ])
        },

        methods:{
            postComment:function(){
                
                this.$store.dispatch('addComment',this.comment)
                  .then(res=>{
                      if(res==='ok'){
                          console.log('success')
                      }
                  }).catch(err=>{
                      console.log(err)
                  })
            }
        }

        
        
    }
</script>
