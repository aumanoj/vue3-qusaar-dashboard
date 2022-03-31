<template>
      <q-select
        filled
        v-model="model"
        use-input
        input-debounce="0"
        @input="updateValue"
        label="Simple filter"
        :options="options.map((item)=>({label:item.name,value:item.id}))"
        @filter="filterFn"
        style="width: 250px"
        behavior="menu"
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
        stringOptions:Array
    },
  setup (props,context) {
    const options = ref(props.stringOptions)

    const updateValue = (event)=>{
        context.emit('update:modelValue',event.target.value)
    }
    return {
      model: ref(null),
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
