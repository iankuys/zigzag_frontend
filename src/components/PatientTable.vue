<template>
    <div style="height: 100%; width: 30%">
        <ag-grid-vue id="patient_table" class="ag-theme-alpine"  style="height: 500px; width: 100%" :columnDefs="columnDefs" :rowData="rowData.value"
            rowSelection="multiple" :rowMultiSelectWithClick="true" animateRows="true"
            @selection-changed="onSelectionChanged" @grid-ready="onGridReady">
        </ag-grid-vue>
    </div>
    <button type="button" class="btn btn-primary" @click="fetchZigZag">Get Zig Zag</button>
</template>
  
<script>
import { ref, watch, onMounted } from 'vue';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridVue } from 'ag-grid-vue3';

export default {
    props: {
        visitsArr: Array,
    },
    setup(props) {
        const width = ref(0)
        const columnDefs = ref([
            { field: 'patient_id'},
            { field: 'visit' },
        ]);
        const gridApi = ref(null);
        const gridColumnApi = ref(null);
        const defaultColDef = ref({
            flex: 1,
            minWidth: 100,
        });
        const patientId = ref("")
        const rowData = ref({});
        const visitsSelected = ref([]);

        const fetchZigZag = async () => {

            if (visitsSelected.value.length <= 3){

                try {
                    const url = `http://127.0.0.1:5000/get_zigzag`;
    
                    const data = {
                        patient_id: patientId.value,
                        visits: visitsSelected.value,
                    }
    
                    console.log(data)
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            // Add any other headers if needed
                        },
                        body: JSON.stringify(data),
                    });
    
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
    
                    const responseData = await response.json();
                    console.log(responseData);
    
                } catch (error) {
                    console.error('Error fetching zigzag: ', error);
                }
            } else {
                alert("Please select less than 3 entries for ZigZag")
            }
        };

        const onGridReady = (params) => {
            gridApi.value = params.api;
            gridColumnApi.value = params.columnApi;
            patientId.value = props.visitsArr[0].patient_id;
            gridApi.value.setRowData(props.visitsArr);

            console.log(patientId.value)
        };

        onMounted(() => {
            width.value = document.getElementById('patient_table').offsetWidth;
            
            columnDefs.value.forEach((column) => {
                column.width = (width.value - 2) / 2;
            });

        })

        const onSelectionChanged = () => {

            var selectedNodes = gridApi.value.getSelectedNodes();
            var selectedRowsArr = [];
            var maxToZigZag = 3;
            selectedNodes.forEach(function (selectedNode) {
                if (visitsSelected.value.length >= maxToZigZag && !visitsSelected.value.includes(selectedNode.data.visit)) {
                    selectedNode.setSelected(false);
                } else {
                    console.log(selectedNode);
                    selectedRowsArr.push(selectedNode.data.visit);
                }
                
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
            visitsSelected,
            onGridReady,
            onSelectionChanged,
            deselectRows: () => {
                gridApi.value.deselectAll()
            },
            fetchZigZag
        };
    },
    components: {
        AgGridVue,
    },
};
</script>
  