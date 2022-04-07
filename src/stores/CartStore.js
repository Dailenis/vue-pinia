import { defineStore } from 'pinia'
import { groupBy } from 'lodash'
import {useAuthUserStore} from '@/stores/AuthUserStore'

export const useCartStore = defineStore('CartStore', {
    //state
    state: () =>{
      return{
          items: [],
      }
    },

    getters:{
        count: (state) => state.items.length,
        isEmpty: (state ) => state.count === 0,
        grouped: (state) => {
            const grouped = groupBy(state.items, item => item.name) 
            const sorted = Object.keys(grouped).sort();
            let inOrder = {}
            sorted.forEach(key => inOrder[key] = grouped[key])
            return inOrder;
        },
        groupCount:state => (index) => state.grouped[index].length,
        total: (state) => state.items.reduce((pV, item) => pV + item.price,0),
    },

    actions:{
        checkout(){
            const authUserStore = useAuthUserStore()
            alert(`${authUserStore.username} just bought ${this.count} items at a total of $${this.total}`)
        },
        addItems(count, item){
            count = parseInt(count)
            for (let index = 0; index < count; index++) {
                this.items.push( {...item} )
            }
        },
        clearItem(name){
            this.items = this.items.filter( item => item.name !== name)
        },
        setItemCount(item, count){
            this.clearItem(item.name)
            this.addItems(count, item)
            // event ? this.addItems(1, item) : this.items.splice(this.items.findIndex(el => el.name === item.name),1)
        }

    },
  
  })