<template>
      <q-select
        v-model="value"
        use-input
        input-debounce="0"
        :label="labelName"
        :options="options.map((item)=>({name:item.name,id:item.id}))"
        @filter="filterFn"
        @input="updateValue"
        style="width: 100%"
        color="teal" 
        outlined
        option-label="name"
        option-value="id"
        emit-value
        map-options
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
</template>

<script>
import { ref } from 'vue'


export default {
    props:{
        stringOptions:Array,
        labelName:String
    },
 
  setup (props,context) {
    const options = ref(props.stringOptions)

   
    const updateValue = (event)=>{
        context.emit('update:modelValue',event.target.value)
    }
    return {
      value: ref(null),
      updateValue,
      options,

      filterFn (val, update) {
        if (val === '') {
          update(() => {
            options.value = props.stringOptions
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          options.value = props.stringOptions.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
          
        })
      }
    }
  }
}
</script>
