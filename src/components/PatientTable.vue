<template>
    <div style="height: 100%">
        <ag-grid-vue
            class="ag-theme-alpine"
            style="height: 500px"
            :columnDefs="columnDefs"
            :rowData="rowData.value"
            rowSelection="multiple"
            :rowMultiSelectWithClick="true"
            animateRows="true"
            @selection-changed="onSelectionChanged"
            @grid-ready="onGridReady"
        >
        </ag-grid-vue>
    </div>
    <button type="button" class="btn btn-primary">Get Zig Zag</button>
</template>
  
<script>
import { ref, watch } from 'vue';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridVue } from 'ag-grid-vue3';

export default {
    props: {
        patientId: Number,
    },
    setup(props) {
        const columnDefs = ref([
            { field: 'id', maxWidth: 90 },
            { field: 'visit', minWidth: 150 },
        ]);
        const gridApi = ref(null);
        const gridColumnApi = ref(null);
        const defaultColDef = ref({
            flex: 1,
            minWidth: 100,
        });
        const rowData = ref({});
        const numVisits = ref([]);
        const visits = ref([]);
        const visitsSelected = ref([]);

        const resetNumVisits = () => {
            numVisits.value = [];
        };

        const fetchVisits = async () => {
            try {
                resetNumVisits();

                const url = `http://127.0.0.1:5000/get_visits?patient_id=${props.patientId}`;
                const response = await fetch(url);
                const data = await response.json();

                visits.value = data["visits"];
                console.log(data['visits'])
                numVisits.value = visits.value.map(visit => ({ id: props.patientId, visit }));
                
                if (gridApi.value) {
                    gridApi.value.setRowData(numVisits.value)
                    console.log(numVisits.value)
                }
            } catch (error) {
                console.error('Error fetching visits: ', error);
            }
        };

        watch(() => props.patientId, async () => {
            await fetchVisits();
        });

        const onGridReady = (params) => {
            gridApi.value = params.api;
            gridColumnApi.value = params.columnApi;
            console.log("hi")
        };

        const onSelectionChanged = () => {
            var selectedRows = gridApi.value.getSelectedRows();
            var selectedRowsArr = [];
            var maxToShow = 5;
            selectedRows.forEach(function (selectedRow, index) {
                if (index >= maxToShow) {
                return;
                }
                selectedRowsArr.push(selectedRow.visit);
            });
            visitsSelected.value = selectedRowsArr

            console.log(visitsSelected.value)

        };

        return {
            columnDefs,
            gridApi,
            gridColumnApi,
            defaultColDef,
            rowData,
            numVisits,
            visitsSelected,
            onGridReady,
            onSelectionChanged,
            deselectRows: () =>{
                gridApi.value.deselectAll()
            }
        };
    },
    components: {
        AgGridVue,
    },
};
</script>
  