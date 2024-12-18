<template>
    <div>
        <Datepicker v-model="date" range />

        <button class="btn btn-sm btn-primary my-4"  @click="save"> Filtrar </button>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    name: "FormCalendar",

    setup() {
        const date = ref();

        // For demo purposes assign range from the current date
        onMounted(() => {
            const startDate = new Date();
            const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
            date.value = [startDate, endDate];
        })
        
        return {
            date,
        }
    },
    methods: {
        save(){
            this.$store.dispatch('date/update', this.date, { root: true })
            console.log(this.$store.state.date)
        }
    }

}
</script>
