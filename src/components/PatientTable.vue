
<template>
    <div>
        <ag-grid-vue
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowSelection="rowSelection"
                :rowMultiSelectWithClick="true"
                :rowData="rowData">
        </ag-grid-vue>
        <!-- <v-table
        class="table-hover"
        :data="numVisits"
        selectionMode="multiple"
        selectedClass="table-info"
        @selectionChanged="selectedRows = $event"
        >
            <thead slot="head">
                <th>#</th>
                <th>Patient ID</th>
                <th>Visit Number</th>
            </thead>
            <tbody slot="body" slot-scope="{displayData}">
                <tr     
                v-for="row in displayData"
                >
                    <td>{{ row.id }}</td>
                    <td>{{ row.visit }}</td>
            </tr>
            </tbody>
                
        </v-table> -->

    </div>
  </template>
  
<script>
import { ref, watch } from 'vue';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridVue } from 'ag-grid-vue3';

export default{
    props:{
        patientId: Number
    },
    data() {
        return {
            columnDefs: [
            { field: 'PatientID', maxWidth: 90 },
            { field: 'Visits', minWidth: 150 },
            ],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
                flex: 1,
                minWidth: 100,
            },
            rowSelection: null,
            rowData: null,
            numVisits: ref([]),
            selectedRows: [],
            visits: []
        }
    },
    created() {
        this.rowSelection = 'multiple';
    },
    watch:{
        patientId: 'fetchVisits'
    
    },
    methods:{
        // async fetchVisits(patientId){
        //     try{
        //         var url = `http://127.0.0.1:5000/get_visits?`;
        //         url = url + "patient_id=" + patientId
        //         const response = await fetch(url);
        //         const data = await response.json();  
                
        //         this.visits = data["visits"]
        //         for (let i = 0; i < this.visits.length; i++){
        //             this.numVisits.push({id: patientId, visit: this.visits[i]})
        //         }  
        //     } catch (error) {
        //         console.error('Error fetching visits: ', error)
        //     }
        // },
        async onGridReady(params) {
            this.gridApi = params.api;
            this.gridColumnApi = params.columnApi;

            try {
                const response = await fetch(`http://127.0.0.1:5000/get_visits?${patient_id}=${this.patientId}`);
                const data = await response.json();
                this.visits = data["visits"]
                for (let i = 0; i < this.visits.length; i++){
                    this.numVisits.push({id: patientId, visit: this.visits[i]})
                }  
                params.api.setRowData(this.numVisits);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            }     
    }
}

</script>