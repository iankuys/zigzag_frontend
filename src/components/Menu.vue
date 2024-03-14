<template>
  <div>
    <label for="dropdown">Select a patient:</label>
    <select id="dropdown" v-model="patientOption">
      <option v-for="option in patientIds" :value="option">{{ option }}</option>
    </select>
  </div>
  <div v-if="patientOption != ''">
      <my-table :patientId="patientOption"></my-table>
  </div>
</template>

<script>
import PatientTable from './PatientTable.vue';

export default{
    data() {
        return {
            patientOption: '',
            patientIds: []
        }
    },
    async created(){
        await this.fetchPatients();
    },
    methods:{
        async fetchPatients(){
            try{
                const url = `http://127.0.0.1:5000/get_patients`;
                const response = await fetch(url);
                const data = await response.json();  
                this.patientIds = data["patients"];          
            } catch (error) {
                console.error('Error fetching patients: ', error)
            }
        },
    },
    components:{
        'my-table': PatientTable, 
    }
        
}

</script>